(function()
{
	"use strict";

	let
		lastUrl,
		style,
		sheet,

		//The first pass will hide all as default
		previews = true,
		promoted = true,
		wtfModule = false,
		trendsModule = false,

		show = 'display:initial !important;',
		hide = 'display:none !important;',

		rules =
		{
			preview : '.tweet .AdaptiveMedia > div, [data-card2-name$=":periscope_broadcast"] > div, [data-card2-name="summary_large_image"] > div ',
			previewBefore : '.tweet .AdaptiveMedia:before, [data-card2-name$=":periscope_broadcast"]:before, [data-card2-name="summary_large_image"]:before ',

			previewOpen : '.tweet .opened-tweet .AdaptiveMedia > div, .opened-tweet [data-card2-name$=":periscope_broadcast"] > div, .opened-tweet [data-card2-name="summary_large_image"] > div, .permalink-tweet [data-card2-name="summary_large_image"] > div, .permalink-tweet .AdaptiveMedia > div',
			previewOpenBefore : '.tweet .opened-tweet .AdaptiveMedia:before, .opened-tweet [data-card2-name$=":periscope_broadcast"]:before, .opened-tweet [data-card2-name="summary_large_image"]:before, .permalink-tweet [data-card2-name="summary_large_image"]:before, .permalink-tweet .AdaptiveMedia:before',

			previewBorder : '.AdaptiveMedia.is-square:not(.is-generic-video)',

			promotedTrend: '.trends .promoted-trend ',
			promotedTweet: '.js-stream-item .promoted-tweet ',
			suggestedTweet: '.suggested-tweet-stream-container ',
			promotedPeople: '.wtf-module .promoted-account ',
			wtfModule: '.wtf-module ',
			wtfCarousel: '.WtfLargeCarouselStreamItem ',
			trendsModule: '.trends'
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
		let html = document.getElementsByTagName("html")[0];
		if( html.firstChild )
			html.insertBefore( style, html.firstChild );
		else
			html.appendChild(style);

		sheet = style.sheet;

		sheet.addRule(rules.preview, show );

		//image and video previews
		if( previews )
		{
			sheet.addRule(rules.preview, hide + ' min-width:506px;');
			sheet.addRule(rules.previewBefore, 'margin:0 0 0 0; color:grey; text-align:right; line-height:18px; text-decoration:underline; font-size:12px; content:"media"; display:block;' );
			sheet.addRule(rules.previewOpen, show );
			//sheet.addRule(rules.previewOpen + ' .AdaptiveMedia-singlePhoto img', 'top:0 !important' ); //Fix for the opened image going over other tweets.
			sheet.addRule(rules.previewOpenBefore, hide );
			sheet.addRule(rules.previewBorder, 'border:none !important');
		}

		//promoted content
		if( promoted )
		{
			sheet.addRule(rules.promotedPeople, hide);
			sheet.addRule(rules.promotedTrend, hide);
			sheet.addRule(rules.promotedTweet, hide);
			sheet.addRule(rules.suggestedTweet, hide);
		}

		//Who To Follow module
		if( wtfModule )
		{
			sheet.addRule(rules.wtfCarousel, hide);
			sheet.addRule(rules.wtfModule, hide);
		}

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
		if( lastUrl !== document.location.href )
			chrome.extension.sendMessage("displayIcon");

		lastUrl = document.location.href;

		setTimeout( displayIcon, 1000 );
	}

	chrome.extension.onMessage.addListener( (request, sender, sendResponse) =>
	{
		if( request === "refresh" )
			getOptions();
	});

	displayIcon();
	getOptions();
	refresh();
})();