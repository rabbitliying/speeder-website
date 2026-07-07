const fs = require('fs');
const path = require('path');

// ── Read source (strip BOM) ──
let src = fs.readFileSync(
  path.join(__dirname, 'speeder_v2_combined.html'), 'utf8'
);
if (src.charCodeAt(0) === 0xFEFF) src = src.slice(1);

// ── Extract CSS ──
const STYLE_END = src.indexOf('</style>');
let css = src.substring(0, STYLE_END);

// ── CSS modifications ──
css = css.replace(
  /html\s*\{([^}]*)scroll-snap-type:[^;]*;/g,
  (m, rest) => 'html {' + rest
);
css = css.replace(/scroll-behavior:\s*smooth;?/g, '');
css = css.replace('overflow-y: scroll;', '');
css = css.replace(
  '<title>苏州世必得科技 | SPEEDER NETWORKS</title>',
  '<title>UniSASE网络安全 | SPEEDER NETWORKS</title>'
);
css = css.replace(/#hero/g, '#unisase-hero');
// Remove all section display rules (we'll use our own)
// Also remove splash-related CSS since there's no splash

// ── Build a COMPLETE, CORRECT CSS for unisase ──
// Start fresh from source CSS, strip broken rules, keep working ones
// Then append section-specific styles
let sectionCSS = `

/* ============================================
   UniSASE SECTION STYLES
   ============================================ */

/* Hero */
#unisase-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--bg);
  overflow: hidden;
  padding: 80px 60px;
}

#unisase-hero .hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 50%, #0a3828 0%, #042018 50%, #021510 100%);
}

#unisase-hero .hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 70% 30%, transparent 0%, rgba(2,21,16,0.6) 100%);
}

#unisase-hero .network-canvas,
#unisase-hero .hero-particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

#unisase-hero .hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#unisase-hero .hero-text-block {
  text-align: center;
  max-width: 900px;
}

#unisase-hero .hero-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--accent);
  letter-spacing: 2px;
  margin-bottom: 20px;
  opacity: 0.8;
}

#unisase-hero .hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(42px, 6vw, 80px);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  margin: 0 0 20px;
}

#unisase-hero .hero-title .accent {
  color: var(--accent);
}

#unisase-hero .hero-tagline {
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 600;
  color: var(--accent);
  margin: 0 0 12px;
  letter-spacing: 4px;
}

#unisase-hero .hero-sub {
  font-size: 15px;
  color: rgba(255,255,255,0.55);
  margin: 0 0 40px;
  line-height: 1.8;
}

#unisase-hero .hero-stats {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

#unisase-hero .hero-stat {
  text-align: center;
}

#unisase-hero .hero-stat-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

#unisase-hero .hero-stat-num em {
  font-style: normal;
  color: var(--accent);
}

#unisase-hero .hero-stat-label {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 1px;
  margin-top: 4px;
}

#unisase-hero .hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Section base */
.page-section {
  padding: 100px 60px;
  background: var(--bg);
  position: relative;
}

/* Section header */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--accent);
  margin-bottom: 16px;
}

.module-title-zh {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
}

.module-tagline {
  font-size: 16px;
  color: rgba(255,255,255,0.5);
  margin: 0;
}

/* SASE Overview */
#sase-overview {
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-mid) 100%);
}

.overview-layout {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.overview-visual {
  position: relative;
}

.overview-image-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(93,109,86,0.3);
}

.overview-image-wrap img {
  width: 100%;
  display: block;
}

.overview-image-glow {
  position: absolute;
  inset: -2px;
  background: radial-gradient(ellipse at 50% 50%, var(--accent-dim) 0%, transparent 70%);
  opacity: 0.3;
  pointer-events: none;
}

.module-content {
  color: #fff;
}

.module-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--accent);
  margin: 0 0 8px;
}

.module-title-zh {
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 700;
  margin: 0 0 8px;
}

.module-title-en {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.4);
  margin: 0 0 20px;
}

.module-tagline {
  font-size: 18px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 28px;
}

.module-points {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
}

.module-points li {
  font-size: 14px;
  color: rgba(255,255,255,0.65);
  padding: 8px 0;
  border-bottom: 1px solid rgba(93,109,86,0.2);
  line-height: 1.6;
}

.module-points li strong {
  color: var(--accent);
}

.module-stats-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.module-stat-badge {
  background: rgba(93,109,86,0.15);
  border: 1px solid rgba(93,109,86,0.3);
  border-radius: 8px;
  padding: 12px 20px;
  text-align: center;
  min-width: 90px;
}

.module-stat-badge-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.module-stat-badge-num em {
  font-style: normal;
  color: var(--accent);
}

.module-stat-badge-label {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  margin-top: 4px;
}

/* Security grid */
.security-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.security-card {
  background: rgba(93,109,86,0.08);
  border: 1px solid rgba(93,109,86,0.2);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
}

.security-card:hover {
  background: rgba(93,109,86,0.15);
  border-color: rgba(93,109,86,0.4);
  transform: translateY(-4px);
}

.security-card-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.security-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 12px;
}

.security-card p {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  margin: 0 0 16px;
}

.security-card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.security-card-tag {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  background: rgba(93,109,86,0.2);
  color: var(--accent);
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

/* Components grid */
.components-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.component-card {
  background: rgba(93,109,86,0.08);
  border: 1px solid rgba(93,109,86,0.2);
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  transition: all 0.3s ease;
}

.component-card:hover {
  background: rgba(93,109,86,0.15);
  border-color: rgba(93,109,86,0.4);
  transform: translateY(-4px);
}

.component-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.component-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 6px;
}

.component-en {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--accent);
  margin: 0 0 14px;
}

.component-card p {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  margin: 0;
}

/* Cases grid */
.cases-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.case-card {
  background: rgba(93,109,86,0.08);
  border: 1px solid rgba(93,109,86,0.2);
  border-radius: 16px;
  padding: 28px;
}

.case-badge {
  display: inline-block;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  background: rgba(93,109,86,0.25);
  color: var(--accent);
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 1px;
  margin-bottom: 14px;
}

.case-card h3 {
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 12px;
  line-height: 1.4;
}

.case-card p {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
  margin: 0 0 20px;
}

.case-metrics {
  display: flex;
  gap: 16px;
  border-top: 1px solid rgba(93,109,86,0.2);
  padding-top: 16px;
}

.case-metric {
  text-align: center;
  flex: 1;
}

.case-metric-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.case-metric-label {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  margin-top: 4px;
}

/* CTA / Contact */
#contact {
  background: linear-gradient(180deg, var(--bg-mid) 0%, var(--bg) 100%);
}

.contact-inner {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.contact-title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  color: #fff;
  margin: 0 0 20px;
}

.contact-sub {
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.8;
  margin: 0 0 40px;
}

.contact-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.contact-info-item {
  font-size: 14px;
  color: rgba(255,255,255,0.5);
}

.contact-info-item a {
  color: var(--accent);
  text-decoration: none;
}

.contact-info-item a:hover {
  text-decoration: underline;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary.filled {
  background: var(--accent);
  color: #021510;
  border: 2px solid var(--accent);
}

.btn-primary.filled:hover {
  background: #7a9a7f;
  border-color: #7a9a7f;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(93,109,86,0.4);
}

.btn-primary.outline {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.3);
}

.btn-primary.outline:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

/* Footer */
footer {
  background: var(--bg);
  border-top: 1px solid rgba(93,109,86,0.2);
  padding: 24px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.footer-left, .footer-right {
  font-size: 13px;
  color: rgba(255,255,255,0.35);
}

.footer-left a, .footer-right a {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
}

.footer-left a:hover, .footer-right a:hover {
  color: var(--accent);
}

/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal.reveal-delay-1 { transition-delay: 0.1s; }
.reveal.reveal-delay-2 { transition-delay: 0.2s; }
.reveal.reveal-delay-3 { transition-delay: 0.3s; }
.reveal.reveal-delay-4 { transition-delay: 0.4s; }
.reveal.reveal-delay-5 { transition-delay: 0.5s; }

body:not(.page-ready) .reveal {
  opacity: 1;
  transform: none;
}

/* Responsive */
@media (max-width: 900px) {
  .overview-layout { grid-template-columns: 1fr; gap: 40px; }
  .security-grid, .components-grid, .cases-grid { grid-template-columns: 1fr; }
  .page-section { padding: 60px 24px; }
  #unisase-hero { padding: 60px 24px; }
  .hero-stats { gap: 24px; }
  footer { padding: 24px; flex-direction: column; text-align: center; }
}
`;

// ── Extract JS ──
const JS_START = src.indexOf('<script>', src.indexOf('<script>') + 1);
let js = src.substring(JS_START);
js = js.replace(/[\r\n]+\s*<\/body>\s*<\/html>\s*$/, '');

// Strip splash IIFE
var runCallPattern = 'runCountdown();\n})();';
var runIdx = js.indexOf(runCallPattern);
var ss = js.indexOf('/* ===== SPLASH ===== */');
if (runIdx !== -1 && ss !== -1) {
  var splashEnd = runIdx + runCallPattern.length;
  js = js.substring(0, ss) + js.substring(splashEnd);
}

// Strip MutationObserver IIFE
var moTag = '/* Splash结束后';
var moIdx = js.indexOf(moTag);
if (moIdx !== -1) {
  var moEnd = js.lastIndexOf('})();');
  js = js.substring(0, moIdx) + js.substring(moEnd + 5);
}

// Strip sessionStorage
js = js.replace(/sessionStorage\.setItem\([^)]+\);\n*/g, '');

// ── Nav HTML ──
const navHTML = `<header id="mainNav">
  <div class="logo-wrap">
    <img src="logo_new.png" class="logo-img" alt="SPEEDER NETWORKS">
  </div>
  <ul class="nav-links">
    <li><a href="index.html">首页</a></li>
    <li class="nav-has-sub">
      <a href="sdwan.html">线路融合池 <span class="nav-arrow">▼</span></a>
      <ul class="nav-sub">
        <li><a href="sdwan.html#sdwan-overview">产品概述</a></li>
        <li><a href="sdwan.html#sdwan-tech">核心技术</a></li>
        <li><a href="sdwan.html#sdwan-hardware">硬件型号</a></li>
        <li><a href="sdwan.html#sdwan-cases">客户案例</a></li>
      </ul>
    </li>
    <li class="nav-has-sub">
      <a href="unisase.html" class="active">网络安全 <span class="nav-arrow">▼</span></a>
      <ul class="nav-sub">
        <li><a href="unisase.html#sase-overview">产品概述</a></li>
        <li><a href="unisase.html#sase-security">安全架构</a></li>
        <li><a href="unisase.html#sase-components">核心组件</a></li>
        <li><a href="unisase.html#sase-cases">客户案例</a></li>
      </ul>
    </li>
    <li class="nav-has-sub">
      <a href="ai.html">AI智能运维 <span class="nav-arrow">▼</span></a>
      <ul class="nav-sub">
        <li><a href="ai.html#ai-overview">产品概述</a></li>
        <li><a href="ai.html#ai-monitoring">主动监控</a></li>
        <li><a href="ai.html#ai-capabilities">AI能力</a></li>
        <li><a href="ai.html#ai-oms">数字化服务</a></li>
      </ul>
    </li>
    <li class="nav-has-sub">
      <a href="products.html">代理产品 <span class="nav-arrow">▼</span></a>
      <ul class="nav-sub">
        <li><a href="products.html#products-overview">产品概览</a></li>
        <li><a href="products.html#products-features">核心优势</a></li>
        <li><a href="products.html#contact">咨询报价</a></li>
      </ul>
    </li>
    <li><a href="about.html">关于我们</a></li>
    <li><a href="about.html#contact" class="nav-cta">联系我们</a></li>
  </ul>
</header>`;

// ── Body HTML (no splash) ──
const bodyHTML = `
<!-- Custom Cursor -->
<div id="cursor-ring"></div>
<div id="cursor-dot"></div>

${navHTML}

<!-- HERO -->
<section id="unisase-hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-particles" id="particles"></div>
  <canvas class="network-canvas" id="networkCanvas"></canvas>
  <div class="hero-content">
    <div class="hero-text-block">
      <p class="hero-eyebrow">// UniSASE · 统一安全访问服务边缘</p>
      <h1 class="hero-title">UniSASE<span class="accent">网络安全栈</span></h1>
      <p class="hero-tagline">零信任 · 全球骨干 · 主动防护</p>
      <p class="hero-sub">统一身份策略 · 180天全量日志 · 6大安全组件协同防护</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="hero-stat-num">&lt;<em>1</em>ms</div><div class="hero-stat-label">处理延时</div></div>
        <div class="hero-stat"><div class="hero-stat-num"><em>150</em>万+</div><div class="hero-stat-label">威胁规则</div></div>
        <div class="hero-stat"><div class="hero-stat-num"><em>180</em>天</div><div class="hero-stat-label">日志保留</div></div>
        <div class="hero-stat"><div class="hero-stat-num"><em>ZTNA</em></div><div class="hero-stat-label">零信任</div></div>
      </div>
      <div class="hero-actions">
        <a href="#sase-overview" class="btn-primary filled">了解方案 →</a>
        <a href="about.html#contact" class="btn-primary outline">联系我们</a>
      </div>
    </div>
  </div>
</section>

<!-- SASE OVERVIEW -->
<section id="sase-overview" class="page-section">
  <div class="overview-layout">
    <div class="overview-visual reveal" data-3d-tilt>
      <div class="overview-image-wrap">
        <img src="img_security_1.png" alt="UniSASE安全架构">
        <div class="overview-image-glow"></div>
      </div>
    </div>
    <div class="module-content">
      <p class="section-label">01 · 产品概述</p>
      <p class="module-eyebrow">UniSASE安全栈 / Unified SASE</p>
      <h2 class="module-title-zh reveal">UniSASE安全栈</h2>
      <p class="module-title-en reveal reveal-delay-1">UNIFIED SASE SECURITY STACK</p>
      <p class="module-tagline reveal reveal-delay-2">网络与安全，从不妥协</p>
      <ul class="module-points reveal reveal-delay-3">
        <li><strong>6大组件：</strong>UniAuth · UniCtrl · UniLog · UniPOP · UniGate · UniMobile</li>
        <li><strong>150+全球节点</strong>，处理延时&lt;1ms</li>
        <li>零信任网络隔离，<strong>微隔离分段防护</strong></li>
        <li><strong>180天全量会话日志</strong>，满足公安部151号令</li>
        <li>DPI识别<strong>11大类、千种应用</strong>，精准管控</li>
      </ul>
      <div class="module-stats-row reveal reveal-delay-4">
        <div class="module-stat-badge"><div class="module-stat-badge-num"><em>&lt;1</em>ms</div><div class="module-stat-badge-label">处理延时</div></div>
        <div class="module-stat-badge"><div class="module-stat-badge-num"><em>150</em>万+</div><div class="module-stat-badge-label">威胁规则</div></div>
        <div class="module-stat-badge"><div class="module-stat-badge-num"><em>180</em>天</div><div class="module-stat-badge-label">日志保留</div></div>
        <div class="module-stat-badge"><div class="module-stat-badge-num"><em>ZTNA</em></div><div class="module-stat-badge-label">零信任</div></div>
      </div>
    </div>
  </div>
</section>

<!-- ZTNA SECURITY -->
<section id="sase-security" class="page-section">
  <div class="section-header">
    <p class="section-label reveal">02 · 安全架构</p>
    <h2 class="module-title-zh reveal reveal-delay-1">ZTNA零信任安全架构</h2>
    <p class="module-tagline reveal reveal-delay-2">零信任 · 微隔离 · 全量审计 · 合规满足</p>
  </div>
  <div class="security-grid">
    <div class="security-card reveal"><div class="security-card-icon">🔗</div><h3>微隔离分段</h3><p>基于身份的微分段技术，将网络划分为精细化的安全区域，实现东西向流量的严格管控，遏制横向渗透攻击。</p><div class="security-card-tags"><span class="security-card-tag">东西向隔离</span><span class="security-card-tag">身份驱动</span><span class="security-card-tag">最小权限</span></div></div>
    <div class="security-card reveal reveal-delay-1"><div class="security-card-icon">🪪</div><h3>统一身份策略</h3><p>融合多因素认证、单点登录、动态访问策略，基于用户、设备、应用多维身份实时评估访问权限，全局统一管控。</p><div class="security-card-tags"><span class="security-card-tag">MFA</span><span class="security-card-tag">SSO</span><span class="security-card-tag">动态策略</span></div></div>
    <div class="security-card reveal reveal-delay-2"><div class="security-card-icon">📋</div><h3>全量审计</h3><p>180天全量会话日志，完整记录用户行为、流量轨迹、安全事件，满足公安部151号令及等保2.0合规要求。</p><div class="security-card-tags"><span class="security-card-tag">180天留存</span><span class="security-card-tag">等保合规</span><span class="security-card-tag">溯源分析</span></div></div>
    <div class="security-card reveal reveal-delay-3"><div class="security-card-icon">✅</div><h3>合规满足</h3><p>内建等保2.0二/三级、金融行业数据安全、跨国合规框架，策略模板一键部署，合规审计全程记录。</p><div class="security-card-tags"><span class="security-card-tag">等保2.0</span><span class="security-card-tag">151号令</span><span class="security-card-tag">数据安全法</span></div></div>
  </div>
</section>

<!-- SASE COMPONENTS -->
<section id="sase-components" class="page-section">
  <div class="section-header">
    <p class="section-label reveal">03 · 核心组件</p>
    <h2 class="module-title-zh reveal reveal-delay-1">6大安全组件</h2>
    <p class="module-tagline reveal reveal-delay-2">模块化架构 · 协同联动 · 按需部署</p>
  </div>
  <div class="components-grid">
    <div class="component-card reveal"><div class="component-icon">🪪</div><h3>UniAuth</h3><p class="component-en">UNIFIED IDENTITY</p><p>统一身份认证与访问管理，多因素认证、SSO单点登录、动态风险评估</p></div>
    <div class="component-card reveal reveal-delay-1"><div class="component-icon">⚙️</div><h3>UniCtrl</h3><p class="component-en">POLICY ENGINE</p><p>智能策略引擎，基于身份的微分段、DPI应用识别、流量精准管控</p></div>
    <div class="component-card reveal reveal-delay-2"><div class="component-icon">📋</div><h3>UniLog</h3><p class="component-en">FULL LOGGING</p><p>180天全量会话日志，行为分析、合规审计、威胁溯源一体化</p></div>
    <div class="component-card reveal reveal-delay-3"><div class="component-icon">🌍</div><h3>UniPOP</h3><p class="component-en">SECURITY EDGE</p><p>150+全球安全POP节点就近接入、分布式防护、低延迟体验</p></div>
    <div class="component-card reveal reveal-delay-4"><div class="component-icon">🛡️</div><h3>UniGate</h3><p class="component-en">SECURITY GATEWAY</p><p>下一代防火墙、IPS入侵防御、恶意域名拦截、APT高级威胁防护</p></div>
    <div class="component-card reveal reveal-delay-5"><div class="component-icon">📱</div><h3>UniMobile</h3><p class="component-en">MOBILE SECURITY</p><p>移动设备安全管控 MAM/MDM 合一，保护企业移动设备安全</p></div>
  </div>
</section>

<!-- SASE CASES -->
<section id="sase-cases" class="page-section">
  <div class="section-header">
    <p class="section-label reveal">04 · 客户案例</p>
    <h2 class="module-title-zh reveal reveal-delay-1">行业客户案例</h2>
    <p class="module-tagline reveal reveal-delay-2">覆盖金融、制造、医疗、跨国企业</p>
  </div>
  <div class="cases-grid">
    <div class="case-card reveal"><span class="case-badge">金融行业</span><h3>某头部券商 · 全网安全升级</h3><p>部署UniSASE安全栈，实现全国200+营业部零信任接入，180天日志合规留存，客户满意度100%。</p><div class="case-metrics"><div class="case-metric"><div class="case-metric-num">200+</div><div class="case-metric-label">营业部</div></div><div class="case-metric"><div class="case-metric-num">180天</div><div class="case-metric-label">日志留存</div></div><div class="case-metric"><div class="case-metric-num">&lt;1ms</div><div class="case-metric-label">处理延迟</div></div></div></div>
    <div class="case-card reveal reveal-delay-1"><span class="case-badge">先进制造</span><h3>某新能源车企 · 研发网微隔离</h3><p>部署UniAuth + UniCtrl，实现研发网与办公网微分段，核心数据零泄露，攻击横向移动阻截率100%。</p><div class="case-metrics"><div class="case-metric"><div class="case-metric-num">100%</div><div class="case-metric-label">阻截率</div></div><div class="case-metric"><div class="case-metric-num">0</div><div class="case-metric-label">数据泄露</div></div><div class="case-metric"><div class="case-metric-num">50+</div><div class="case-metric-label">分支机构</div></div></div></div>
    <div class="case-card reveal reveal-delay-2"><span class="case-badge">跨国企业</span><h3>某外资制造 · 全球骨干安全接入</h3><p>在中国区部署UniPOP + UniGate，就近接入全球骨干网，威胁阻截率99.7%，合规审计全程可视化。</p><div class="case-metrics"><div class="case-metric"><div class="case-metric-num">99.7%</div><div class="case-metric-label">阻截率</div></div><div class="case-metric"><div class="case-metric-num">150+</div><div class="case-metric-label">POP节点</div></div><div class="case-metric"><div class="case-metric-num">30%</div><div class="case-metric-label">成本节省</div></div></div></div>
  </div>
</section>

<!-- CTA -->
<section id="contact" class="page-section">
  <div class="contact-inner">
    <p class="section-label reveal">LET'S TALK</p>
    <h2 class="contact-title reveal reveal-delay-1">准备好构建你的安全体系？</h2>
    <p class="contact-sub reveal reveal-delay-2">无论是网络升级、安全合规，还是零信任改造 —<br>我们随时准备为你定制方案。</p>
    <div class="contact-actions reveal reveal-delay-3">
      <a href="mailto:bally.su@speeder.net.cn" class="btn-primary filled">立即咨询</a>
      <a href="tel:+8613771706800" class="btn-primary outline">预约演示</a>
    </div>
    <div class="contact-info reveal reveal-delay-4">
      <div class="contact-info-item"><span>📞</span> <a href="tel:+8613771706800">+86 137 7170 6800</a></div>
      <div class="contact-info-item"><span>✉</span> <a href="mailto:bally.su@speeder.net.cn">bally.su@speeder.net.cn</a></div>
      <div class="contact-info-item"><span>📍</span> 苏州市工业园区苏惠路88号环球财富广场1幢2709室</div>
    </div>
  </div>
</section>

<footer>
  <div class="footer-left">© 2025 <a href="index.html">苏州世必得科技有限公司</a> · SPEEDER NETWORKS · All rights reserved.</div>
  <div class="footer-right"><a href="https://beian.miit.gov.cn" target="_blank">苏ICP备2024120577号-1</a></div>
</footer>
`;

// ── Assemble: base CSS + section CSS + head/body close ──
const newHtml =
  css +
  sectionCSS +
  '\n</style>\n</head>\n<body class="page-ready">\n' +
  bodyHTML +
  '\n' +
  js +
  '\n</body>\n</html>';

fs.writeFileSync(
  path.join(__dirname, 'unisase.html'),
  newHtml,
  'utf8'
);

console.log('Written! Size:', newHtml.length, 'chars');
