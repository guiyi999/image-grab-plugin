const grid = document.getElementById('galleryGrid');
const countSpan = document.getElementById('count');
let checkboxes = [];

chrome.storage.local.get('imagesData', (result) => {
  const images = result.imagesData || [];
  
  if (images.length === 0) {
      grid.innerHTML = '<h3 style="color:red;padding:20px;">没有提取到图片，请刷新重试。</h3>';
      return;
  }

  images.forEach((src, index) => {
    const div = document.createElement('div');
    div.style.cssText = "background:white;padding:10px;border-radius:8px;text-align:center;box-shadow:0 2px 5px rgba(0,0,0,0.1);";
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = "width:100%;height:150px;object-fit:contain;background:#eee;margin-bottom:10px;";
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = src;
    cb.addEventListener('change', updateCount);
    
    div.appendChild(img);
    div.appendChild(cb);
    div.appendChild(document.createTextNode(' 选择'));
    grid.appendChild(div);
    checkboxes.push(cb);
  });
});

document.getElementById('selectAll').addEventListener('click', () => {
  let allChecked = checkboxes.every(cb => cb.checked);
  checkboxes.forEach(cb => cb.checked = !allChecked);
  updateCount();
});

function updateCount() {
    countSpan.innerText = `已选 ${checkboxes.filter(cb => cb.checked).length} 张`;
}

document.getElementById('downloadBtn').addEventListener('click', () => {
  let count = 0;
  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      chrome.downloads.download({
        url: cb.value,
        filename: `商品图_${String(i+1).padStart(3, '0')}.jpg`
      });
      count++;
    }
  });
  if (count > 0) alert(`已开始下载 ${count} 张图片`);
});