(function(){

	var previews = document.querySelector("#previews");
	var promoted = document.querySelector("#promoted");
	var status = document.querySelector("#status");

// Saves options to localStorage.
	function save()
	{
		localStorage["previews"] = !!previews.checked;
		localStorage["promoted"] = !!promoted.checked;

		// Update status to let user know options were saved.
		status.classList.add("visible");
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
	document.querySelector('#save').addEventListener('click', save);

})();