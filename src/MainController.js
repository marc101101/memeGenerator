MemeGenerator.MainController = (function() {
	var that = {},

	controlsView = null,
	memeView = null,
	showcaseView = null,
	samplesView = null,
	memeModel = null,
	LOCAL_STORAGE_HS_KEY = "IMAGE",
	aktMemes = [],
	storageKeyCounter;

	init = function() {
		_initEvents();
		$("body").on("saveMeme", _printOut);
		$("body").on("deleteLocalStorageElement", _deleteLocalStorageElement);
		_initModules();
		_loadMemes();
		return that;
	},

	_initModules = function() {
		memeView = MemeGenerator.MemeView.init();
		showcaseView = MemeGenerator.ShowcaseView.init($('#showcase-list'));
		samplesView = MemeGenerator.SamplesView.init($('#sample-list'), memeView);
		memeModel = MemeGenerator.MemeModel.init(); 
		controlsView = MemeGenerator.ControlsView.init(that);
	},

	_initEvents = function() {
	},
		
	newInput = function (){
		memeView.renderNew();
	},
		
	reset = function (){
		memeView.resetView();
	},
	
	create = function (){
		memeView.createMeme();
	},
		
	_notify = function(score){
	 	$("body").trigger("newShowCase", score);	
	},
		
	_printOut = function (event, url){
		_saveMemes(url);		
	},
	//speichert neues element im localstorage
	_saveMemes = function (canvasUrl) {
		 storageKeyCounter = JSON.parse(localStorage.getItem("keyCounter"));
		 if(storageKeyCounter == null){
		 	storageKeyCounter = 1;
		 }
		 localStorage.setItem(LOCAL_STORAGE_HS_KEY+storageKeyCounter, JSON.stringify(canvasUrl));
		 storageKeyCounter++;
		 localStorage.setItem("keyCounter", JSON.stringify(storageKeyCounter));
		_loadMemes();
	},
	//holt sich daten aus localstorage und lässt diese rendern
	_loadMemes = function(){
		var currentHighScore;
		if (currentHighScore == null) {
        	currentHighScore = [];
        }
		for(var i in window.localStorage){
			if(i != "keyCounter"){
				var element = JSON.parse(localStorage.getItem(i));
				currentHighScore.push(element);
			}
		}	
		showcaseView.renderShowCase(currentHighScore);
	},
	//löscht element aus dem localstorage
	_deleteLocalStorageElement = function(event, deletePos){
		localStorage.removeItem(LOCAL_STORAGE_HS_KEY+deletePos);
		if(storageKeyCounter != 0){
			storageKeyCounter = storageKeyCounter-1;
		}
		
	localStorage.setItem("keyCounter", JSON.stringify(storageKeyCounter));
		_loadMemes();
	};
		
	that.init = init;
	that.reset = reset;
	that.create = create;
	that.newInput = newInput;
	return that;
})();