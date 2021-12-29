// markdown-sidebar
!(function () {
    function markrunSidebar(settings) {
        settings = settings || {}
        settings.content = settings.content || document.body
        var map = {}
        var sidebar = document.createElement('ul')
        var childNodes = settings.content.querySelectorAll('h2,h3')
        var childNodesLength = childNodes.length
        var currentSubHeaderId = null
        childNodes.forEach(function(element){
            var id = element.id
            var text = element.innerText
            var data = {
                id: id,
                text: text
            }
            switch (element.tagName) {
                case 'H2':
                    currentSubHeaderId = id
                    map[id] = map[id] || data
                    break
                case 'H3':
                    if (currentSubHeaderId !== null) {
                        map[currentSubHeaderId].child = map[currentSubHeaderId].child ||[]
                        map[currentSubHeaderId].child.push(data)
                    }
                    break
                default:
            }
        })
        for(var key in map) {
            var item = map[key]
            var li = document.createElement('li')
            var link = document.createElement('a')
            link.innerHTML = item.text
            link.setAttribute('href', '#' + item.id)
            link.setAttribute('class', 'markdown-sidebar-link')
            li.appendChild(link)
            sidebar.appendChild(li)
            if (item.child) {
                var littleUl = document.createElement('ul')
                item.child.forEach(function (littleTitle) {
                    var littleLi = document.createElement('li')
                    var littleLink = document.createElement('a')
                    littleLink.innerHTML = littleTitle.text
                    littleLink.setAttribute('href', '#' + littleTitle.id)
                    littleLink.setAttribute('class', 'markdown-sidebar-link')
                    littleLi.appendChild(littleLink)
                    littleUl.appendChild(littleLi)
                })
                li.appendChild(littleUl)
            }
        }
        settings.element.appendChild(sidebar)
        return map
    }
    if (typeof window !== 'undefined') {
        window.markrunSidebar = markrunSidebar
    }
    if (typeof module !== 'undefined') {
        module.exports = markrunSidebar
    }
})()

;(function () {
    document.querySelectorAll('#nav a').forEach(function (node) {
        var path = location.pathname
            .replace(/\/$/,'')
            .replace(/\.html$/, '')
            .replace(/\README$/, '')
        var href = node.href.replace(location.origin, "")
            .replace(/\?.*$/, '')
            .replace(/\/$/,'')
            .replace(/\.html$/, '')
            .replace(/\README$/, '')

        if (path == href) {
            node.classList.add("nav-link--on")
            // node.focus()
        }
        console.log("made with https://github.com/2type/gitbook")
    })
    var headerLinks = [
        document.querySelectorAll(".markdown-body h2 a"),
        document.querySelectorAll(".markdown-body h3 a"),
        document.querySelectorAll(".markdown-body h4 a"),
        document.querySelectorAll(".markdown-body h5 a"),
        document.querySelectorAll(".markdown-body h6 a"),
    ]
    headerLinks.forEach(function (item) {
        item.forEach(function (node) {
            node.href = "#" + node.id
        })
    })

    var headers = [
        document.querySelectorAll(".markdown-body h2"),
        document.querySelectorAll(".markdown-body h3"),
        document.querySelectorAll(".markdown-body h4"),
        document.querySelectorAll(".markdown-body h5"),
        document.querySelectorAll(".markdown-body h6"),
    ]
    headers.forEach(function (item) {
        item.forEach(function (node) {
            var hash = node.querySelector('a')
            if (!hash) {
                var hashNode = document.createElement('a')
                hashNode.href = "#"+ node.id
                node.appendChild(hashNode)
            }
        })
    })
    document
        .getElementById("nav-switch")
        .addEventListener("click", function () {
            switchNav()
    })
    function switchNav() {
        if (document.getElementById("nav").classList.contains("nav-switch-status--show")) {
            document.getElementById("nav").classList.remove("nav-switch-status--show")
        } else {
            document.getElementById("nav").classList.add("nav-switch-status--show")
        }
    }
    // 延迟平滑,避免刚打开页面带hash时候出现滚动
    setTimeout(function () {
        var style = document.createElement('style')
        css = `* {
            scroll-behavior:smooth;
        }`
        style.appendChild(document.createTextNode(css))
        document.head.appendChild(style)
    }, 2000)
})();



function getBlobURL(href) {
    var sourcePath = href.replace(location.origin, '').replace(location.pathname, "").replace("?blob","?").replace("?embed","?")
    var dirPath = ""
    if (PagePath.indexOf("/") == -1) {
        dirPath = ""
    } else {
        dirPath = PagePath.replace(/\/[^/]*$/, "/")
    }
    var onlineHref = GithubRepoURL + "/blob/" + GithubBranch  + "/"+ dirPath + sourcePath
    onlineHref = onlineHref.replace(/\?$/, "")
    return onlineHref
}
function getRawURL(href) {
    var sourcePath = href.replace(location.origin, '').replace(location.pathname, "").replace("?blob","?").replace("?embed","?")
    var dirPath = ""
    if (PagePath.indexOf("/") == -1) {
        dirPath = ""
    } else {
        dirPath = PagePath.replace(/\/[^/]*$/, "/")
    }
    var onlineHref = "https://raw.githubusercontent.com/" + GithubRepoNwo + "/" +GithubBranch  + "/"+ dirPath + sourcePath
    onlineHref = onlineHref.replace(/\?$/, "")
    return onlineHref
}
var onload = function (){
    // sidebarBaseContent
    if (PageSidebarBasedOnContent) {
        var navContent = document.querySelector("#nav .nav-content")
        navContent.innerHTML = ""
        var markrunSideData = markrunSidebar({
            content: document.querySelector("#markdown-body"),
            element: navContent
        })
    }
    // ?blob ?embed
    var links = document.querySelectorAll('a')
    links.forEach(function (node) {
        var blobReg = /\?blob/g
        if (blobReg.test(node.href)) {
            node.setAttribute('target', "_blank")
            node.href = getBlobURL(node.href)
            var githubIcon = document.createElement("span")
            githubIcon.className = "fa fa-github"
            githubIcon.style = "margin-right:.3em;"
            node.prepend(githubIcon)
        }
        var embedReg = /\?embed/g
        if (embedReg.test(node.href)) {
            var blobURL = getBlobURL(node.href)
            var rawURL = getRawURL(node.href)
            var text = fetch(rawURL).then(function (res){
                if (res.status == 200) {
                    return res.text()
                }
                return new Promise(function (resolve){
                    resolve(null)
                })
            }).then(function (source){
                if (!source) {
                    return
                }
                text = "// " + blobURL + "\n" + source
                html = hljs.highlightAuto(text).value

                var box = document.createElement('div')
                box.style.position = "relative"
                var pre = document.createElement('pre')
                pre.className = "embed-code"
                var code = document.createElement('code')

                code.innerHTML = html
                pre.appendChild(code)
                var sourceLink = document.createElement("a")
                sourceLink.innerText = node.innerText
                sourceLink.href = blobURL
                sourceLink.target="_blank"
                var githubIcon = document.createElement("span")
                githubIcon.className = "fa fa-github"
                githubIcon.style = "margin-right:.3em;"
                sourceLink.prepend(githubIcon)
                box.appendChild(sourceLink)
                box.appendChild(pre)
                if (node.parentNode) {
                    node.parentNode.replaceChild(box,node)
                }
            })
        }
    })
}
document.addEventListener("DOMContentLoaded", onload, false)