chrome.extension.onMessage.addListener(	function(message, sender){

	if(!message)
		return;

	switch( message.type)
	{
		case 'showPageAction':
			chrome.pageAction.show(sender.tab.id);
		break;

		case 'showPreview':
		{
			//image previews
			sheet.addRule(".js-stream-item .media > .media-thumbnail.is-preview > img", 'display:none !important;');
			sheet.addRule(".js-stream-item.open .media > .media-thumbnail.is-preview > img", 'display:inline-block !important');

			//video previews
			sheet.addRule(".js-stream-item > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:none !important;');
			sheet.addRule(".js-stream-item.open > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:inline-block !important;');
		}
		break;

		case 'showPromoted':
		{
			sheet.addRule(".trends .promoted-trend", 'display:none !important;');
			sheet.addRule(".js-stream-item .content .js-action-profile-promoted", 'display:none !important;');
			sheet.addRule(".wtf-module .promoted-account", 'display:none !important;');
		}
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
});