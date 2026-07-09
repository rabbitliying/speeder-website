const fs = require('fs');
let c = fs.readFileSync('C:/Users/bally/.openclaw/workspace/speeder_deploy/index.html', 'utf8');

// Hero
c = c.replace('<h1 class="hero-title">', '<h1 class="hero-title anim-gradient-text">');
c = c.replace('<p class="hero-sub">', '<p class="hero-sub anim-blur">');
c = c.replace('<a href="sdwan.html" class="btn-primary filled">', '<a href="sdwan.html" class="btn-primary filled anim-scale">');
c = c.replace('<a href="about.html#contact" class="btn-primary outline">', '<a href="about.html#contact" class="btn-primary outline anim-scale">');

// Contact title & sub
c = c.replace('<h2 class="contact-title reveal reveal-delay-1">', '<h2 class="contact-title anim-gradient-text">');
c = c.replace('<p class="contact-sub reveal reveal-delay-2">', '<p class="contact-sub anim-blur">');
c = c.replace('<a href="mailto:bally.su@speeder.net.cn" class="btn-primary filled">立即咨询</a>', '<a href="mailto:bally.su@speeder.net.cn" class="btn-primary filled anim-scale">立即咨询</a>');
c = c.replace('<a href="tel:+8613771706800" class="btn-primary outline">预约演示</a>', '<a href="tel:+8613771706800" class="btn-primary outline anim-scale">预约演示</a>');

fs.writeFileSync('C:/Users/bally/.openclaw/workspace/speeder_deploy/index.html', c);
console.log('done');
