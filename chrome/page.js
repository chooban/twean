new Function()
{
	chrome.extension.sendMessage({type:'showPageAction'});

	var preview = localStorage["preview"] || true;
	var promoted = localStorage["promoted"] || true;

	//Injected by the extension even before the <head/> element exists
	var sheet = document.getElementsByTagName("html")[0].appendChild(document.createElement("style")).sheet;

	//image and video previews
	if( preview )
		chrome.extension.sendMessage({type:'showPreview'});

	//promoted content
	if( promoted )
		chrome.extension.sendMessage({type:'showPromoted'});

	function showPreview()
	{
		//image previews
		sheet.addRule(".js-stream-item .media > .media-thumbnail.is-preview > img", 'display:none !important;');
		sheet.addRule(".js-stream-item.open .media > .media-thumbnail.is-preview > img", 'display:inline-block !important');

		//video previews
		sheet.addRule(".js-stream-item > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:none !important;');
		sheet.addRule(".js-stream-item.open > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:inline-block !important;');
	}

	function showPromoted()
	{
		sheet.addRule(".trends .promoted-trend", 'display:none !important;');
		sheet.addRule(".js-stream-item .content .js-action-profile-promoted", 'display:none !important;');
		sheet.addRule(".wtf-module .promoted-account", 'display:none !important;');
	}
}