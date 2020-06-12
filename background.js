chrome.browserAction.onClicked.addListener(function (){
  chrome.tabs.create({url: chrome.extension.getURL('home.html')})
})


// function preventUnload() {
//   let iframe = document.querySelector('iframe');
//   if (!iframe) {
//     iframe = document.createElement('iframe');
//     document.body.appendChild(iframe).src = 'bg-iframe.html';
//   }
// }

// function allowUnload() {
//   let iframe = document.querySelector('iframe');
//   if (iframe) iframe.remove();
// }

// chrome.runtime.onConnect.addListener(() => {});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message === 'start') doSomething();
// });

// function doSomething() {
//   preventUnload();
//   // do something asynchronous that's spread over time
//   // like for example consecutive setTimeout or setInterval calls
//   let ticks = 20;
//   const interval = setInterval(tick, 1000);

//   function tick() {
//     // do something
//     // ................
//     if (--ticks <= 0) done();
//   }

//   function done() {
//     clearInterval(interval);
//     allowUnload();
//   }
// }