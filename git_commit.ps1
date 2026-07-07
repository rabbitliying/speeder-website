Copy-Item "C:\Users\bally\.openclaw\workspace\about_fixed.html" "C:\Users\bally\.openclaw\workspace\speeder_deploy\about.html" -Force

cd C:\Users\bally\.openclaw\workspace\speeder_deploy
git add about.html
git commit -m "fix: 修正公司成立时间为2020年，更新为官方口径

- 成立时间: 2015年 → 2020年
- Hero副标题: 十年深耕 → 自2020年以来
- 业务定位: 跨国网络连接 → 互联网联接优化及联线安全
- 地址: 补全为中国（江苏）自由贸易试验区苏州片区
- 新增台湾电话: +886 910 599 758"
git push origin main
