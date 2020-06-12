// source: https://ops.tips/blog/extension-to-block-websites/
// Limit the requests for which events are
// triggered.
//
// This allos us to have our code being executed
// only when the following URLs are matched.
// 
// ps.: if we were going to dynamically set the
//      URLs to be matched (used a configuration
//      page, for example) we'd then specify the 
//      wildcard <all_urls> and then do the filtering
//      ourselves.
const filter = {
    urls: [
        "*://*.netflix.com/*",
    ],
  }

// "webRequestBlocking"
// if (window.chrome.webRequest === undefined) {
    // request permissions
    const access = document.getElementById('webRequestAccess')
    // access.style.display="inline";
    access.addEventListener('change', () => {
        if (access.checked) {
            const permissions = {
                permissions: ["webRequest", 'webRequestBlocking']
            }
            console.log("requesting web permission")
            window.chrome.permissions.request(permissions, blockSites)
        } else {
            window.chrome.webRequest.onBeforeRequest.removeListener(listener)
            chrome.permissions.remove({
                permissions: ['webRequest', 'webRequestBlocking'],
                // origins: ['http://www.google.com/']
              }, function(removed) {
                if (removed) {
                    console.log("webRequest permissions removed")
                  // The permissions have been removed.
                } else {
                    console.log("permissions were unable to be removed")
                  // The permissions have not been removed (e.g., you tried to remove
                  // required permissions).
                }
              });
        }
    })
//     console.log("waiting for permission to be granted")
// } else {
//     blockSites(true)
// }


// Extra flags for the `onBeforeRequest` event.
//
// Here we're specifying that we want our callback
// function to be executed synchronously such that
// the request remains blocked until the callback 
// function returns (having our filtering taking 
// effect).

listener =  page => {
    console.log('page blocked - ' + page.url);

    return {
    cancel: true,
    };
}


function blockSites(granted) {
    if (granted) {
        console.log("permissions granted")
        const webRequestFlags = [
            'blocking',
          ];
        window.chrome.webRequest.onBeforeRequest.addListener(listener, filter, webRequestFlags);
    }
}
