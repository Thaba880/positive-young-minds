function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function toast(m){let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',3200)}
function toggleDark(){document.body.classList.toggle('dark');localStorage.setItem('pym_dark',document.body.classList.contains('dark')?'1':'0')}
if(localStorage.getItem('pym_dark')==='1')document.body.classList.add('dark');
function validEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}
function daysUntil(d){return Math.ceil((new Date(d)-new Date())/86400000)}
