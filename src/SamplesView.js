MemeGenerator.SamplesView = (function() {
	var that = {},
		sampleList,
		canvasController,
		controllVar = 0,

	init = function(newSampleList, newCanvasController) {
		_initUI(newSampleList);
		_initEvents();
		canvasController = newCanvasController;
		return that;
	},

	_initUI = function(newSampleList) {
		sampleList = newSampleList;
	},
	//reagiert wenn die samples heruntergeladen wurden bzw. legt die möglichkeit des anklickens 
	_initEvents = function() {
		$('body').on('onSampleAvailable', _renderSample);
		$("#samples").delegate('.list li', 'click', _onclickCallback);
	},
	//rendert jedes einzelens sample durch
	 _renderSample = function (event, sample) {
		_.each(sample, _addMemeSample);
     },
	//click event für geklicktes bild
	_onclickCallback = function(event){
		var url = "" + event.target.currentSrc;
		$('body').trigger('onLoadImageAvailable', [url]);
	},
	//verbindet daten mit template
	_addMemeSample = function (sampleElement){
		var memeContainer = _getContainerForItem($("#memeTemplate"), sampleElement);
		$(memeContainer).hide().appendTo(sampleList).fadeIn();
	},

     _getContainerForItem = function (templateId, item) {
		var compile = _.template($(templateId).html());
		return compile(item);
	};

	that.init = init;
	return that;
})();
