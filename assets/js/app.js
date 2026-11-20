
// Hardened Task 2 app - all rendering escaped, no demo mode
function renderOpps(filter="All",q=""){
  const list=document.getElementById("oppList"); if(!list) return;
  const live=state.opps.filter(o=>o.status==="Approved");
  const f=live.filter(o=>(filter==="All"||o.type===filter)&&(o.title+" "+o.org+" "+o.location).toLowerCase().includes(q.toLowerCase()));
  list.innerHTML=f.length?f.map(o=>`<article class="card"><span class="pill">${esc(o.type)}</span><h3>${esc(o.title)}</h3><p class="muted">${esc(o.org)} • ${esc(o.location)}</p><p>${esc(o.desc)}</p><p><b>Deadline:</b> ${esc(o.deadline)} • <b>${esc(o.stipend)}</b></p><button class="btn btn-sm" onclick="openOpp('${esc(o.id)}')">View & Apply →</button></article>`).join(""):`<p>No opportunities found. Try another filter.</p>`;
  const c=document.getElementById("oppCount"); if(c) c.textContent=f.length+" opportunities";
}
function openOpp(id){ const o=state.opps.find(x=>x.id===id); if(!o) return; document.getElementById("oppDetail").innerHTML=`<div class="card"><h2>${esc(o.title)}</h2><p class="muted">${esc(o.org)} • ${esc(o.location)} • ${esc(o.type)}</p><p>${esc(o.desc)}</p><p><b>Deadline:</b> ${esc(o.deadline)} • <b>Stipend:</b> ${esc(o.stipend)}</p><label>Full name</label><input id="apName" maxlength="80" placeholder="Full name"><label>Email</label><input id="apEmail" type="email" maxlength="120" placeholder="Email"><label>Why you? (max 500 chars)</label><textarea id="apWhy" maxlength="500" placeholder="Tell us why you fit"></textarea><button class="btn" onclick="submitApp('${esc(o.id)}')">Submit Application →</button><p id="apMsg"></p></div>`; document.getElementById("oppDetail").scrollIntoView({behavior:"smooth"}); }
function submitApp(id){ const name=document.getElementById("apName").value.trim(), email=document.getElementById("apEmail").value.trim(), why=document.getElementById("apWhy").value.trim();
  if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||why.length<10){ document.getElementById("apMsg").textContent="Please fill all fields correctly (Why: at least 10 characters)."; return; }
  state.applications.push({id:uid(),oppId:id,name,email,why,status:"Submitted",date:today()}); save(); audit("APPLICATION","Application submitted for "+id); document.getElementById("apMsg").textContent="✅ Application submitted. Reference: "+state.applications[state.applications.length-1].id; toast("Application submitted"); }
