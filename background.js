chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openGallery') {
    chrome.tabs.create({ url: chrome.runtime.getURL('gallery.html') });
  }
});