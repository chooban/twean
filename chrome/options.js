(function()
{
	"use strict";

	const
		previews = document.querySelector("#previews"),
		promoted = document.querySelector("#promoted"),
		wtfModule = document.querySelector("#wtfModule"),
		trendsModule = document.querySelector("#trendsModule"),
		liveModule = document.querySelector("#liveModule"),
		likedTweet = document.querySelector("#likedTweet")
	;

	/**
	 * 	Saves options to localStorage and informe the background page of the changes.
	 */
	function save()
	{
		// Chrome localStorage only store strings so we use '' as false.
		localStorage.previews = previews.checked ? '1' : '';
		localStorage.promoted = promoted.checked ? '1' : '';
		localStorage.wtfModule = wtfModule.checked ? '1' : '';
		localStorage.trendsModule = trendsModule.checked ? '1' : '';
		localStorage.liveModule = liveModule.checked ? '1' : '';
		localStorage.likedTweet = likedTweet.checked ? '1' : '';

		//Run a CSS animation to let the user know changes had been taken into account.
		document.body.classList.add("saved");
		setTimeout(() => document.body.classList.remove("saved"),500);

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
		liveModule.removeAttribute("checked");
		likedTweet.removeAttribute("checked");

		previews.checked = !!localStorage.previews;
		promoted.checked = !!localStorage.promoted;
		wtfModule.checked = !!localStorage.wtfModule;
		trendsModule.checked = !!localStorage.trendsModule;
		liveModule.checked = !!localStorage.liveModule;
		likedTweet.checked = !!localStorage.likedTweet;
	}

	previews.addEventListener('change', save);
	promoted.addEventListener('change', save);
	wtfModule.addEventListener('change', save);
	trendsModule.addEventListener('change', save);
	liveModule.addEventListener('change', save);
	likedTweet.addEventListener('change', save);

	document.addEventListener('DOMContentLoaded', restore);
})();