new Function()
{
	var previews = localStorage["previews"] || true;
	var promoted = localStorage["promoted"] || true;

	var style = document.createElement("style");
	document.head.appendChild(style);
	var sheet = style.sheet;

	//image and video previews
	if( previews )
	{
		//image previews
		sheet.addRule(".js-stream-item .media > .media-thumbnail.is-preview > img", 'display:none;');
		sheet.addRule(".js-stream-item.open .media > .media-thumbnail.is-preview > img", 'display:inline-block !important');

		//video previews
		sheet.addRule(".js-stream-item > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:none;');
		sheet.addRule(".js-stream-item.open > .content > .expanded-content > .tweet-details-fixer > .js-media-container[data-card2-name='player']", 'display:inline-block !important;');
	}

	//promoted content
	if( promoted )
	{
		sheet.addRule(".trends .promoted-trend", 'display:none;');
		sheet.addRule(".js-stream-item .content .js-action-profile-promoted", 'display:none;');
		sheet.addRule(".wtf-module .promoted-account", 'display:none;');
	}
}