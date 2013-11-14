function messageListener( request, sender, response )
{
	switch( request )
	{
		case 'showPageAction':
			chrome.pageAction.show(sender.tab.id);
		return false;

		case 'optionsRequest':
			response({
				 previews: localStorage["previews"] || true,
				 promoted: localStorage["promoted"] || true
			});
		return true;

		case 'optionsChanged':
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, "refresh");
			});
		return false;
	}
}

chrome.extension.onMessage.addListener(	messageListener );
chrome.runtime.onMessage.addListener( messageListener );
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
});