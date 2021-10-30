(function () {
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
