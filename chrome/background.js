(function()
{
	"use strict";

	/**
	 * Will listen for any message sent from content scripts and options page.
	 */
	chrome.extension.onMessage.addListener(
	function messageListener( request, sender, response )
	{
		switch( request )
		{
			case 'showPageAction':
				chrome.pageAction.show(sender.tab.id);
			return false;

			case 'optionsRequest':
				response({
					previews: typeof localStorage.previews === "undefined" || localStorage.previews === "true",
					promoted: typeof localStorage.promoted === "undefined" || localStorage.promoted === "true"
				});
			return true;

			case 'optionsChanged':
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, "refresh");
				});
			return false;
		}
	});

	/**
	 * Help in adding the extension icon to the bar.
	 */
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		chrome.pageAction.show(tabId);
	});

})();