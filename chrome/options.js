(function(){

	var previews = document.querySelector("#previews");
	var promoted = document.querySelector("#promoted");
	previews.addEventListener('change', save);
	promoted.addEventListener('change', save);

	// Saves options to localStorage.
	function save()
	{
		//Will be stored as string
		localStorage.previews = previews.checked;
		localStorage.promoted = promoted.checked;

		document.body.classList.add("saved");
		setTimeout(function(){document.body.classList.remove("saved")},1050);

		chrome.extension.sendMessage("optionsChanged");
	}

	// Restores select box state to saved value from localStorage.
	function restore()
	{
		previews.removeAttribute("checked");
		promoted.removeAttribute("checked");

		if( typeof localStorage.previews === "undefined" || localStorage.previews === "true" )
			previews.checked = true;

		if( typeof localStorage.promoted === "undefined" || localStorage.promoted === "true" )
			promoted.checked = true;
	}

	document.addEventListener('DOMContentLoaded', restore);
})();