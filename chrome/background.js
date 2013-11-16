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
			case 'displayIcon':
				displayIcon( sender.tab );
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

		return false;
	});

	/**
	 * Force the Twean icon to appear in the address bar.
	 *
	 * @param tab
	 * 		Tab on which to display the icon.
	 */
	function displayIcon( tab )
	{
		chrome.pageAction.show( tab.id );
	}

})();