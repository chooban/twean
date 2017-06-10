(function()
{
	"use strict";

	let
		previews = document.querySelector("#previews"),
		promoted = document.querySelector("#promoted"),
		wtfModule = document.querySelector("#wtfModule"),
		trendsModule = document.querySelector("#trendsModule")
	;

	/**
	 * 	Saves options to localStorage and informe the background page of the changes.
	 */
	function save()
	{
		//Will be stored as string
		localStorage.previews = previews.checked;
		localStorage.promoted = promoted.checked;
		localStorage.wtfModule = wtfModule.checked;
		localStorage.trendsModule = trendsModule.checked;

		//Run a CSS animation to let the user know changes had been taken into account.
		document.body.classList.add("saved");
		setTimeout(() => {document.body.classList.remove("saved");},500);

		//Send a message to the background page to inform it options changed.
		chrome.extension.sendMessage("optionsChanged");
	}

	/**
	 * Restores select box state to saved value from localStorage.
 	 */
	function restore()
	{
		previews.removeAttribute("checked");
		promoted.removeAttribute("checked");
		wtfModule.removeAttribute("checked");
		trendsModule.removeAttribute("checked");

		if( typeof localStorage.previews === "undefined" || localStorage.previews === "true" )
			previews.checked = true;

		if( typeof localStorage.promoted === "undefined" || localStorage.promoted === "true" )
			promoted.checked = true;

		if( typeof localStorage.wtfModule !== "undefined" && localStorage.wtfModule === "true" )
			wtfModule.checked = true;

		if( typeof localStorage.trendsModule !== "undefined" && localStorage.trendsModule === "true" )
			trendsModule.checked = true;
	}

	previews.addEventListener('change', save);
	promoted.addEventListener('change', save);
	wtfModule.addEventListener('change', save);
	trendsModule.addEventListener('change', save);

	document.addEventListener('DOMContentLoaded', restore);
})();