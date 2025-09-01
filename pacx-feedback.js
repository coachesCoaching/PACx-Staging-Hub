<script>
// PACx Feedback + Back Arrow (drop-in)
// Configure (optional) before this script:
//   window.PACX_FEEDBACK_URL = 'https://your-form-url';
//   window.PACX_BACK_HREF = 'hub.html';

(function(){
  const FEEDBACK_URL = window.PACX_FEEDBACK_URL || 'https://docs.google.com/forms/d/e/REPLACE_ME/viewform?embedded=true';
  const BACK_HREF    = (typeof window.PACX_BACK_HREF === 'string') ? window.PACX_BACK_HREF : 'hub.html';

  // --- Styles (scoped minimal) ---
  const css = `
  .pacx-fab{
    position: fixed; right: 16px; bottom: 16px; z-index: 9999;
    background: #3be281; color:#02100a; font-weight:800; border: none;
    border-radius: 28px; padding: 12px 16px; cursor: pointer;
    box-shadow: 0 8px 24px rgba(0,0,0,.35);
  }
  .pacx-fab:focus{ outline: 2px solid rgba(86,243,166,.6); outline-offset:2px; }
  .pacx-modal{
    position: fixed; inset:0; z-index: 10000; display:none; 
    background: rgba(0,0,0,.55); backdrop-filter: blur(2px);
  }
  .pacx-modal__sheet{
    position: absolute; right:16px; bottom:76px; width: min(860px, 92vw); height: min(640px, 78vh);
    background:#0f1223; border:1px solid rgba(255,255,255,.12); border-radius:16px; overflow:hidden;
    box-shadow: 0 12px 40px rgba(0,0,0,.45);
  }
  .pacx-modal__bar{
    display:flex; align-items:center; justify-content:space-between; gap:8px;
    padding:10px 12px; background:#161a2e; border-bottom:1px solid rgba(255,255,255,.08); color:#e6f0ff;
    font: 600 14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  }
  .pacx-modal__close{
    background: transparent; color:#e6f0ff; border:1px solid rgba(255,255,255,.18);
    border-radius:10px; padding:6px 10px; cursor:pointer;
  }
  .pacx-modal__frame{ width:100%; height:calc(100% - 44px); border:0; background:#0f1223; }
  .pacx-back{
    position: fixed; left: 12px; top: 12px; z-index: 9999; text-decoration:none;
    color:#a8b1d1; background: rgba(16,26,43,.92); border:1px solid rgba(255,255,255,.12);
    padding:8px 12px; border-radius:10px; font: 500 14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  }
  .pacx-back:hover{ border-color: rgba(255,255,255,.25); }
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // --- Back to Hub (skip adding on hub.html itself) ---
  const isHub = location.pathname.endsWith('/hub.html') || location.pathname.endsWith('/index.html') || location.pathname.endsWith('/');
  if (!isHub && BACK_HREF){
    const back = document.createElement('a');
    back.className = 'pacx-back';
    back.href = BACK_HREF;
    back.setAttribute('aria-label','Back to Hub');
    back.textContent = '← Hub';
    document.body.appendChild(back);
  }

  // --- Feedback FAB + Modal ---
  const fab = document.createElement('button');
  fab.className = 'pacx-fab';
  fab.type = 'button';
  fab.textContent = 'Feedback';
  fab.setAttribute('aria-haspopup','dialog');

  const modal = document.createElement('div');
  modal.className = 'pacx-modal';
  modal.innerHTML = `
    <div class="pacx-modal__sheet" role="dialog" aria-label="PACx Feedback" aria-modal="true">
      <div class="pacx-modal__bar">
        <div>Share feedback (PACx)</div>
        <button class="pacx-modal__close" type="button">Close</button>
      </div>
      <iframe class="pacx-modal__frame" src="${FEEDBACK_URL}"></iframe>
    </div>
  `;

  const closeBtn = () => modal.querySelector('.pacx-modal__close');

  fab.addEventListener('click', ()=>{ modal.style.display='block'; closeBtn().focus(); });
  modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.style.display='none'; });
  modal.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') modal.style.display='none'; });
  // close
  setTimeout(()=> closeBtn().addEventListener('click', ()=> modal.style.display='none'), 0);

  document.addEventListener('DOMContentLoaded', ()=>{
    document.body.appendChild(fab);
    document.body.appendChild(modal);
  });
})();
</script>
