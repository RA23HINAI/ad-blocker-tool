const blockList = [
  "*://*.doubleclick.net/*",
  "*://*.googlesyndication.com/*",
  "*://*.adsafeprotected.com/*",
  "*://*.adnxs.com/*",
  "*://*.adform.net/*"
];

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  if (req.action === 'toggleAds') {
    updateAds(req.status);
  } else if (req.action === 'toggleFake') {
    updateFake(req.status);
  }
});

chrome.storage.sync.get(['adsEnabled', 'fakeEnabled'], data => {
  if (data.adsEnabled === undefined) {
    chrome.storage.sync.set({ adsEnabled: true });
    updateAds(true);
  } else {
    updateAds(data.adsEnabled);
  }

  if (data.fakeEnabled === undefined) {
    chrome.storage.sync.set({ fakeEnabled: true });
    updateFake(true);
  } else {
    updateFake(data.fakeEnabled);
  }
});

function updateAds(enabled) {
  if (enabled) {
    chrome.webRequest.onBeforeRequest.addListener(blockReq, { urls: blockList }, ["blocking"]);
  } else {
    chrome.webRequest.onBeforeRequest.removeListener(blockReq);
  }
}

function updateFake(enabled) {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, { action: 'updateFake', status: enabled });
    });
  });
}

function blockReq(details) {
  return { cancel: true };
}
