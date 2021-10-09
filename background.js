// const filter = {
//     urls: [
//         "*://*.netflix.com/*",
//     ],
//   }

const filter = chrome.storage.local.get('urls')

listener =  page => {
  console.log('page blocked - ' + page.url);
  return {
  cancel: true,
  };
}

function blockSites(granted) {
  if (granted) {
      console.log("Blocking ".concat(filter.urls.length).concat(" website(s)."))
      const webRequestFlags = [
          'blocking',
        ];
      window.chrome.webRequest.onBeforeRequest.addListener(listener, filter, webRequestFlags);
  } else {
    console.log("Website blocker disabled.")
    window.chrome.webRequest.onBeforeRequest.removeListener(listener)
  }
}
  
window.chrome.storage.onChanged.addListener(function(changes) {
  for (var key in changes) {
    var storageChange = changes[key];
    if (key === 'blocksites') {
      if (storageChange.newValue === true) {
        console.log('proceeding to block sites')
      } else {
        console.log('Site blocking permissions not enabled. Please enable on Dashboard in a newtab.')
      }
      blockSites(storageChange.newValue)
      break
    }
  }
});

chrome.browserAction.onClicked.addListener(function (){
  chrome.tabs.create({url: chrome.extension.getURL('home.html')})
})