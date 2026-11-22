(function () {
  'use strict';
  var SRC = document.currentScript && document.currentScript.src;
  var ROOT = SRC
    ? new URL('../', SRC).href
    : new URL(/\/(Auth|comunicate)\/[^\/]*$/i.test(location.pathname) ? '../' : './', location.href).href;

  var ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"></path></svg>';
  var ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"></path></svg>';

  var css = [
    '.toplink:has(>svg:only-child){padding:8px;margin:-8px}',
    '#nx-fx-gl{position:fixed;inset:0;width:100vw;height:100vh;z-index:119;pointer-events:none;opacity:0;transition:opacity 180ms ease;will-change:transform,opacity}',
    '#nx-fx-gl.on{opacity:1}',
    '.nx-search{position:relative;flex:1 1 auto;max-width:420px;min-width:0;margin:0 16px}',
    '.nx-sbox{display:flex;align-items:center;gap:8px;height:38px;padding:0 12px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#e8ebff;transition:border-color .2s,background .2s,box-shadow .2s}',
    '.nx-sbox:focus-within{border-color:rgba(130,150,255,.7);background:rgba(255,255,255,.1);box-shadow:0 0 0 3px rgba(79,111,255,.2)}',
    '.nx-sbox svg{flex:none;width:17px;height:17px;opacity:.75}',
    '.nx-sbox input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:inherit;font:inherit;font-size:14px}',
    '.nx-sbox input::placeholder{color:inherit;opacity:.55}',
    '.nx-sbox input::-webkit-search-cancel-button{display:none}',
    '.nx-res{position:absolute;top:calc(100% + 8px);left:0;right:0;min-width:min(420px,calc(100vw - 28px));max-height:min(70vh,520px);overflow:auto;padding:6px;border-radius:16px;border:1px solid rgba(255,255,255,.14);background:rgba(16,18,30,.97);box-shadow:0 20px 60px rgba(0,0,0,.5);display:none;z-index:60}',
    '.nx-res.open{display:block}',
    '.nx-item{display:block;padding:10px 12px;border-radius:11px;color:#e8ebff;text-decoration:none;cursor:pointer}',
    '.nx-item:hover,.nx-item.act{background:rgba(110,130,255,.2)}',
    '.nx-page{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#9fb0ff;margin-bottom:3px}',
    '.nx-snip{font-size:13.5px;line-height:1.45;opacity:.92;overflow-wrap:anywhere}',
    '.nx-snip b{color:#fff;background:rgba(110,130,255,.45);border-radius:3px;padding:0 2px;font-weight:700}',
    '.nx-empty{padding:14px 12px;font-size:13.5px;opacity:.7}',
    ':root[data-theme="light"] .nx-sbox{border-color:rgba(20,24,60,.18);background:rgba(20,24,60,.05);color:#1a1d33}',
    ':root[data-theme="light"] .nx-sbox:focus-within{border-color:#4a5bd8;background:#fff;box-shadow:0 0 0 3px rgba(74,91,216,.18)}',
    ':root[data-theme="light"] .nx-res{background:rgba(252,253,255,.98);border-color:rgba(20,24,60,.14);box-shadow:0 20px 60px rgba(20,24,60,.22)}',
    ':root[data-theme="light"] .nx-item{color:#1a1d33}',
    ':root[data-theme="light"] .nx-item:hover,:root[data-theme="light"] .nx-item.act{background:rgba(74,91,216,.12)}',
    ':root[data-theme="light"] .nx-page{color:#4a5bd8}',
    ':root[data-theme="light"] .nx-snip b{color:#1a1d33;background:rgba(74,91,216,.25)}',
    'mark.nx-hl{background:rgba(255,214,90,.75);color:#111;border-radius:3px;padding:0 2px;box-shadow:0 0 0 4px rgba(255,214,90,.35);transition:background .6s,box-shadow .6s}',
    'mark.nx-hl.fade{background:transparent;box-shadow:none;color:inherit}',
    '@media(max-width:620px){.nx-search{margin:0 8px}.nx-sbox input{font-size:16px}.topbar .brand-name{display:none}}',
    '.nx-settings-trigger{width:100%;background:none;border:0;text-align:left;cursor:pointer;font-family:inherit}',
    '.nx-modal-bg{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:16px;background:rgba(5,6,12,.7);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;visibility:hidden;transition:opacity 280ms cubic-bezier(.2,.8,.2,1),visibility 280ms ease}',
    '.nx-modal-bg.open{opacity:1;visibility:visible}',
    '.nx-modal-card{width:min(490px,100%);max-height:90vh;overflow:auto;padding:24px;border-radius:22px;border:1px solid rgba(151,166,255,.32);background:linear-gradient(145deg,rgba(24,27,48,.97),rgba(13,15,26,.98));color:#f5f5f7;box-shadow:0 24px 70px rgba(0,0,0,.55);font-family:"Comfortaa",sans-serif;text-align:left;transform:translateY(20px) scale(.94);opacity:0;transition:transform 340ms cubic-bezier(.2,.85,.25,1),opacity 280ms ease,background 260ms ease,color 260ms ease,border-color 260ms ease;will-change:transform,opacity}',
    '.nx-modal-bg.open .nx-modal-card{transform:translateY(0) scale(1);opacity:1}',
    ':root[data-theme="light"] .nx-modal-card{background:linear-gradient(145deg,rgba(255,255,255,.99),rgba(238,242,255,.98));color:#14162a;border-color:rgba(74,91,216,.24);box-shadow:0 24px 70px rgba(20,24,60,.2)}',
    '.nx-modal-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}',
    '.nx-modal-head h2{margin:0;font-size:20px;line-height:1.25;letter-spacing:-.02em}',
    '.nx-modal-x{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:inherit;display:grid;place-items:center;cursor:pointer;font-size:16px;flex:none;transition:transform 200ms ease,background 200ms ease,border-color 200ms ease}',
    '.nx-modal-x:hover{background:rgba(133,151,255,.22);border-color:rgba(151,166,255,.6);transform:rotate(90deg)}',
    ':root[data-theme="light"] .nx-modal-x{border-color:rgba(20,24,60,.16);background:rgba(20,24,60,.05)}',
    '.nx-set-row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 0;border-bottom:1px solid rgba(255,255,255,.09);opacity:0;transform:translateY(10px);transition:opacity 320ms cubic-bezier(.2,.8,.2,1),transform 320ms cubic-bezier(.2,.8,.2,1)}',
    '.nx-modal-bg.open .nx-set-row{opacity:1;transform:translateY(0)}',
    '.nx-modal-bg.open .nx-set-row:nth-of-type(2){transition-delay:60ms}',
    '.nx-modal-bg.open .nx-set-row:nth-of-type(3){transition-delay:120ms}',
    '.nx-modal-bg.open .nx-set-row:nth-of-type(4){transition-delay:180ms}',
    '.nx-set-row:last-child{border-bottom:0;padding-bottom:2px}',
    ':root[data-theme="light"] .nx-set-row{border-bottom-color:rgba(20,24,60,.1)}',
    '.nx-set-info{min-width:0;flex:1 1 auto}',
    '.nx-set-label{display:block;font-size:14.5px;font-weight:700;margin-bottom:3px}',
    '.nx-set-desc{display:block;font-size:12px;opacity:.7;line-height:1.45}',
    '.nx-seg{position:relative;display:inline-flex;flex-direction:row;flex-wrap:nowrap;align-items:center;gap:2px;padding:3px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);flex:0 0 auto;white-space:nowrap}',
    ':root[data-theme="light"] .nx-seg{border-color:rgba(20,24,60,.14);background:rgba(20,24,60,.05)}',
    '.nx-seg-thumb{position:absolute;top:3px;bottom:3px;left:0;width:0;border-radius:999px;background:linear-gradient(135deg,#7888ff,#a46bff);box-shadow:0 3px 12px rgba(120,110,255,.42);pointer-events:none;transition:transform 300ms cubic-bezier(.2,.85,.25,1),width 300ms cubic-bezier(.2,.85,.25,1)}',
    '.nx-seg button{position:relative;z-index:1;border:0;border-radius:999px;padding:7px 12px;background:transparent;color:inherit;font:700 12.5px "Comfortaa",sans-serif;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;transition:color 220ms ease}',
    '.nx-seg button.on{color:#fff}',
    '@media(max-width:460px){.nx-set-row.nx-row-seg{flex-direction:column;align-items:stretch;gap:10px}.nx-set-row.nx-row-seg .nx-seg{width:100%;justify-content:space-between}.nx-set-row.nx-row-seg .nx-seg button{flex:1 1 0;justify-content:center}}',
    '.nx-toggle{position:relative;width:52px;height:30px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.1);cursor:pointer;flex:none;transition:background .24s,border-color .24s}',
    '.nx-toggle::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.3);transition:transform 260ms cubic-bezier(.2,.85,.25,1)}',
    '.nx-toggle[aria-checked="true"]{background:linear-gradient(135deg,#7888ff,#a46bff);border-color:transparent}',
    '.nx-toggle[aria-checked="true"]::after{transform:translateX(22px)}',
    ':root[data-theme="light"] .nx-toggle{border-color:rgba(20,24,60,.2);background:rgba(20,24,60,.12)}',
    '.nx-oobe-steps{display:flex;gap:6px;justify-content:center;margin-bottom:18px}',
    '.nx-oobe-dot{width:28px;height:5px;border-radius:999px;background:rgba(255,255,255,.16);transition:background 260ms ease,transform 260ms ease}',
    '.nx-oobe-dot.on{background:linear-gradient(90deg,#7888ff,#a46bff);transform:scaleX(1.06)}',
    ':root[data-theme="light"] .nx-oobe-dot{background:rgba(20,24,60,.14)}',
    '.nx-oobe-body{animation:nx-oobe-in 300ms cubic-bezier(.2,.85,.25,1) both}',
    '@keyframes nx-oobe-in{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}',
    '.nx-oobe-title{margin:0 0 8px;font-size:22px;text-align:center;letter-spacing:-.02em}',
    '.nx-oobe-sub{margin:0 0 20px;font-size:13.5px;opacity:.75;text-align:center;line-height:1.55}',
    '.nx-oobe-opts{display:grid;gap:10px;margin-bottom:20px}',
    '.nx-oobe-opts.cols2{grid-template-columns:1fr 1fr}',
    '.nx-oobe-opt{display:flex;align-items:center;justify-content:center;gap:10px;padding:14px 16px;border-radius:16px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:inherit;font:700 14px "Comfortaa",sans-serif;cursor:pointer;transition:border-color 200ms ease,background 200ms ease,transform 180ms ease,box-shadow 200ms ease}',
    '.nx-oobe-opt:hover{border-color:rgba(151,166,255,.6);transform:translateY(-2px)}',
    '.nx-oobe-opt.on{border-color:#8f9bff;background:linear-gradient(135deg,rgba(110,130,255,.28),rgba(164,107,255,.22));box-shadow:0 8px 22px rgba(96,110,255,.22)}',
    ':root[data-theme="light"] .nx-oobe-opt{border-color:rgba(20,24,60,.15);background:rgba(20,24,60,.04)}',
    ':root[data-theme="light"] .nx-oobe-opt.on{border-color:#4a5bd8;background:rgba(74,91,216,.14)}',
    '.nx-oobe-actions{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}',
    '.nx-oobe-btn{min-height:42px;padding:0 18px;border-radius:12px;border:1px solid rgba(151,166,255,.4);background:linear-gradient(135deg,#6678ff,#935bff);color:#fff;font:700 13.5px "Comfortaa",sans-serif;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;flex:1 1 auto;transition:transform 180ms ease,box-shadow 180ms ease}',
    '.nx-oobe-btn:hover{transform:translateY(-1px);box-shadow:0 8px 22px rgba(102,120,255,.35)}',
    '.nx-oobe-btn.ghost{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.18);color:inherit}',
    ':root[data-theme="light"] .nx-oobe-btn.ghost{background:rgba(20,24,60,.06);border-color:rgba(20,24,60,.16)}',
    '.nx-lang-fade{animation:nx-lfade 260ms cubic-bezier(.2,.8,.2,1) both}',
    '@keyframes nx-lfade{from{opacity:.35;transform:translateY(4px)}to{opacity:1;transform:none}}'
  ].join('\n');
  var st = document.createElement('style');
  st.id = 'nx-site-css';
  st.textContent = css;
  document.head.appendChild(st);

  var glFx = (function () {
    var canvas = null, gl = null, prog = null, raf = 0;
    var uRes, uProg, uOrigin, uMode, uColA, uColB;
    var active = null;

    var VS = 'attribute vec2 a;varying vec2 v;void main(){v=a*0.5+0.5;gl_Position=vec4(a,0.0,1.0);}';
    var FS = [
      'precision mediump float;',
      'varying vec2 v;',
      'uniform vec2 uRes;',
      'uniform float uProg;',
      'uniform vec2 uOrigin;',
      'uniform float uMode;',
      'uniform vec3 uColA;',
      'uniform vec3 uColB;',
      'void main(){',
      '  vec2 uv=v;',
      '  vec2 asp=vec2(uRes.x/max(uRes.y,1.0),1.0);',
      '  float p=clamp(uProg,0.0,1.0);',
      '  float ease=1.0-pow(1.0-p,3.0);',
      '  float alpha=0.0;',
      '  vec3 col=mix(uColA,uColB,uv.x*0.6+uv.y*0.4);',
      '  if(uMode<0.5){',
      '    float d=length((uv-uOrigin)*asp);',
      '    float r=ease*1.75;',
      '    float ring=exp(-pow((d-r)*9.0,2.0));',
      '    float trail=smoothstep(r+0.12,r-0.38,d)*(1.0-p);',
      '    alpha=(ring*0.58+trail*0.24)*(1.0-smoothstep(0.72,1.0,p));',
      '  }else if(uMode<1.5){',
      '    float x=uv.x+sin(uv.y*6.2831+p*4.0)*0.035;',
      '    float sweep=ease*1.45-0.22;',
      '    float band=exp(-pow((x-sweep)*7.5,2.0));',
      '    alpha=band*0.44*(1.0-smoothstep(0.75,1.0,p));',
      '  }else{',
      '    float d=length((uv-vec2(0.5,0.5))*asp);',
      '    float halo=exp(-pow((d-ease*0.65)*5.5,2.0));',
      '    float core=exp(-d*d*5.0)*(1.0-p);',
      '    alpha=(halo*0.42+core*0.28)*(1.0-smoothstep(0.68,1.0,p));',
      '  }',
      '  gl_FragColor=vec4(col*alpha,alpha);',
      '}'
    ].join('\n');

    function init() {
      if (canvas) return !!gl;
      canvas = document.createElement('canvas');
      canvas.id = 'nx-fx-gl';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.appendChild(canvas);
      try {
        gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: true })
          || canvas.getContext('experimental-webgl', { alpha: true, antialias: false, depth: false, premultipliedAlpha: true });
      } catch (e) { gl = null; }
      if (!gl) return false;
      function compile(type, src) {
        var sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
      }
      var vs = compile(gl.VERTEX_SHADER, VS);
      var fs = compile(gl.FRAGMENT_SHADER, FS);
      if (!vs || !fs) { gl = null; return false; }
      prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { gl = null; return false; }
      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, 'a');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      uRes = gl.getUniformLocation(prog, 'uRes');
      uProg = gl.getUniformLocation(prog, 'uProg');
      uOrigin = gl.getUniformLocation(prog, 'uOrigin');
      uMode = gl.getUniformLocation(prog, 'uMode');
      uColA = gl.getUniformLocation(prog, 'uColA');
      uColB = gl.getUniformLocation(prog, 'uColB');
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      resize();
      window.addEventListener('resize', resize, { passive: true });
      return true;
    }

    function resize() {
      if (!canvas || !gl) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function step(now) {
      if (!active || !gl) {
        if (canvas) canvas.classList.remove('on');
        raf = 0;
        return;
      }
      var p = (now - active.t0) / active.dur;
      if (p >= 1) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        canvas.classList.remove('on');
        active = null;
        raf = 0;
        return;
      }
      gl.useProgram(prog);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uProg, p);
      gl.uniform2f(uOrigin, active.ox, active.oy);
      gl.uniform1f(uMode, active.mode);
      gl.uniform3fv(uColA, active.colA);
      gl.uniform3fv(uColB, active.colB);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(step);
    }

    function play(kind, originEl) {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!init()) return;
      var ox = 0.5, oy = 0.5;
      if (originEl && originEl.getBoundingClientRect) {
        var r = originEl.getBoundingClientRect();
        if (r.width || r.height) {
          ox = Math.min(1, Math.max(0, (r.left + r.width * 0.5) / Math.max(window.innerWidth, 1)));
          oy = Math.min(1, Math.max(0, 1 - (r.top + r.height * 0.5) / Math.max(window.innerHeight, 1)));
        }
      }
      var isLight = document.documentElement.dataset.theme === 'light';
      var mode = 0, dur = 640, colA, colB;
      if (kind === 'theme') {
        mode = 0;
        dur = 680;
        colA = isLight ? [0.46, 0.58, 1.0] : [0.35, 0.45, 0.98];
        colB = isLight ? [0.98, 0.78, 0.42] : [0.64, 0.42, 1.0];
      } else if (kind === 'lang') {
        mode = 1;
        dur = 560;
        colA = [0.44, 0.56, 1.0];
        colB = [0.68, 0.44, 1.0];
      } else {
        mode = 2;
        dur = 580;
        colA = [0.48, 0.58, 1.0];
        colB = [0.64, 0.42, 1.0];
      }
      active = { t0: performance.now(), dur: dur, ox: ox, oy: oy, mode: mode, colA: colA, colB: colB };
      canvas.classList.add('on');
      if (!raf) raf = requestAnimationFrame(step);
    }

    return { play: play };
  })();

  window.nxPlayWebGLFx = glFx.play;

  var PAGES = [
    { f: 'index.html', t: { en: 'Home', ru: 'Главная', uk: 'Головна' }, d: { en: 'NixelOS main page, overview and socials', ru: 'Главная страница NixelOS, обзор и соцсети', uk: 'Головна сторінка NixelOS, огляд та соцмережі' } },
    { f: 'downloads.html', t: { en: 'Downloads', ru: 'Загрузки', uk: 'Завантаження' }, d: { en: 'Download NixelOS builds and changelogs', ru: 'Скачать сборки NixelOS и список изменений', uk: 'Завантажити збірки NixelOS та список змін' } },
    { f: 'news.html', t: { en: 'News', ru: 'Новости', uk: 'Новини' }, d: { en: 'Latest NixelOS and NXBoot updates', ru: 'Последние новости NixelOS и NXBoot', uk: 'Останні новини NixelOS та NXBoot' } },
    { f: 'min-req.html', t: { en: 'Min. Requirements', ru: 'Мин. требования', uk: 'Мін. вимоги' }, d: { en: 'Minimum hardware requirements for NixelOS', ru: 'Минимальные требования к ПК для NixelOS', uk: 'Мінімальні вимоги до ПК для NixelOS' } },
    { f: 'faq.html', t: { en: 'FAQ', ru: 'FAQ', uk: 'FAQ' }, d: { en: 'Frequently asked questions about NixelOS', ru: 'Частые вопросы о NixelOS', uk: 'Часті запитання про NixelOS' } },
    { f: 'comunicate/Users.html', t: { en: 'Users', ru: 'Пользователи', uk: 'Користувачі' }, d: { en: 'NixelOS community members and friends', ru: 'Участники сообщества NixelOS и друзья', uk: 'Учасники спільноти NixelOS та друзі' } },
    { f: 'comunicate/chat.html', t: { en: 'OS Chat', ru: 'Чат ОС', uk: 'Чат ОС' }, d: { en: 'Live NixelOS community chat', ru: 'Живой чат сообщества NixelOS', uk: 'Живий чат спільноти NixelOS' } }
  ];

  var UI = {
    en: {
      ph: 'Search the whole site',
      none: 'Nothing found',
      loading: 'Loading…',
      settings: 'Settings',
      setTitle: 'Site Settings',
      setLang: 'Language',
      setLangDesc: 'Choose interface language',
      setTheme: 'Theme',
      setThemeDesc: 'Switch between dark and light mode',
      dark: 'Dark',
      light: 'Light',
      setNotif: 'Notifications',
      setNotifDesc: 'Friend request alerts on this device',
      oobeWelcome: 'Welcome to NixelOS!',
      oobeLangSub: 'Choose your preferred language to get started.',
      oobeThemeTitle: 'Choose your theme',
      oobeThemeSub: 'Pick the look that feels right for your eyes.',
      oobeAccTitle: 'Join the community',
      oobeAccSub: 'Sign in to chat, add friends, and customize your profile — or skip for now.',
      oobeNext: 'Next',
      oobeBack: 'Back',
      oobeLogin: 'Log in / Sign up',
      oobeSkip: 'Skip',
      oobeDone: 'Continue'
    },
    ru: {
      ph: 'Поиск по всему сайту',
      none: 'Ничего не найдено',
      loading: 'Загрузка…',
      settings: 'Настройки',
      setTitle: 'Настройки сайта',
      setLang: 'Язык',
      setLangDesc: 'Выберите язык интерфейса',
      setTheme: 'Тема',
      setThemeDesc: 'Переключение тёмной и светлой темы',
      dark: 'Тёмная',
      light: 'Светлая',
      setNotif: 'Уведомления',
      setNotifDesc: 'Уведомления о запросах в друзья',
      oobeWelcome: 'Добро пожаловать в NixelOS!',
      oobeLangSub: 'Выберите удобный язык интерфейса.',
      oobeThemeTitle: 'Выберите тему',
      oobeThemeSub: 'Тёмная или светлая — можно изменить позже в настройках.',
      oobeAccTitle: 'Вход в аккаунт',
      oobeAccSub: 'Войдите, чтобы общаться в чате и добавлять друзей, или пропустите этот шаг.',
      oobeNext: 'Далее',
      oobeBack: 'Назад',
      oobeLogin: 'Войти / Регистрация',
      oobeSkip: 'Пропустить',
      oobeDone: 'Продолжить'
    },
    uk: {
      ph: 'Пошук по всьому сайту',
      none: 'Нічого не знайдено',
      loading: 'Завантаження…',
      settings: 'Налаштування',
      setTitle: 'Налаштування сайту',
      setLang: 'Мова',
      setLangDesc: 'Оберіть мову інтерфейсу',
      setTheme: 'Тема',
      setThemeDesc: 'Перемикання темної та світлої теми',
      dark: 'Темна',
      light: 'Світла',
      setNotif: 'Сповіщення',
      setNotifDesc: 'Сповіщення про запити в друзі',
      oobeWelcome: 'Вітаємо в NixelOS!',
      oobeLangSub: 'Оберіть зручну мову інтерфейсу для початку.',
      oobeThemeTitle: 'Оберіть тему',
      oobeThemeSub: 'Темна або світла — завжди можна змінити в налаштуваннях.',
      oobeAccTitle: 'Вхід в акаунт',
      oobeAccSub: 'Увійдіть, щоб спілкуватися в чаті та додавати друзів, або пропустіть цей крок.',
      oobeNext: 'Далі',
      oobeBack: 'Назад',
      oobeLogin: 'Увійти / Реєстрація',
      oobeSkip: 'Пропустити',
      oobeDone: 'Продовжити'
    }
  };

  var BUILTIN = [
    { p: 0, l: 'en', s: 'Say Hi to NixelOS. Best OS with best functions of future! Get the full performance from your PC.', w: 3 },
    { p: 0, l: 'en', s: 'About NixelOS — combines the best from Windows, Linux, and macOS.', w: 2 },
    { p: 0, l: 'en', s: 'Our Socials: Telegram and GitHub Repository. Can you become a developer?', w: 2 },
    { p: 0, l: 'ru', s: 'Скажи привет NixelOS. Лучшая ОС с лучшими функциями будущего! Полная отдача от вашего ПК.', w: 3 },
    { p: 0, l: 'ru', s: 'О NixelOS — объединяет всё лучшее из Windows, Linux и macOS.', w: 2 },
    { p: 0, l: 'ru', s: 'Наши соцсети: Telegram и репозиторий GitHub. Станьте разработчиком NixelOS.', w: 2 },
    { p: 0, l: 'uk', s: 'Скажи привіт NixelOS. Найкраща ОС з найкращими функціями майбутнього! Повна віддача від ПК.', w: 3 },
    { p: 0, l: 'uk', s: 'Про NixelOS — поєднує все найкраще з Windows, Linux та macOS.', w: 2 },
    { p: 0, l: 'uk', s: 'Наші соцмережі: Telegram та репозиторій GitHub. Станьте розробником NixelOS.', w: 2 },
    { p: 1, l: 'en', s: 'Download NixelOS v0.1 Beta Kamaz Build 019, Build 018, Build 017, Build 015, Build 014, Build 013 images (.img).', w: 3 },
    { p: 1, l: 'ru', s: 'Загрузки NixelOS v0.1 Beta Kamaz Build 019, Build 018, Build 017, Build 015, образы системы (.img).', w: 3 },
    { p: 1, l: 'uk', s: 'Завантаження NixelOS v0.1 Beta Kamaz Build 019, Build 018, Build 017, Build 015, образи системи (.img).', w: 3 },
    { p: 2, l: 'en', s: 'News: NXBoot UEFI boot support, NXBoot v0.8 NXMemDiag and NXDiagisk, FAT32 support, NixelOS v0.1 Beta.', w: 3 },
    { p: 2, l: 'ru', s: 'Новости: загрузка NXBoot с UEFI, NXBoot v0.8 NXMemDiag и NXDiagisk, поддержка FAT32, NixelOS v0.1 Beta.', w: 3 },
    { p: 2, l: 'uk', s: 'Новини: завантаження NXBoot з UEFI, NXBoot v0.8 NXMemDiag і NXDiagisk, підтримка FAT32, NixelOS v0.1 Beta.', w: 3 },
    { p: 3, l: 'en', s: 'Minimum system requirements: CPU, RAM, disk space, BIOS and UEFI compatibility for NixelOS.', w: 3 },
    { p: 3, l: 'ru', s: 'Минимальные системные требования: процессор, ОЗУ, диск, BIOS и UEFI для NixelOS.', w: 3 },
    { p: 3, l: 'uk', s: 'Мінімальні системні вимоги: процесор, ОЗП, диск, BIOS та UEFI для NixelOS.', w: 3 },
    { p: 4, l: 'en', s: 'FAQ: Frequently asked questions about installing, booting, and using NixelOS.', w: 3 },
    { p: 4, l: 'ru', s: 'FAQ: Частые вопросы об установке, запуске и использовании NixelOS.', w: 3 },
    { p: 4, l: 'uk', s: 'FAQ: Часті запитання про встановлення, запуск та використання NixelOS.', w: 3 },
    { p: 5, l: 'en', s: 'NixelOS Users: community profiles, search users, add friends, incoming friend requests.', w: 3 },
    { p: 5, l: 'ru', s: 'Пользователи NixelOS: профили сообщества, поиск участников, друзья и запросы в друзья.', w: 3 },
    { p: 5, l: 'uk', s: 'Користувачі NixelOS: профілі спільноти, пошук учасників, друзі та запити в друзі.', w: 3 },
    { p: 6, l: 'en', s: 'NixelOS Community Chat: live realtime discussion about builds, NXBoot, ideas, and feedback.', w: 3 },
    { p: 6, l: 'ru', s: 'Чат сообщества NixelOS: живое обсуждение сборок, NXBoot, идей и отзывов.', w: 3 },
    { p: 6, l: 'uk', s: 'Чат спільноти NixelOS: живе обговорення збірок, NXBoot, ідей та відгуків.', w: 3 }
  ];

  var SKIP_KEY = /^(nav|lang|open|close|back|theme|logo|menu|acc|foot|aria|or|sClose|sDel)/i;
  var CACHE_KEY = 'nx-search-v2';

  function lang() {
    var l = null;
    try { l = localStorage.getItem('nixelos-lang'); } catch (e) {}
    if (l && UI[l]) return l;
    l = document.documentElement.lang;
    return UI[l] ? l : 'en';
  }
  function tr(k) { var u = UI[lang()] || UI.en; return u[k] || UI.en[k] || k; }
  function norm(s) { return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim(); }
  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pageTitle(p) { return p.t[lang()] || p.t.en; }

  var _modalLangBusy = false;
  var _modalLangPending = null;

  async function runOriginalLangAnim(root, applyFn) {
    if (!root) { applyFn(); return; }
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items = Array.prototype.slice.call(root.querySelectorAll('h2,p,.nx-set-label,.nx-set-desc,#nx-st-dark span,#nx-st-light span,.nx-oobe-btn')).filter(function (el) {
      var r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    if (reduce || !items.length || typeof items[0].animate !== 'function') {
      applyFn();
      return;
    }
    if (_modalLangBusy) {
      _modalLangPending = [root, applyFn];
      return;
    }
    _modalLangBusy = true;
    var shown = { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' };
    var hidden = { opacity: 0, transform: 'translateY(-8px)', filter: 'blur(5px)' };
    var outs = [], applied = false;
    try {
      outs = items.map(function (el) {
        return el.animate([shown, hidden], { duration: 220, easing: 'ease-in', fill: 'forwards' });
      });
      await Promise.race([
        Promise.all(outs.map(function (a) { return a.finished; })),
        new Promise(function (r) { setTimeout(r, 600); })
      ]);
      applyFn();
      applied = true;
      var newItems = Array.prototype.slice.call(root.querySelectorAll('h2,p,.nx-set-label,.nx-set-desc,#nx-st-dark span,#nx-st-light span,.nx-oobe-btn')).filter(function (el) {
        var r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      });
      var ins = newItems.map(function (el, i) {
        return el.animate(
          [{ opacity: 0, transform: 'translateY(10px)', filter: 'blur(5px)' }, shown],
          { duration: 460, delay: Math.min(i * 28, 340), easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
        );
      });
      outs.forEach(function (a) { a.cancel(); });
      await Promise.race([
        Promise.all(ins.map(function (a) { return a.finished; })),
        new Promise(function (r) { setTimeout(r, 1400); })
      ]);
    } catch (e) {
      outs.forEach(function (a) { a.cancel(); });
      if (!applied) applyFn();
    } finally {
      _modalLangBusy = false;
      var next = _modalLangPending;
      _modalLangPending = null;
      if (next) runOriginalLangAnim(next[0], next[1]);
    }
  }

  function setSiteLang(nextLang) {
    if (!UI[nextLang]) nextLang = 'en';
    var prev = lang();
    try { localStorage.setItem('nixelos-lang', nextLang); } catch (e) {}
    if (settingsModal) {
      settingsModal.querySelectorAll('[data-slang]').forEach(function (b) {
        b.classList.toggle('on', b.getAttribute('data-slang') === nextLang);
      });
      requestAnimationFrame(syncSettingsThumbs);
    }
    var btn = document.querySelector('.lang-button[data-lang="' + nextLang + '"]');
    var activeModal = (settingsModal && settingsModal.classList.contains('open'))
      ? settingsModal.querySelector('.nx-modal-card')
      : (oobeModal && oobeModal.classList.contains('open') ? oobeModal.querySelector('.nx-modal-card') : null);

    if (btn && btn.getAttribute('aria-pressed') !== 'true') {
      btn.click();
    } else {
      document.documentElement.lang = nextLang;
      window.dispatchEvent(new CustomEvent('nixelos-langchange', { detail: { lang: nextLang } }));
    }

    if (prev !== nextLang && activeModal) {
      runOriginalLangAnim(activeModal, function () {
        if (renderSearchRef) renderSearchRef();
        syncSettingsModal();
        if (oobeModal) renderOobe();
      });
    } else {
      syncAllSiteUI();
    }
  }

  function getTheme() {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function setSiteTheme(theme, originEl) {
    theme = theme === 'light' ? 'light' : 'dark';
    var prev = getTheme();
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('nixelos-theme', theme); } catch (e) {}
    var sw = document.getElementById('theme-switch');
    if (sw) sw.setAttribute('aria-checked', String(theme === 'light'));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f5fb' : '#090a0e');
    if (prev !== theme) glFx.play('theme', originEl);
    window.dispatchEvent(new CustomEvent('nixelos-themechange', { detail: { theme: theme } }));
    syncAllSiteUI();
  }

  function getNotifsEnabled() {
    try { return localStorage.getItem('nixelos-notifs') !== 'off'; } catch (e) { return true; }
  }

  function setNotifsEnabled(on) {
    try { localStorage.setItem('nixelos-notifs', on ? 'on' : 'off'); } catch (e) {}
    if (on && typeof Notification !== 'undefined' && Notification.permission === 'default') {
      try { Notification.requestPermission(); } catch (e) {}
    }
    window.dispatchEvent(new CustomEvent('nixelos-notifs-change', { detail: { enabled: !!on } }));
    syncAllSiteUI();
  }

  window.nxSetLang = setSiteLang;
  window.nxSetTheme = setSiteTheme;
  window.nxGetNotifsEnabled = getNotifsEnabled;

  function extractLangBlocks(code, pageIdx) {
    var out = [];
    var reStart = /\b(en|ru|uk)\s*:\s*\{/g, m;
    while ((m = reStart.exec(code))) {
      var l = m[1];
      var i = m.index + m[0].length;
      var depth = 1, inStr = null, escChar = false;
      var start = i;
      while (i < code.length && depth > 0) {
        var ch = code[i];
        if (inStr) {
          if (escChar) escChar = false;
          else if (ch === '\\') escChar = true;
          else if (ch === inStr) inStr = null;
        } else {
          if (ch === '"' || ch === "'" || ch === '`') inStr = ch;
          else if (ch === '{') depth++;
          else if (ch === '}') depth--;
        }
        i++;
      }
      if (depth !== 0) continue;
      var block = code.slice(start, i - 1);
      var kv = /([A-Za-z0-9_]+)\s*:\s*("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')/g, km;
      while ((km = kv.exec(block))) {
        if (SKIP_KEY.test(km[1])) continue;
        var raw = km[2], s;
        try { s = raw[0] === '"' ? JSON.parse(raw) : raw.slice(1, -1).replace(/\\'/g, "'"); } catch (e) { continue; }
        s = s.replace(/<[^>]+>/g, ' ').replace(/\*\*|__|~~/g, '').replace(/\s+/g, ' ').trim();
        if (s.length < 3 || !/[A-Za-zА-Яа-яІіЇїЄєҐґ]/.test(s)) continue;
        if (/^[#.\/\w-]+\.(html|js|css|png|jpg|svg)/i.test(s)) continue;
        out.push({ p: pageIdx, l: l, s: s, w: /title/i.test(km[1]) ? 3 : 1 });
      }
    }
    return out;
  }

  function extract(html, pageIdx) {
    var out = [];
    var doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script:not([src])').forEach(function (sc) {
      var t = sc.textContent || '';
      if (!/\b(ru|uk)\s*:\s*\{/.test(t)) return;
      out = out.concat(extractLangBlocks(t, pageIdx));
    });
    return out;
  }

  var index = null, loadingP = null;

  function finalizeIndex(all) {
    var count = {};
    all.forEach(function (e) {
      var k = e.l + '|' + norm(e.s);
      (count[k] = count[k] || {})[e.p] = 1;
    });
    all = all.filter(function (e) { return Object.keys(count[e.l + '|' + norm(e.s)]).length < 4; });
    var seen = {};
    all = all.filter(function (e) {
      var k = e.p + '|' + e.l + '|' + norm(e.s);
      if (seen[k]) return false;
      seen[k] = 1;
      return true;
    });
    all.forEach(function (e) { e.n = norm(e.s); });
    return all;
  }

  function buildIndex() {
    if (index) return Promise.resolve(index);
    if (loadingP) return loadingP;
    try {
      var c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (c && c.length) { index = c; return Promise.resolve(index); }
    } catch (e) {}
    loadingP = Promise.all(PAGES.map(function (p, i) {
      return fetch(ROOT + p.f, { credentials: 'same-origin' })
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (h) { return h ? extract(h, i) : []; })
        .catch(function () { return []; });
    })).then(function (lists) {
      var all = BUILTIN.map(function (b) { return { p: b.p, l: b.l, s: b.s, w: b.w }; });
      lists.forEach(function (l) { all = all.concat(l); });
      index = finalizeIndex(all);
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(index)); } catch (e) {}
      return index;
    });
    return loadingP;
  }

  function hasWordMatch(haystack, word, singleChar) {
    if (!singleChar) return haystack.indexOf(word) > -1;
    var parts = haystack.split(/[^a-zа-яіїєґ0-9]+/i);
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] && parts[i].indexOf(word) === 0) return true;
    }
    return false;
  }

  function run(q) {
    var nq = norm(q);
    var words = nq.split(' ').filter(Boolean);
    var res = [];
    if (!words.length) return res;
    var curLang = lang();
    var singleChar = nq.length === 1;

    PAGES.forEach(function (p, i) {
      var titleStr = p.t[curLang] || p.t.en;
      var descStr = p.d[curLang] || p.d.en;
      var tn = norm(titleStr);
      if (words.every(function (w) { return hasWordMatch(tn, w, singleChar); })) {
        res.push({ p: i, s: descStr, score: 100, title: true });
      }
    });

    (index || []).forEach(function (e) {
      if (e.l !== curLang) return;
      for (var i = 0; i < words.length; i++) {
        if (!hasWordMatch(e.n, words[i], singleChar)) return;
      }
      var sc = e.w + (e.n.indexOf(nq) > -1 ? 2 : 0) - Math.min(e.s.length, 300) / 600;
      res.push({ p: e.p, s: e.s, score: sc });
    });

    res.sort(function (a, b) { return b.score - a.score; });
    var per = {}, out = [];
    res.forEach(function (r) {
      if (!r.s || !r.s.trim()) return;
      per[r.p] = (per[r.p] || 0) + 1;
      if (per[r.p] <= 3 && out.length < 12) out.push(r);
    });
    return out;
  }

  function snippet(s, q) {
    var nq = norm(q);
    var words = nq.split(' ').filter(Boolean);
    var low = s.toLowerCase().replace(/ё/g, 'е');
    var pos = -1;
    for (var i = 0; i < words.length; i++) {
      pos = low.indexOf(words[i]);
      if (pos > -1) break;
    }
    if (pos < 0) pos = 0;
    var a = Math.max(0, pos - 45), b = Math.min(s.length, pos + 115);
    var txt = (a > 0 ? '…' : '') + s.slice(a, b) + (b < s.length ? '…' : '');
    var h = esc(txt);
    words.forEach(function (w) {
      if (!w) return;
      var escW = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/е/g, '[её]');
      var re = nq.length === 1 ? new RegExp('(^|[^A-Za-zА-Яа-яІіЇїЄєҐґ0-9])(' + escW + ')', 'gi') : new RegExp('(' + escW + ')', 'gi');
      h = nq.length === 1 ? h.replace(re, '$1<b>$2</b>') : h.replace(re, '<b>$1</b>');
    });
    return h;
  }

  var renderSearchRef = null;

  function mountSearch() {
    var header = document.querySelector('header');
    var toggle = document.getElementById('menu-toggle');
    if (!header || !toggle || document.getElementById('nx-search')) return;
    var anchor = toggle.closest('.top-actions') || toggle;
    var wrap = document.createElement('div');
    wrap.className = 'nx-search';
    wrap.id = 'nx-search';
    wrap.setAttribute('role', 'search');
    wrap.innerHTML =
      '<label class="nx-sbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m20 20-4-4"></path></svg>' +
      '<input type="search" autocomplete="off" spellcheck="false" enterkeyhint="search"></label>' +
      '<div class="nx-res" role="listbox"></div>';
    anchor.parentNode.insertBefore(wrap, anchor);
    var input = wrap.querySelector('input'), box = wrap.querySelector('.nx-res'), cur = -1, timer;

    function setPh() {
      input.placeholder = tr('ph');
      input.setAttribute('aria-label', tr('ph'));
    }
    setPh();

    function items() { return box.querySelectorAll('.nx-item'); }
    function mark(i) {
      var it = items(); if (!it.length) return;
      cur = (i + it.length) % it.length;
      it.forEach(function (n, k) { n.classList.toggle('act', k === cur); });
      it[cur].scrollIntoView({ block: 'nearest' });
    }
    function render() {
      var q = input.value.trim();
      if (!q.length) { box.classList.remove('open'); return; }
      if (!index) { box.innerHTML = '<div class="nx-empty">' + esc(tr('loading')) + '</div>'; box.classList.add('open'); }
      buildIndex().then(function () {
        if (input.value.trim() !== q) return;
        var r = run(q);
        cur = -1;
        if (!r.length) {
          box.innerHTML = '<div class="nx-empty">' + esc(tr('none')) + '</div>';
        } else {
          box.innerHTML = r.map(function (x) {
            return '<a class="nx-item" role="option" href="' + ROOT + PAGES[x.p].f + '" data-q="' + esc(q) + '">' +
              '<div class="nx-page">' + esc(pageTitle(PAGES[x.p])) + '</div>' +
              '<div class="nx-snip">' + snippet(x.s, q) + '</div></a>';
          }).join('');
        }
        box.classList.add('open');
      });
    }
    renderSearchRef = function () { setPh(); if (input.value.trim()) render(); };

    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(render, 100); });
    input.addEventListener('focus', function () { buildIndex(); if (input.value.trim().length) render(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); mark(cur + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); mark(cur - 1); }
      else if (e.key === 'Escape') { box.classList.remove('open'); input.blur(); }
      else if (e.key === 'Enter') {
        var it = items(); if (!it.length) return;
        e.preventDefault(); it[cur > -1 ? cur : 0].click();
      }
    });
    box.addEventListener('click', function (e) {
      var a = e.target.closest('.nx-item'); if (!a) return;
      try { sessionStorage.setItem('nx-hl', a.getAttribute('data-q') || ''); } catch (er) {}
    });
    document.addEventListener('pointerdown', function (e) { if (!wrap.contains(e.target)) box.classList.remove('open'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || '') && !(document.activeElement || {}).isContentEditable) {
        e.preventDefault(); input.focus();
      }
    });
  }

  var settingsModal = null, settingsTriggerSpan = null;

  function moveSegThumb(seg) {
    if (!seg) return;
    var thumb = seg.querySelector('.nx-seg-thumb');
    var active = seg.querySelector('button.on');
    if (!thumb || !active) return;
    thumb.style.width = active.offsetWidth + 'px';
    thumb.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }

  function syncSettingsThumbs() {
    if (!settingsModal) return;
    moveSegThumb(settingsModal.querySelector('#nx-set-lang-seg'));
    moveSegThumb(settingsModal.querySelector('#nx-set-theme-seg'));
  }

  function ensureSettingsModal() {
    if (settingsModal) return settingsModal;
    settingsModal = document.createElement('div');
    settingsModal.className = 'nx-modal-bg';
    settingsModal.id = 'nx-settings-modal';
    settingsModal.setAttribute('aria-hidden', 'true');
    settingsModal.innerHTML =
      '<div class="nx-modal-card" role="dialog" aria-modal="true" aria-labelledby="nx-set-h">' +
      '<div class="nx-modal-head"><h2 id="nx-set-h"></h2><button type="button" class="nx-modal-x" id="nx-set-x" aria-label="Close">✕</button></div>' +
      '<div class="nx-set-row nx-row-seg"><div class="nx-set-info"><span class="nx-set-label" id="nx-set-lang-l"></span><span class="nx-set-desc" id="nx-set-lang-d"></span></div>' +
      '<div class="nx-seg" id="nx-set-lang-seg"><span class="nx-seg-thumb" aria-hidden="true"></span><button type="button" data-slang="en">EN</button><button type="button" data-slang="ru">RU</button><button type="button" data-slang="uk">UK</button></div></div>' +
      '<div class="nx-set-row nx-row-seg"><div class="nx-set-info"><span class="nx-set-label" id="nx-set-theme-l"></span><span class="nx-set-desc" id="nx-set-theme-d"></span></div>' +
      '<div class="nx-seg" id="nx-set-theme-seg"><span class="nx-seg-thumb" aria-hidden="true"></span><button type="button" data-stheme="dark" id="nx-st-dark"></button><button type="button" data-stheme="light" id="nx-st-light"></button></div></div>' +
      '<div class="nx-set-row"><div class="nx-set-info"><span class="nx-set-label" id="nx-set-notif-l"></span><span class="nx-set-desc" id="nx-set-notif-d"></span></div>' +
      '<button type="button" class="nx-toggle" id="nx-set-notif-sw" role="switch" aria-checked="true"></button></div>' +
      '</div>';
    document.body.appendChild(settingsModal);

    function close() {
      settingsModal.classList.remove('open');
      settingsModal.setAttribute('aria-hidden', 'true');
    }
    settingsModal.querySelector('#nx-set-x').addEventListener('click', close);
    settingsModal.addEventListener('mousedown', function (e) { if (e.target === settingsModal) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && settingsModal.classList.contains('open')) close();
    });
    settingsModal.querySelectorAll('[data-slang]').forEach(function (b) {
      b.addEventListener('click', function () { setSiteLang(b.getAttribute('data-slang'), b); });
    });
    settingsModal.querySelectorAll('[data-stheme]').forEach(function (b) {
      b.addEventListener('click', function () { setSiteTheme(b.getAttribute('data-stheme'), b); });
    });
    settingsModal.querySelector('#nx-set-notif-sw').addEventListener('click', function () {
      setNotifsEnabled(!getNotifsEnabled());
    });
    window.addEventListener('resize', syncSettingsThumbs, { passive: true });
    syncSettingsModal();
    return settingsModal;
  }

  function syncSettingsModal() {
    if (settingsTriggerSpan) settingsTriggerSpan.textContent = tr('settings');
    if (!settingsModal) return;
    settingsModal.querySelector('#nx-set-h').textContent = tr('setTitle');
    settingsModal.querySelector('#nx-set-lang-l').textContent = tr('setLang');
    settingsModal.querySelector('#nx-set-lang-d').textContent = tr('setLangDesc');
    settingsModal.querySelector('#nx-set-theme-l').textContent = tr('setTheme');
    settingsModal.querySelector('#nx-set-theme-d').textContent = tr('setThemeDesc');
    settingsModal.querySelector('#nx-st-dark').innerHTML = ICON_MOON + '<span>' + esc(tr('dark')) + '</span>';
    settingsModal.querySelector('#nx-st-light').innerHTML = ICON_SUN + '<span>' + esc(tr('light')) + '</span>';
    settingsModal.querySelector('#nx-set-notif-l').textContent = tr('setNotif');
    settingsModal.querySelector('#nx-set-notif-d').textContent = tr('setNotifDesc');
    var curL = lang();
    settingsModal.querySelectorAll('[data-slang]').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-slang') === curL);
    });
    var curT = getTheme();
    settingsModal.querySelectorAll('[data-stheme]').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-stheme') === curT);
    });
    var nSw = settingsModal.querySelector('#nx-set-notif-sw');
    nSw.setAttribute('aria-checked', String(getNotifsEnabled()));
    nSw.setAttribute('aria-label', tr('setNotif'));
    requestAnimationFrame(syncSettingsThumbs);
  }

  function mountSettingsTab() {
    var nav = document.querySelector('#site-menu .menu-links');
    if (!nav || document.getElementById('nx-settings-btn')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'nx-settings-btn';
    btn.className = 'menu-link nx-settings-trigger';
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="3.2"></circle>' +
      '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"></path>' +
      '</svg><span>' + esc(tr('settings')) + '</span>';
    settingsTriggerSpan = btn.querySelector('span');
    btn.addEventListener('click', function () {
      var closeBtn = document.getElementById('menu-close');
      if (closeBtn) closeBtn.click();
      var m = ensureSettingsModal();
      syncSettingsModal();
      glFx.play('modal', btn);
      requestAnimationFrame(function () {
        m.classList.add('open');
        m.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(syncSettingsThumbs);
      });
    });
    nav.appendChild(btn);
  }

  var oobeModal = null, oobeStep = 0;

  function hasExistingSession() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && /^sb-.*-auth-token$/i.test(k)) {
          var v = localStorage.getItem(k);
          if (v && v.indexOf('access_token') > -1) return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function renderOobe() {
    if (!oobeModal) return;
    var card = oobeModal.querySelector('.nx-modal-card');
    var curL = lang(), curT = getTheme();
    var dots = '<div class="nx-oobe-steps">' +
      '<span class="nx-oobe-dot' + (oobeStep >= 0 ? ' on' : '') + '"></span>' +
      '<span class="nx-oobe-dot' + (oobeStep >= 1 ? ' on' : '') + '"></span>' +
      '<span class="nx-oobe-dot' + (oobeStep >= 2 ? ' on' : '') + '"></span></div>';

    if (oobeStep === 0) {
      card.innerHTML = dots +
        '<div class="nx-oobe-body">' +
        '<h2 class="nx-oobe-title">' + esc(tr('oobeWelcome')) + '</h2>' +
        '<p class="nx-oobe-sub">' + esc(tr('oobeLangSub')) + '</p>' +
        '<div class="nx-oobe-opts">' +
        '<button type="button" class="nx-oobe-opt' + (curL === 'en' ? ' on' : '') + '" data-olang="en">English</button>' +
        '<button type="button" class="nx-oobe-opt' + (curL === 'ru' ? ' on' : '') + '" data-olang="ru">Русский</button>' +
        '<button type="button" class="nx-oobe-opt' + (curL === 'uk' ? ' on' : '') + '" data-olang="uk">Українська</button>' +
        '</div>' +
        '<div class="nx-oobe-actions"><button type="button" class="nx-oobe-btn" id="nx-oobe-next">' + esc(tr('oobeNext')) + '</button></div></div>';
      card.querySelectorAll('[data-olang]').forEach(function (b) {
        b.addEventListener('click', function () {
          card.querySelectorAll('[data-olang]').forEach(function (x) { x.classList.toggle('on', x === b); });
          setSiteLang(b.getAttribute('data-olang'));
        });
      });
      card.querySelector('#nx-oobe-next').addEventListener('click', function () { oobeStep = 1; renderOobe(); });
    } else if (oobeStep === 1) {
      card.innerHTML = dots +
        '<div class="nx-oobe-body">' +
        '<h2 class="nx-oobe-title">' + esc(tr('oobeThemeTitle')) + '</h2>' +
        '<p class="nx-oobe-sub">' + esc(tr('oobeThemeSub')) + '</p>' +
        '<div class="nx-oobe-opts cols2">' +
        '<button type="button" class="nx-oobe-opt' + (curT === 'dark' ? ' on' : '') + '" data-otheme="dark">' + ICON_MOON + '<span>' + esc(tr('dark')) + '</span></button>' +
        '<button type="button" class="nx-oobe-opt' + (curT === 'light' ? ' on' : '') + '" data-otheme="light">' + ICON_SUN + '<span>' + esc(tr('light')) + '</span></button>' +
        '</div>' +
        '<div class="nx-oobe-actions">' +
        '<button type="button" class="nx-oobe-btn ghost" id="nx-oobe-back">' + esc(tr('oobeBack')) + '</button>' +
        '<button type="button" class="nx-oobe-btn" id="nx-oobe-next">' + esc(tr('oobeNext')) + '</button></div></div>';
      card.querySelectorAll('[data-otheme]').forEach(function (b) {
        b.addEventListener('click', function () {
          setSiteTheme(b.getAttribute('data-otheme'), b);
          renderOobe();
        });
      });
      card.querySelector('#nx-oobe-back').addEventListener('click', function () { oobeStep = 0; renderOobe(); });
      card.querySelector('#nx-oobe-next').addEventListener('click', function () { oobeStep = 2; renderOobe(); });
    } else {
      var loggedIn = hasExistingSession();
      card.innerHTML = dots +
        '<div class="nx-oobe-body">' +
        '<h2 class="nx-oobe-title">' + esc(tr('oobeAccTitle')) + '</h2>' +
        '<p class="nx-oobe-sub">' + esc(tr('oobeAccSub')) + '</p>' +
        '<div class="nx-oobe-actions">' +
        '<button type="button" class="nx-oobe-btn ghost" id="nx-oobe-back">' + esc(tr('oobeBack')) + '</button>' +
        (loggedIn
          ? '<button type="button" class="nx-oobe-btn" id="nx-oobe-skip">' + esc(tr('oobeDone')) + '</button>'
          : '<button type="button" class="nx-oobe-btn ghost" id="nx-oobe-skip">' + esc(tr('oobeSkip')) + '</button>' +
            '<a class="nx-oobe-btn" id="nx-oobe-login" href="' + ROOT + 'Auth/login.html">' + esc(tr('oobeLogin')) + '</a>') +
        '</div></div>';
      card.querySelector('#nx-oobe-back').addEventListener('click', function () { oobeStep = 1; renderOobe(); });
      card.querySelector('#nx-oobe-skip').addEventListener('click', finishOobe);
      var lBtn = card.querySelector('#nx-oobe-login');
      if (lBtn) lBtn.addEventListener('click', function () { try { localStorage.setItem('nixelos-oobe-done', '1'); } catch (e) {} });
    }
  }

  function finishOobe() {
    try { localStorage.setItem('nixelos-oobe-done', '1'); } catch (e) {}
    if (oobeModal) {
      oobeModal.classList.remove('open');
      setTimeout(function () { if (oobeModal && oobeModal.parentNode) oobeModal.remove(); oobeModal = null; }, 280);
    }
  }

  function maybeMountOobe() {
    if (/\/Auth\//i.test(location.pathname)) return;
    try { if (localStorage.getItem('nixelos-oobe-done') === '1') return; } catch (e) { return; }
    oobeModal = document.createElement('div');
    oobeModal.className = 'nx-modal-bg';
    oobeModal.id = 'nx-oobe-modal';
    oobeModal.innerHTML = '<div class="nx-modal-card" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(oobeModal);
    oobeStep = 0;
    renderOobe();
    glFx.play('modal');
    requestAnimationFrame(function () { if (oobeModal) oobeModal.classList.add('open'); });
  }

  function syncAllSiteUI() {
    if (_modalLangBusy) return;
    if (renderSearchRef) renderSearchRef();
    syncSettingsModal();
    if (oobeModal) renderOobe();
  }

  function bindGlobalSync() {
    document.addEventListener('click', function (e) {
      var lb = e.target.closest && e.target.closest('.lang-button');
      if (lb && lb.dataset.lang) {
        try { localStorage.setItem('nixelos-lang', lb.dataset.lang); } catch (er) {}
        if (!_modalLangBusy) {
          syncAllSiteUI();
          setTimeout(function () { if (!_modalLangBusy) syncAllSiteUI(); }, 260);
        }
      }
      var ts = e.target.closest && e.target.closest('#theme-switch');
      if (ts) {
        glFx.play('theme', ts);
        setTimeout(syncAllSiteUI, 30);
      }
    }, true);

    window.addEventListener('nixelos-langchange', syncAllSiteUI);
    window.addEventListener('nixelos-themechange', syncAllSiteUI);
    window.addEventListener('storage', function (e) {
      if (e.key === 'nixelos-lang' || e.key === 'nixelos-theme' || e.key === 'nixelos-notifs') syncAllSiteUI();
    });

    new MutationObserver(syncAllSiteUI).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'data-theme']
    });
  }

  function highlight() {
    var q;
    try { q = sessionStorage.getItem('nx-hl'); sessionStorage.removeItem('nx-hl'); } catch (e) {}
    if (!q) return;
    var words = norm(q).split(' ').filter(Boolean);
    if (!words.length) return;
    setTimeout(function () {
      var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          var p = n.parentElement;
          if (!p || p.closest('header,aside,script,style,.nx-search,canvas,.nx-modal-bg')) return NodeFilter.FILTER_REJECT;
          return n.nodeValue.trim().length > 1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }), n, hit = null, at = 0, word;
      while ((n = w.nextNode())) {
        var low = n.nodeValue.toLowerCase().replace(/ё/g, 'е');
        for (var i = 0; i < words.length; i++) {
          at = low.indexOf(words[i]);
          if (at > -1) { word = words[i]; break; }
        }
        if (at > -1) { hit = n; break; }
      }
      if (!hit) return;
      try {
        var r = document.createRange();
        r.setStart(hit, at); r.setEnd(hit, at + word.length);
        var m = document.createElement('mark'); m.className = 'nx-hl';
        r.surroundContents(m);
        m.scrollIntoView({ block: 'center', behavior: 'smooth' });
        setTimeout(function () { m.classList.add('fade'); }, 3500);
        setTimeout(function () { if (m.parentNode) { m.replaceWith.apply(m, m.childNodes); } }, 4300);
      } catch (e) {}
    }, 700);
  }

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    mountSearch();
    mountSettingsTab();
    bindGlobalSync();
    highlight();
    maybeMountOobe();
  });
})();
