
// PYM Hardened - NO plaintext passwords, NO demo mode, NO demo bypass
// Passwords stored ONLY as SHA-256 hashes. Login checked in JS (front-end lab version - see SECURITY.md for production server requirement)
const STORAGE_KEY="pym_secure_v1";
const SESSION_KEY="pym_secure_session_v1";
const LOCK_KEY="pym_secure_lock_v1";
const MAX_ATTEMPTS=5, LOCK_MINUTES=15;
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
async function sha256(str){const buf=await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)); return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");}
function uid(){return "id_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8);}
function today(){return "2026-11-20";}
function daysSince(d){ if(!d) return 999; return Math.floor((new Date("2026-11-20")-new Date(d))/86400000); }
function adminPasswordExpired(u){ return u && u.role==="Admin" && daysSince(u.passwordChangedAt)>=30; }
function adminPasswordDaysLeft(u){ return u && u.role==="Admin" ? Math.max(0,30-daysSince(u.passwordChangedAt)) : 99; }

// Seeded LAB users - ONLY hashes, never plaintext. Lab passwords in SECURITY_LAB_GUIDE.md for instructor only.
const SEED_USERS=[
 {email:"admin@positiveyoungminds.org.za",name:"Admin",role:"Admin",passHash:"1f12f204e823b728d46b85bfe8aa60083bc351ede828fe453cf1ad1150f7bed9",passwordChangedAt:"2026-10-15"},
 {email:"youth@positiveyoungminds.org.za",name:"Youth User",role:"Youth",passHash:"6cf6372d735c840077a7bba9342b5154f88ca4196252a848d6c84968c236baef",passwordChangedAt:"2026-11-01"},
 {email:"provider@positiveyoungminds.org.za",name:"Provider User",role:"Provider",passHash:"330488c442dc300306de15e7a74df1219508787de285a1f9d514704583f45cb0",passwordChangedAt:"2026-11-01"},
];
let state;
try{ state=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null"); }catch(e){ state=null; }
if(!state || !state.users){
  state={users:SEED_USERS,opps:[],applications:[],messages:[],docs:[],volunteers:[],audit:[],settings:{siteName:"Positive Young Minds",demo:false}};
  // Seed opportunities (no demo label - real-looking lab data, clearly marked as LAB in SECURITY guide)
  state.opps=[
    {id:"o1",title:"Junior Web Developer Internship",org:"Cape Tech Learnerships",type:"Internship",location:"Cape Town",deadline:"2026-12-10",stipend:"R5,500 / month",status:"Approved",desc:"Learn HTML, CSS, JavaScript and build real projects with a mentor.",tags:["IT","Entry Level"],provider:"provider@positiveyoungminds.org.za"},
    {id:"o2",title:"Digital Skills Training",org:"Soweto Schools Network",type:"Training",location:"Soweto",deadline:"2026-11-30",stipend:"Free",status:"Approved",desc:"6-week digital skills, CV and interview training.",tags:["Training"],provider:"provider@positiveyoungminds.org.za"},
    {id:"o3",title:"Community Volunteer — Green Team",org:"Cape Town Green Team",type:"Volunteering",location:"Cape Town",deadline:"2026-12-15",stipend:"Transport + Lunch",status:"Approved",desc:"Weekend clean-ups and tutoring.",tags:["Community"],provider:"provider@positiveyoungminds.org.za"},
    {id:"o4",title:"Bursary — Software Engineering",org:"Durban Education Trust",type:"Bursary",location:"Durban",deadline:"2027-01-31",stipend:"Full Tuition",status:"Approved",desc:"Bursary for 2nd-year Software Engineering students.",tags:["Bursary"],provider:"provider@positiveyoungminds.org.za"},
    {id:"o5",title:"Youth Support Assistant (Part-time)",org:"Positive Young Minds",type:"Employment",location:"Johannesburg",deadline:"2026-12-05",stipend:"R4,000 / month",status:"Approved",desc:"Support youth events and admin.",tags:["Jobs"],provider:"provider@positiveyoungminds.org.za"},
    {id:"o6",title:"Matric Tutor — Maths",org:"Soweto Schools Network",type:"Volunteering",location:"Johannesburg",deadline:"2026-12-20",stipend:"Stipend",status:"Pending",desc:"Tutor Grade 10-12 Maths on Saturdays. Awaiting admin approval - NOT live.",tags:["Tutoring"],provider:"provider@positiveyoungminds.org.za"},
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function getSession(){ try{return JSON.parse(sessionStorage.getItem(SESSION_KEY)||"null");}catch(e){return null;} }
function setSession(user){ const token=uid()+"_"+Date.now(); sessionStorage.setItem(SESSION_KEY, JSON.stringify({email:user.email,role:user.role,token,at:Date.now()})); }
function clearSession(){ sessionStorage.removeItem(SESSION_KEY); }
function currentUser(){ const s=getSession(); if(!s) return null; const u=state.users.find(x=>x.email===s.email); return u||null; }
function requireRole(role){ const u=currentUser(); return u && u.role===role; }
function audit(action,detail){ state.audit.unshift({action,detail:esc(detail||""),by:currentUser()?.email||"anonymous",at:today()+" "+new Date().toLocaleTimeString()}); save(); }
function getLock(){ try{return JSON.parse(localStorage.getItem(LOCK_KEY)||"{}");}catch(e){return {};} }
function setLock(v){ localStorage.setItem(LOCK_KEY, JSON.stringify(v)); }
function isLocked(email){ const l=getLock()[email]; if(!l) return false; if(Date.now()-l.at < LOCK_MINUTES*60000) return true; const all=getLock(); delete all[email]; setLock(all); return false; }
function recordFail(email){ const all=getLock(); all[email]={count:(all[email]?.count||0)+1, at:Date.now()}; setLock(all); return all[email].count; }
function clearLock(email){ const all=getLock(); delete all[email]; setLock(all); }
async function loginSecure(email,pass){
  email=String(email||"").trim().toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {ok:false,msg:"Enter a valid email address."};
  if(isLocked(email)) return {ok:false,msg:"Account locked for 15 minutes after 5 failed attempts. Try again later."};
  const user=state.users.find(x=>x.email===email);
  if(!user) { recordFail(email); return {ok:false,msg:"Invalid email or password."}; } // generic message - no user enumeration
  const hash=await sha256(pass||"");
  if(hash!==user.passHash){ const c=recordFail(email); return {ok:false,msg:c>=MAX_ATTEMPTS?"Too many failed attempts. Account locked for 15 minutes.":"Invalid email or password."}; }
  clearLock(email); setSession(user); audit("LOGIN","User logged in"); return {ok:true,user};
}
function logout(){ audit("LOGOUT","User logged out"); clearSession(); location.href="index.html"; }
function toggleDark(){ document.body.classList.toggle("dark"); localStorage.setItem("pym_dark", document.body.classList.contains("dark")?"1":"0"); }
function toast(msg){ const t=document.getElementById("toast"); if(!t) return; t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),3000); }
function headerAuth(){
  if(localStorage.getItem("pym_dark")==="1") document.body.classList.add("dark");
  const u=currentUser(); const a=document.getElementById("authBtns"), b=document.getElementById("userBtns");
  if(u && a && b){ a.classList.add("hidden"); b.classList.remove("hidden"); document.getElementById("userName").textContent="Hi, "+esc(u.name)+" • "+esc(u.role); }
}
async function updateAdminPassword(newPass){ const u=currentUser(); if(!u||u.role!=="Admin") return false; u.passHash=await sha256(newPass); u.passwordChangedAt="2026-11-20"; save(); audit("PASSWORD_CHANGE","Admin changed password"); return true; }
