new Function()
{
	var style = document.createElement("style");
	document.head.appendChild(style);
	style.sheet.addRule(".auto-expanded div.media", 'display:none;');
	style.sheet.addRule("li[data-item-type='tweet'].open div.media", 'display:inline-block !important');
}