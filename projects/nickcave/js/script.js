

enterView({
	selector: '#album',
	enter: function(el) {
		console.log('a special element entered');
		document.getElementById('mbcontainer').style.opacity= 1;
		document.getElementById('intropara0').style.opacity= 1;
		document.getElementById('album').style.opacity= 1;
    // let viz2=document.getElementById('viz2placeholder');
    // viz2.src = "viz2_2.jpg"

	},
	exit: function(el) {
    console.log('a special element exited');
		document.getElementById('mbcontainer').style.opacity= 0;
		document.getElementById('intropara0').style.opacity= 0;
		document.getElementById('album').style.opacity= 1;
    // let viz2=document.getElementById('viz2placeholder');
    // viz2.src = "viz2_1.jpg"
	},
	progress: function(el, progress) {
    console.log("the special element's progress is:", progress);
	},
	offset: 0.5 // enter at middle of viewport
	// once: true, // trigger just once
});


enterView({
	selector: '#bandintro1',
	enter: function(el) {
		console.log('a special element entered');
		document.getElementById('bandintro1').style.opacity= 1;
		document.getElementById('bandintro2').style.opacity= 1;
		document.getElementById('bandintro3').style.opacity= 1;
		// document.getElementById('intropara0').style.opacity= 1;
    // let viz2=document.getElementById('viz2placeholder');
    // viz2.src = "viz2_2.jpg"

	},
	exit: function(el) {
    console.log('a special element exited');
		document.getElementById('bandintro1').style.opacity= 0;
		document.getElementById('bandintro2').style.opacity= 0;
		document.getElementById('bandintro3').style.opacity= 0;
    // let viz2=document.getElementById('viz2placeholder');
    // viz2.src = "viz2_1.jpg"
	},
	progress: function(el, progress) {
    console.log("the special element's progress is:", progress);
	},
	offset: 0.5 // enter at middle of viewport
	// once: true, // trigger just once
});

enterView({
	selector: '#viz4',
	enter: function(el) {
		console.log('a special element entered');
		document.getElementById('viz4').style.opacity= 1;
		// document.getElementById('intropara0').style.opacity= 1;
    // let viz2=document.getElementById('viz2placeholder');
    // viz2.src = "viz2_2.jpg"

	},
	exit: function(el) {
    console.log('a special element exited');
		document.getElementById('viz4').style.opacity= 0;
    // let viz2=document.getElementById('viz2placeholder');
    // viz2.src = "viz2_1.jpg"
	},
	progress: function(el, progress) {
    console.log("the special element's progress is:", progress);
	},
	offset: 0.5 // enter at middle of viewport
	// once: true, // trigger just once
});

console.log('viz0script loaded');
