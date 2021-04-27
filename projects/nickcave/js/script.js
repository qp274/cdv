enterView({
	selector: '#intropara2',
	enter: function(el) {
		console.log('a special element entered');
    let viz1=document.getElementById('viz1placeholder');
    viz1.src = "viz1_2.jpg"

	},
	exit: function(el) {
    console.log('a special element exited');
    let viz1=document.getElementById('viz1placeholder');
    viz1.src = "viz1_1.jpg"
	},
	progress: function(el, progress) {
    console.log("the special element's progress is:", progress);
	},
	offset: 0.5 // enter at middle of viewport
	// once: true, // trigger just once
});


enterView({
	selector: '#des2',
	enter: function(el) {
		console.log('a special element entered');
    let viz2=document.getElementById('viz2placeholder');
    viz2.src = "viz2_2.jpg"

	},
	exit: function(el) {
    console.log('a special element exited');
    let viz2=document.getElementById('viz2placeholder');
    viz2.src = "viz2_1.jpg"
	},
	progress: function(el, progress) {
    console.log("the special element's progress is:", progress);
	},
	offset: 0.5 // enter at middle of viewport
	// once: true, // trigger just once
});



enterView({
	selector: '#des3',
	enter: function(el) {
		console.log('a special element entered');
    let viz2=document.getElementById('viz2placeholder');
    viz2.src = "viz2_3.jpg"

	},
	exit: function(el) {
    console.log('a special element exited');
    let viz2=document.getElementById('viz2placeholder');
    viz2.src = "viz2_2.jpg"
	},
	progress: function(el, progress) {
    console.log("the special element's progress is:", progress);
	},
	offset: 0.5 // enter at middle of viewport
	// once: true, // trigger just once
});
