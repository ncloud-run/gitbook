---
layout: default 
title: 2type/gitbook
permalink: /
---

# 2type/gitbook

> gitbook 在国内访问速度慢,而且经常打开白屏,所以我做了一个 jekyll 版 gitbook主题,可以自行部署静态资源在各大平台.

示例项目 [https://be.nimo.run](https://be.nimo.run)

[![](./demo.jpg)](https://be.nimo.run)


开启 Github Pages 后 新建 `_config.yml` 文件

内容为

```yaml
title: 你的网站标题
remote_theme: 2type/gitbook
```
## 页面

新建 markdown 文件

    ---
    permalink: /some/
    ---
    # 标题
    
    内容**加粗**



## 定义页面内容

* 修改左侧导航 [./_includes/SUMMARY.html](./_includes/SUMMARY.html)
* 修改头部导航 [./_includes/HEADER_LINKS.html](./_includes/HEADER_LINKS.html)
* 修改底部 [./_includes/FOOTER.html](./_includes/FOOTER.html)

## 样式

修改 [./assets/var.css](./assets/var.css) 文件

## 部署jekyll

根目录新建 `Gemfile` 文件

```gemfile
source "https://rubygems.org"
gem 'github-pages', group: :jekyll_plugins
```

有些平台必须通过 `/practice/friends.html` 才能访问页面,而不能通过 `/practice/friends/`

### vercel

在 `https://vercel.com/` 需要在每个markdown文件都配置`permalink`

```
---
permalink: /practice/friends/
---
```

在 `https://vercel.com/用户名/项目/settings` 页面中将

`Build & Development Settings` 栏目打开 OVERRIDE
将 `BUILD COMMAND设置为` 设置为
`bundle exec jekyll build` 


## 本地开发

https://jekyllrb.com/docs/

```
# 监听文件修改更新页面
bundle exec jekyll serve
# 构建静态文件
bundle exec jekyll build
```

## TODO

1. [ ] 扫描页面导航在文章底部加载下一个文章和上一个文章