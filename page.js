setInterval(function()
{
		var arr = document.querySelectorAll("li[data-item-type='tweet']");
		for( var i=0; i<arr.length; i++ )
		{
			var element = arr[i];
			if( element.querySelector(".media") )
				element.style.display = element.classList.contains("open") ? "block" : "none";
		}
},2000);