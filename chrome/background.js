(function()
{
	"use strict";

	/**
	 * Will listen for any message sent from content scripts and options page.
	 */
	chrome.extension.onMessage.addListener
	(( request, sender, response ) =>
	{
		switch( request )
		{
			case 'displayIcon':
				displayIcon( sender.tab );
			break;

			case 'optionsRequest':
				response
				({
					previews: !!localStorage.previews,
					promoted: !!localStorage.promoted,
					wtfModule: !!localStorage.wtfModule,
					trendsModule: !!localStorage.trendsModule,
					liveModule: !!localStorage.liveModule,
					likedTweet: !!localStorage.likedTweet
				});
			break;

			case 'optionsChanged':
				chrome.tabs.query( {active: true, currentWindow: true}, (tabs) =>
				{
					chrome.tabs.sendMessage(tabs[0].id, "refresh");
				});
			break;
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