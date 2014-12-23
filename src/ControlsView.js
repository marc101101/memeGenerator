MemeGenerator.ControlsView = (function() {
	var that = {},
		inputTitle,
		inputTop,
		inputBottom,
		inputFont,
		inputCaps,
		inputOutline,
		inputCreate,
		inputReset,
		controller,
		wordTop ="",
		wordBottom ="",

	init = function(maincontroller) {
		controller = maincontroller;
		_initUI();
		_initEvents();
		return that;
	},

	_initUI = function(){
		inputTitle = document.getElementById('input-title');
		inputTop = document.getElementById('input-top');
		inputBottom = document.getElementById('input-bottom');
		inputFont = document.getElementById('input-font');
		inputCaps= document.getElementById('input-caps');
		inputOutline = document.getElementById('input-outline');
		inputCreate = document.getElementById('button-create');
		inputReset = document.getElementById('button-reset');
		
	},

	_initEvents = function() {
		//input title
		inputTitle.addEventListener('keyup', _newInput);
		//input top
		inputTop.addEventListener('keyup', _newInput);
		//input bottom
		inputBottom.addEventListener('keyup', _newInput);
		//input font
		inputFont.addEventListener('click', _newInput);
		//input caps
		inputCaps.addEventListener('change', _newInput);
		//input outline
		inputOutline.addEventListener('change', _newInput);
		//input create button
		inputCreate.addEventListener('click', _create);
		//input reset button
		inputReset.addEventListener('click', _reset);
	},
	_create = function(event){
		controller.create();
	},
		
	_reset = function(event){
		controller.reset();
	},
	
	_newInput = function(event){
		controller.newInput();
	};

	that.init = init;
	return that;
})();