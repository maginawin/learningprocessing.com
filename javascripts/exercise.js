$('document').ready(function(){

	var JSfile 	= $('.js-files');
	var PDEfile = $('.pde-files');

	populateCodeWindow(true, PDEfile);
	createCodeNav(PDEfile);

});

function setCodeDimensions() {

	var windowHeight = $(window).height();
	var containerHeight = $('.exercise-description').height() + $('.code-tab').height();
	var codeContainerHeight = windowHeight - containerHeight;

	$('.code-container').height(codeContainerHeight);

}

function populateCodeWindow(load, file) {

	var url;
	
	if(load) {
		url = file.first().val();
	} else {
		url = file;
	}

	$.get(url).done(function(data){

		// Strip away an opening comments like "// Learning Processing"
		var lines = data.split("\n");
		while (lines[0].indexOf("/") === 0) {
			lines.splice(0, 1);
		}
		data = lines.join("\n");

		$('.code-container pre code').html(data);
		Prism.highlightAll();
		setCodeDimensions(); // Tighten up layout and set strict dimensions

	});
	
}

window.onload = function() {

	var canvas = document.getElementById('defaultCanvas');

	if( canvas == null && $('.sketch-alternative').length == 0) {

		// NO SKETCH AVAILABLE
		$('#sketch-container').append('<div id="defaultCanvas" style="display: block"><h4>NO SKETCH AVAILABLE</h4></div>');
		$('.background-explainer').hide();
		

	} else {

  		$(canvas).prependTo("#sketch-container").fadeIn(300);
  		$('.sketch-caption').fadeIn(300);
		
	}

	if($('.sketch-alternative').length != 0) {

		$('.sketch-caption').fadeIn(300);

	}
	
};

function createCodeNav() {

	$('.pde-files').each(function(index, el) {

		var url  	= $(this).val();
		var label 	= $(this).attr('data-label');
		var link 	= url.substr(url.lastIndexOf('/') + 1);
			link 	= link.replace('exercise_','');

		$('.code-tab').append('<a href="'+url+'" data-js="'+label+'" class="code-tab-link">'+link+'</a>');

	});

	// Prevent default click and run code population functions
	$('.code-tab-link').click(function(e){

		e.preventDefault();

		var PDEfile = $(this).attr('href');
		populateCodeWindow(false, PDEfile);

	});

}