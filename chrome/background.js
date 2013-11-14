function messageListener( request, sender, response )
{
	switch( request )
	{
		case 'showPageAction':
			chrome.pageAction.show(sender.tab.id);
		break;

		case 'optionsRequest':
			response({
				 previews: localStorage["previews"] || true,
				 promoted: localStorage["promoted"] || true
			});
		break;
	}
}

chrome.extension.onMessage.addListener(	messageListener );
chrome.runtime.onMessage.addListener( messageListener );
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
});