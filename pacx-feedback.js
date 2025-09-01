<script>
// PACx Feedback + Back Arrow (drop-in)
// ----------------------------------------------------------
/* Optional per-page overrides (define before this script tag):
     window.PACX_FEEDBACK_URL = 'https://docs.google.com/forms/d/e/REPLACE_ME/viewform?embedded=true';
     window.PACX_BACK_HREF    = 'hub.html';
*/

(function () {
  const FEEDBACK_URL =
    window.PACX_FEEDBACK_URL ||
    'https://docs.google.com/forms/d/e/REPLACE_ME/viewform?embedded=true';
  const BACK_HREF =
    (typeof window.PACX_BACK_HREF === 'string' && window.PACX_BACK_HREF) || 'hub.html';

  const css = `
  .pacx-fab{
    position:fixed; right:16px; bottom:16px; z-index:9999;
    background:#3be281; color:#02100a; font-weight:800; border:none;
    border-radius:28px; padding:12px 16px; cursor:pointer;
    box-shadow:0 8px 24px rgba(0,0,0,.35);
  }
  .pacx-fab:focus{ outline:2px solid rgba(86,243,166,.6); outline-offset:2px; }
  .pacx-modal{
    position:fixed; inset:0; z-index:10000; display:none;
    background:rgba(0,0,0,.55); backdrop-filter:blur(2px);
  }
  .pacx-modal--open{ display:block; }
  .pacx-modal__sheet{
    position:absolute; right:16px; bottom:76px; width:min(640px, 92vw); height:min(640px, 78vh);
    background:#0f1223; border:1px solid rgba(255,255,255,.12); border-radius:16px; overflow:hidden;
    box-shadow:0 12px 40px rgba(0,0,0,.45);
  }
  .pacx-modal__bar{
    display:flex; align-items:center; justify-content:space-between; gap:8px;
    padding:10px 12px; background:#161a2e; color:#eaf0ff; font-weight:700;
    border-bottom:1px solid rgba(255,255,255,.08);
  }
  .pacx-modal__close{
    background:#0f1223; color:#eaf0ff; border:1px solid rgba(255,255,255,.15);
    border-radius:10px; padding:6px 10px; cursor:pointer;
  }
  .pacx-iframe{ width:100%; height:calc(100% - 44px); border:0; background:#0f1223; }
  .pacx-back{
    position:fixed; left:16px; top:16px; z-index:9999;
    background:#161a2e; color:#eaf0ff; border:1px solid rgba(255,255,255,.12);
    border-radius:12px; padding:8px 12px; text-decoration:none; display:flex; gap:8px; align-items:center;
  }
  .pacx-back:hover{ border-color:rgba(255,255,255,.25); }
  @media (max-width:640px){
    .pacx-modal__sheet{ width:92vw; height:78vh; right:4vw; }
  }`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Back arrow (skip if no BACK_HREF or we're already on the hub page)
  const onHub = /(^|\/)hub\.html(\?|#|$)/i.test(location.pathname);
  if (BACK_HREF && !onHub) {
    const back = document.createElement('a');
    back.className = 'pacx-back';
    back.href = BACK_HREF;
    back.setAttribute('aria-label', 'Back to Hub');
    back.innerHTML = '← Hub';
    document.body.appendChild(back);
  }

  // Feedback FAB + modal
  if (FEEDBACK_URL && FEEDBACK_URL.startsWith('http')) {
    const fab = document.createElement('button');
    fab.className = 'pacx-fab';
    fab.textContent = 'Give Feedback';
    fab.type = 'button';

    const modal = document.createElement('div');
    modal.className = 'pacx-modal';
    modal.innerHTML = `
      <div class="pacx-modal__sheet" role="dialog" aria-modal="true" aria-label="PACx Feedback">
        <div class="pacx-modal__bar">
          <span>Quick Feedback</span>
          <button class="pacx-modal__close" type="button">Close</button>
        </div>
        <iframe class="pacx-iframe" src="${FEEDBACK_URL}" loading="lazy"></iframe>
      </div>
    `;

    const close = () => modal.classList.remove('pacx-modal--open');
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    modal.querySelector('.pacx-modal__close').addEventListener('click', close);
    fab.addEventListener('click', () => modal.classList.add('pacx-modal--open'));

    document.body.appendChild(fab);
    document.body.appendChild(modal);
  }
})();
</script>
