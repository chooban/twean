new Function()
{
	var style = document.createElement("style");
	document.head.appendChild(style);
	style.sheet.addRule(".tweet .media > .media-thumbnail.is-preview > img", 'display:none;');
	style.sheet.addRule(".js-stream-tweet > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:none;');
	style.sheet.addRule("li[data-item-type='tweet'].open div.media", 'display:inline-block !important');
}