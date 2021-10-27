(function () {
    document.querySelectorAll('.sidebar a').forEach(function (node) {
        var path = location.pathname
            .replace(/\/$/,'')
            .replace(/\.html$/, '')
            .replace(/\README$/, '')
        var href = node.href.replace(location.origin, "")
        console.log(path, href, node.innerHTML)
        if (path == href) {
            node.classList.add("sidebar-link--on")
            node.focus()
        }
    })
})();