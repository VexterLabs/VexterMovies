window.onload = function() {

    window.onbeforeinstallprompt = function(e) {
        console.warn("before install prompt");
        e.preventDefault();
        // Stash the event so it can be triggered later.
        window.deferredPrompt = e;
    };

    // let link = document.createElement("link")
    // link.rel = "manifest"
    // link.href = "/static/manifest.json"
    // document.head.append(link);

    if (navigator.serviceWorker) {
        // 添加桌面图标
        navigator.serviceWorker
            .register("/sw.js", {
                scope: '/'
            })
            .then(function(registration) {})
            .catch(function(err) {
                console.log(err)
            });
    } else {
        // 添加至收藏夹
    }
};