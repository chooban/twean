setInterval(function tick()
{
		var arr = document.querySelectorAll("li[data-item-type='tweet']");
		for( var i=0; i<arr.length; i++ )
		{
			var element = arr[i];
			var media = element.querySelector(".media");
			if( media )
			{
				if( element.classList.contains("open") )
					element.style.display = "block";
				else
					element.style.display = "none";
			}
		}
},2000);