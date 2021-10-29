(function () {
    document.querySelectorAll('.sidebar a').forEach(function (node) {
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
            node.classList.add("sidebar-link--on")
            node.focus()
        }
        console.log("made with https://github.com/2type/gitbook")
    })
})();