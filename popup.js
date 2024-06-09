document.addEventListener('DOMContentLoaded', () => {
  const toggleAdsBtn = document.getElementById('toggleAds');
  const toggleFakeBtn = document.getElementById('toggleFake');

  chrome.storage.sync.get(['adsEnabled', 'fakeEnabled'], data => {
    if (data.adsEnabled === false) {
      toggleAdsBtn.textContent = 'Enable Ad Blocker';
      toggleAdsBtn.classList.add('off');
    }
    if (data.fakeEnabled === false) {
      toggleFakeBtn.textContent = 'Enable Fake User Blocker';
      toggleFakeBtn.classList.add('off');
    }
  });

  toggleAdsBtn.addEventListener('click', () => {
    chrome.storage.sync.get('adsEnabled', data => {
      const newStatus = data.adsEnabled === false;
      chrome.storage.sync.set({ adsEnabled: newStatus }, () => {
        if (newStatus) {
          toggleAdsBtn.textContent = 'Disable Ad Blocker';
          toggleAdsBtn.classList.remove('off');
        } else {
          toggleAdsBtn.textContent = 'Enable Ad Blocker';
          toggleAdsBtn.classList.add('off');
        }
        chrome.runtime.sendMessage({ action: 'toggleAds', status: newStatus });
      });
    });
  });

  toggleFakeBtn.addEventListener('click', () => {
    chrome.storage.sync.get('fakeEnabled', data => {
      const newStatus = data.fakeEnabled === false;
      chrome.storage.sync.set({ fakeEnabled: newStatus }, () => {
        if (newStatus) {
          toggleFakeBtn.textContent = 'Disable Fake User Blocker';
          toggleFakeBtn.classList.remove('off');
        } else {
          toggleFakeBtn.textContent = 'Enable Fake User Blocker';
          toggleFakeBtn.classList.add('off');
        }
        chrome.runtime.sendMessage({ action: 'toggleFake', status: newStatus });
      });
    });
  });
});
