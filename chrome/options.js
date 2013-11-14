(function(){

	var previews = document.querySelector("#previews");
	var promoted = document.querySelector("#promoted");
	previews.addEventListener('change', save);
	promoted.addEventListener('change', save);

	// Saves options to localStorage.
	function save()
	{
		localStorage.previews = !!previews.checked;
		localStorage.promoted = !!promoted.checked;

		document.body.classList.add("saved");
		setTimeout(function(){document.body.classList.remove("saved")},1050);

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, "refresh");
		});
	}

	// Restores select box state to saved value from localStorage.
	function restore()
	{
		previews.checked = localStorage.previews || true;
		promoted.checked = localStorage.promoted || true;
	}

	document.addEventListener('DOMContentLoaded', restore);
})();