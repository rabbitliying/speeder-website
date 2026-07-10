# 苏州世必得科技 网站部署指南

## 📦 源码包说明

将 `speeder_deploy/` 文件夹内的以下文件上传到网站根目录即可：

### 必须上传的 HTML 文件（6个）
```
index.html      # 首页（含启动画面/倒计时）
products.html   # 产品列表页
sdwan.html      # SD-WAN 方案页
unisase.html    # UniSASE 安全方案页
ai.html         # AI 智能运维页
about.html      # 关于我们页
```

### 必须上传的 CSS/JS 文件（2个）
```
speeder_animate.css   # 页面动画样式（淡入、滑入、打字机等）
speeder_animate.js    # 页面动画脚本
```

### 可选上传的资源文件（已有则覆盖）
```
logo.png              # 网站 Logo
logo_nobg.png         # 透明底 Logo
```

### 配置文件（2个）
```
.nojekyll             # 必须存在，GitHub Pages 识别标志（Linux服务器通常需要，Windows服务器不需要可忽略）
netlify.toml          # Netlify 部署配置（仅在使用 Netlify 时需要）
```

---

## 🖥️ 部署环境要求

### 最低环境
- **Web 服务器：** Nginx 1.18+ / Apache 2.4+ / IIS 8+
- **操作系统：** Linux (CentOS 7+ / Ubuntu 18.04+) 或 Windows Server 2012+
- **Node.js：** 无需（纯静态网站，无需后端）

### 浏览器兼容性
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 端口要求
- HTTP 80
- HTTPS 443（推荐开启 HTTPS）

---

## 🚀 更新步骤

### 方式一：整站替换（推荐首次部署）
1. 备份现有网站文件（建议打包为 `backup_YYYYMMDD.zip`）
2. 将新版本所有 HTML 文件上传到网站根目录
3. 将 `speeder_animate.css` 和 `speeder_animate.js` 上传到与 HTML 同级目录
4. 如有图片更新，同步上传对应图片
5. 打开浏览器访问 `www.speeder.net.cn` 验证

### 方式二：增量更新（日常维护）
仅上传被修改的文件：
1. 上传被更新的 HTML 文件（如只改了 index.html，就只传 index.html）
2. 如果动画样式/脚本有更新，同步上传 speeder_animate.css 和 speeder_animate.js
3. 验证对应页面功能正常

### 上传方式
- **SFTP：** 使用 FileZilla、WinSCP 等工具连接服务器上传
- **FTP：** 使用 FTP 客户端上传
- **控制面板：** 如有 cPanel/Plesk，可通过文件管理器上传
- **命令行：** 使用 scp 命令从本地传到服务器

### 权限要求
- 网站文件目录权限建议：`755`（文件夹）/ `644`（文件）
- 所有者：www-data 或 nginx（Linux）或 IIS_IUSRS（Windows）

---

## ⚠️ 注意事项

1. **不要修改 `speeder_animate.css` 和 `speeder_animate.js` 的文件名**，页面内引用的是相对路径
2. **所有 HTML 文件必须放在同一目录下**，不要分文件夹存放
3. **刷新 CDN 缓存**（如有使用 CDN）：部署完成后需要在 CDN 控制台刷新缓存
4. **浏览器缓存**：用户端可能需要 Ctrl+F5 强制刷新或清缓存才能看到新效果
5. **备份**：每次更新前建议先备份旧版本

---

## 🔍 验证清单

部署完成后检查以下内容：

- [ ] 首页能正常打开，倒计时结束后 hero 区域滑入动画出现
- [ ] 顶部导航栏三个方案卡片有滑入动画
- [ ] "数字鉴证实力"区域数字有计数动画
- [ ] 产品页、SD-WAN页、UniSASE页、AI页能正常访问
- [ ] 页面底部"关于世必得"区域正常显示
- [ ] 页面无 JavaScript 报错（按 F12 打开控制台检查）

---

## 📞 如遇问题

1. **页面排版错乱** → 检查是否所有 CSS/JS 文件都上传了
2. **动画没反应** → 打开浏览器控制台（F12），查看是否有报错信息
3. **图片显示不出来** → 检查图片路径是否正确，文件名大小写是否一致
4. **页面打不开** → 检查 Nginx/Apache 配置是否正确，文件是否放到了正确的网站根目录
