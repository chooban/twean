(function(){

	var previews = document.querySelector("#previews");
	var promoted = document.querySelector("#promoted");
	previews.addEventListener('change', save);
	promoted.addEventListener('change', save);

	// Saves options to localStorage.
	function save()
	{
		localStorage["previews"] = !!previews.checked;
		localStorage["promoted"] = !!promoted.checked;

		document.body.classList.add("saved");
		setTimeout(function(){document.body.classList.remove("saved")},1050)
	}

	// Restores select box state to saved value from localStorage.
	function restore()
	{
		var hasPreviews = localStorage["previews"] || true;
		var hasPromoted = localStorage["promoted"] || true;

		previews.checked = hasPreviews;
		promoted.checked = hasPromoted;
	}

	document.addEventListener('DOMContentLoaded', restore);
})();