setTimeout(() => {
    if (document.getElementById('img-grab-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'img-grab-btn';
    btn.innerText = '获取图片';
    btn.style.cssText = "position:fixed!important;bottom:30px!important;right:30px!important;z-index:999999!important;padding:12px 24px!important;background:#667eea!important;color:white!important;border:none!important;border-radius:8px!important;cursor:pointer!important;";

    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        const images = [];
        document.querySelectorAll('img').forEach(img => {
            if (img.src && img.src.startsWith('http') && img.width > 50) {
                images.push(img.src);
            }
        });

        const uniqueImages = [...new Set(images)];
        
        // 将图片数据保存到浏览器缓存
        chrome.storage.local.set({ 'imagesData': uniqueImages }, () => {
            // 通知后台打开新页面
            chrome.runtime.sendMessage({ action: 'openGallery' });
        });
    });
}, 1000);