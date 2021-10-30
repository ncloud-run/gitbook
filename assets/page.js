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
            if (localStorage.getItem("nav-switch-status--hide")) {
                localStorage.removeItem("nav-switch-status--hide")
            } else {
                localStorage.setItem("nav-switch-status--hide", "1")
            }
            switchNav()
    })
    switchNav()
    function switchNav() {
        if (localStorage.getItem("nav-switch-status--hide")) {
            document.getElementById("nav").classList.add("nav-switch-status--hide")
        } else {
            document.getElementById("nav").classList.remove("nav-switch-status--hide")
        }
    }
})();
