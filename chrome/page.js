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
			previewContainer: ".expanding-stream-item .OldMedia",
			preview : ".expanding-stream-item .OldMedia > div",
			previewBefore : ".expanding-stream-item .OldMedia:before",
			previewOpen : ".expanding-stream-item .opened-tweet .OldMedia > div",
			previewOpenBefore : ".expanding-stream-item .opened-tweet .OldMedia:before",

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

		sheet.addRule(rules.preview, 'display:block !important;' );

		//image and video previews
		if( previews )
		{
			sheet.addRule(rules.previewContainer, 'display:block; text-align:right;' );
			sheet.addRule(rules.preview, 'display:none !important;' );
			sheet.addRule(rules.previewBefore, 'margin:0 0 0 0; color:grey; text-align:right; line-height:18px; text-decoration:underline; font-size:12px; content:"media"; display:block;' );
			sheet.addRule(rules.previewOpen, 'display:block !important;' );
			sheet.addRule(rules.previewOpenBefore, 'display:none !important;' );
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