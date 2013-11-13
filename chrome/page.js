new Function()
{
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		if( request === "refresh" )
			refresh();
	});
	//Display icon on the address bar when page script is loaded.
	chrome.extension.sendMessage("showPageAction");

	//Injected by the extension even before the <head/> element exists
	var sheet = document.getElementsByTagName("html")[0].appendChild(document.createElement("style")).sheet;

	var show = 'display:inline-block !important';
	var hide = 'display:none !important;';
	var rules =
	{
		imagePreview : ".js-stream-item .media > .media-thumbnail.is-preview > img",
		imagePreviewOpen : ".js-stream-item.open .media > .media-thumbnail.is-preview > img",
		videoPreview : ".js-stream-item > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']",
		videoPreviewOpen : ".js-stream-item.open > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']",
		promotedTrend: ".trends .promoted-trend",
		promotedTweet: ".js-stream-item .content .js-action-profile-promoted",
		promotedPeople: ".wtf-module .promoted-account"
	};

	sheet.addRule( rules.imagePreviewOpen, show );
	sheet.addRule( rules.videoPreviewOpen, show );

	function refresh()
	{
		var preview = localStorage["preview"] || true;
		var promoted = localStorage["promoted"] || true;

		removeRules();

		//image and video previews
		if( preview )
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

	function removeRules()
	{

	}

	refresh();
}