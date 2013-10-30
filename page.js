setInterval(function()
{
		var arr = document.querySelectorAll("li[data-item-type='tweet']");
		for( var i=0; i<arr.length; i++ )
		{
			var element = arr[i];
			var media = element.querySelector(".media");
			if( media )
				media.style.display = element.classList.contains("open") ? "block" : "none";
		}
},2000);