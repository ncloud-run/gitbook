---
layout: default 
title: 2type/gitbook
---

# 2type/gitbook
开启 Github Pages 后 新建 `_config.yml` 文件

内容为

```yaml
title: 你的网站标题
remote_theme: 2type/gitbook
```
## 页面

新建 markdown 文件

    ---
    layout: default 
    title: 守护进程
    ---
    # 标题
    
    内容**加粗**



## 定义页面内容

* 修改左侧导航 `./_includes/SUMMARY.html`
* 修改头部导航 `./_includes/HEADER_LINKS.html`
* 修改底部 `./_includes/FOOTER.html`

## 样式

> 新建 `assets/var.css`文件,内容为

```css
:root{
    --main-color: rgba(38,203,124,1.00);
    --main-border-color:#d3dce4;
    --main-siderbar-background-color: rgba(243,245,246,1.00);
}
```
