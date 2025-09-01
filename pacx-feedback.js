/* PACx Feedback + Back (single drop-in) */
(function(){
  const FEEDBACK_URL = window.PACX_FEEDBACK_URL ||
    'https://docs.google.com/forms/d/e/REPLACE_ME/viewform?embedded=true';
  const BACK_HREF = (typeof window.PACX_BACK_HREF === 'string') ? window.PACX_BACK_HREF : 'hub.html';

  const css = `
  .pacx-fab{position:fixed;right:16px;bottom:16px;z-index:9999;background:#56f3a6;color:#02100a;font-weight:800;border:none;border-radius:28px;padding:12px 16px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.35)}
  .pacx-fab:focus{outline:2px solid rgba(86,243,166,.6)}
  .pacx-modal{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(2px);display:none;z-index:10000}
  .pacx-sheet{position:absolute;right:16px;bottom:76px;width:min(680px,92vw);height:min(660px,78vh);background:#0f1223;border:1px solid rgba(255,255,255,.12);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.45);overflow:hidden;display:flex;flex-direction:column}
  .pacx-top{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#161a2e;border-bottom:1px solid rgba(255,255,255,.08);color:#eaf0ff}
  .pacx-close{background:transparent;color:#eaf0ff;border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:6px 10px;cursor:pointer}
  .pacx-body{flex:1}
  .pacx-body iframe{border:0;width:100%;height:100%;background:#0f1223}
  .pacx-back{position:fixed;left:12px;top:12px;z-index:9999;background:rgba(16,26,43,.9);border:1px solid rgba(255,255,255,.12);border-radius:10px;color:#e6f0ff;padding:8px 10px;text-decoration:none;font-weight:800}
  @media (max-width:560px){ .pacx-back{top:8px;left:8px} .pacx-fab{right:12px;bottom:12px} }
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  const onHub = /(?:^|\/)(hub\.html)(?:\?|#|$)/i.test(location.pathname);
  if(!onHub){
    const back = document.createElement('a');
    back.className='pacx-back';
    back.href = BACK_HREF;
    back.textContent = '← Hub';
    back.setAttribute('aria-label','Back to Hub');
    document.body.appendChild(back);
  }

  const fab = document.createElement('button');
  fab.className='pacx-fab';
  fab.textContent='PACx Feedback';
  fab.title='Give quick feedback';
  document.body.appendChild(fab);

  const modal = document.createElement('div'); modal.className='pacx-modal';
  modal.innerHTML = `
    <div class="pacx-sheet" role="dialog" aria-label="Feedback">
      <div class="pacx-top"><strong>Feedback</strong><button class="pacx-close">Close</button></div>
      <div class="pacx-body"><iframe src="${FEEDBACK_URL}"></iframe></div>
    </div>`;
  document.body.appendChild(modal);

  const open = ()=>{ modal.style.display='block'; };
  const close = ()=>{ modal.style.display='none'; };

  fab.addEventListener('click', open);
  modal.querySelector('.pacx-close').addEventListener('click', close);
  modal.addEventListener('click', e=>{ if(e.target===modal) close(); });
})();
