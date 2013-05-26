function mobileJs() {
	
	//Makes the page remove the mobile safari header bar
	window.addEventListener("load",function() {
		// Set a timeout...
		setTimeout(function(){
			// Hide the address bar!
			window.scrollTo(0, 1);
		}, 0);
	});

};

