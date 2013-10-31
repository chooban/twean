window.addEventListener("load",function()
{
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	document.querySelector("head").appendChild( style );
	style.sheet.addRule(".auto-expanded div.media", 'display:none;');
	style.sheet.addRule("li[data-item-type='tweet'].open div.media", 'display:inline-block !important');
});