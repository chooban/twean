(function()
{
	"use strict";

	var
		style,
		sheet,

		//The first pass will hide all as default
		previews = true,
		promoted = true,

		show = 'display:inline-block !important',
		hide = 'display:none !important;',

		rules =
		{
			imagePreview : ".js-stream-item .media > .media-thumbnail.is-preview > img",
			imagePreviewOpen : ".js-stream-item.open .media > .media-thumbnail.is-preview > img",
			videoPreview : ".js-stream-item > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']",
			videoPreviewOpen : ".js-stream-item.open > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']",
			promotedTrend: ".trends .promoted-trend",
			promotedTweet: ".js-stream-item .promoted-tweet",
			promotedPeople: ".wtf-module .promoted-account"
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

			refresh();
		});
	}

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
		if( request === "refresh" )
			getOptions();
	});

	//Display icon on the address bar when page script is loaded.
	chrome.extension.sendMessage("showPageAction");

	getOptions();
	refresh();
})();