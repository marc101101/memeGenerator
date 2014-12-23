MemeGenerator.ShowcaseView = (function() {
	var that = {},
	localShowCase,
		globalCounter = 0,

	init = function(showCaseMaster) {
		_initUI();
		localShowCase = showCaseMaster;
		_initEvents();
		return that;
	},
	//verarbeitet array aus bildElementen
	renderShowcase = function(array){
		localShowCase.find('.thumbs-bottom').remove();
		for (var i = 0; i < array.length; i++) { 
        	_renderResult(array[i]);
			globalCounter++;
        }
		globalCounter =0;
	},
	//rendert jedes einzelne element in den showcase
	_renderResult = function(element){
		var thumb = $('<li class="thumbs-bottom" id="thumbs-' + globalCounter + '"></li>');
		var thumb1 = $('<div id="main-' + globalCounter + '"></div>');
		thumb.append(thumb1);
		thumb1.append('<span class="" id="delete"></span>');
		thumb1.append('<span class="" id="show"></span>');
		thumb1.append('<div class="meme-title">' + element[0] + '</div>');
		thumb1.append('<img id="image" src="' + element[6] + '" height="85%" width="100%">');
		localShowCase.append(thumb);

		$("#main-"+globalCounter).mouseenter(function(){
			var element = $("main-"+globalCounter,this).context;
			$(element).find("#delete").addClass("delete-meme-button");
			$(element).find("#delete").click(function(){
				var pos = $(element).attr("id").charAt(5);
				$("body").trigger("deleteLocalStorageElement", parseInt(pos)+1);
			});
		});
		
		//registriert ob maus auf einzelnen elementen ist und blendet buttons ein bzw. was die reaktionen sind
		$("#main-"+globalCounter).mouseleave(function(){
			var element = $("main-"+globalCounter,this).context;
			$(element).find("#delete").removeClass("delete-meme-button");
		});

		$("#main-"+globalCounter).mouseenter(function(){
			var element = $("main-"+globalCounter,this).context;
			$(element).find("#show").addClass("show-meme-button");
			$(element).find("#show").click(function(){
				window.open($(element).find("#image")[0].currentSrc);
			});
		});

		$("#main-"+globalCounter).mouseleave(function(){
			var element = $("main-"+globalCounter,this).context;
			$(element).find("#show").removeClass("show-meme-button");
		});
	};
		
	that.init = init;
	that.renderShowCase = renderShowcase;
	return that;
})();