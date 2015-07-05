(function()
{
	"use strict";

	var
		lastUrl,
		style,
		sheet,

		//The first pass will hide all as default
		previews = true,
		promoted = true,
		wtfModule = false,
		trendsModule = false,

		show = 'display:inline-block !important',
		hide = 'display:none !important;',

		rules =
		{
			imagePreview : ".expanding-stream-item .cards-media-container",
			imagePreviewOpen : ".js-stream-item.open .cards-media-container",

			//#stream-item-tweet-617607339722543104 > ol > li > div > div.content > div.card2.js-media-container
			//#stream-item-tweet-617607339722543104 > ol > li.original-tweet-container > div.tweet.original-tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.js-original-tweet.has-cards.has-native-media.with-media-forward.auto-expanded.media-forward.cards-forward.with-non-tweet-action-follow-button.has-autoplayable-media.with-social-proof.focus.opened-tweet.animated-gif-playing > div.content > div.card2.js-media-container
			videoPreview : "ol > li > div > div.content > div.card2.js-media-container",
			videoPreviewOpen : "ol > li.original-tweet-container > .opened-tweet > div.content > div.card2.js-media-container",

			promotedTrend: ".trends .promoted-trend",
			promotedTweet: ".js-stream-item .promoted-tweet",
			promotedPeople: ".wtf-module .promoted-account",
			wtfModule: ".wtf-module",
			trendsModule: ".trends"
		}
	;

	/**
	 * Refresh the display by first removing all applied CSS rules and appying only those needed
	 * as defined by user options.
	 */
	function refresh()
	{
		removeRules();

		style = document.createElement("style");

		//Injected by the extension even before the <head/> element exists
		var html = document.getElementsByTagName("html")[0];
		if( html.firstChild )
			html.insertBefore( style, html.firstChild );
		else
			html.appendChild(style);

		sheet = style.sheet;
		sheet.addRule( rules.imagePreviewOpen, show );
		sheet.addRule( rules.videoPreviewOpen, show );

		//image and video previews
		if( previews )
		{
			sheet.addRule(rules.imagePreview, hide );
			sheet.addRule(rules.videoPreview, hide );
		}

		//promoted content
		if( promoted )
		{
			sheet.addRule(rules.promotedPeople, hide);
			sheet.addRule(rules.promotedTrend, hide);
			sheet.addRule(rules.promotedTweet, hide);
		}

		//Who To Follow module
		if( wtfModule )
			sheet.addRule(rules.wtfModule, hide);

		//Trends module
		if( trendsModule )
			sheet.addRule(rules.trendsModule, hide);
	}

	/**
	 * Basically remove the style sheet and so removes all applied styles.
	 */
	function removeRules()
	{
		if(style)
			style.parentNode.removeChild(style);
	}

	/**
	 * Make a request to the background page for the options chosen by the user if any.
	 */
	function getOptions()
	{
		chrome.extension.sendMessage("optionsRequest", function(response)
		{
			previews = response.previews;
			promoted = response.promoted;
			wtfModule = response.wtfModule;
			trendsModule = response.trendsModule;

			refresh();
		});
	}

	/**
	 * We have to force the icon to stay in place even when the URL change in the address bar.
	 */
	function displayIcon()
	{
		if( lastUrl != document.location.href )
			chrome.extension.sendMessage("displayIcon");

		lastUrl = document.location.href;

		setTimeout( displayIcon, 1000 );
	}

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
		if( request === "refresh" )
			getOptions();
	});

	displayIcon();
	getOptions();
	refresh();
})();