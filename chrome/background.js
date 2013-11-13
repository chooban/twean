chrome.extension.onMessage.addListener(	function( request, sender, sendResponse ){
	if( request === "showPageAction" )
		chrome.pageAction.show(sender.tab.id);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
});