new Function()
{
	var style = document.createElement("style");
	document.head.appendChild(style);

	style.sheet.addRule(".js-stream-item .media > .media-thumbnail.is-preview > img", 'display:none;');
	style.sheet.addRule(".js-stream-item > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:none;');

	style.sheet.addRule(".js-stream-item.open  .media > .media-thumbnail.is-preview > img", 'display:inline-block !important');
	style.sheet.addRule(".js-stream-item.open > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:inline-block !important;');


	style.sheet.addRule(".module.trends .promoted", 'display:none;');
	style.sheet.addRule(".js-stream-item .content .js-action-profile-promoted", 'display:none;');

}