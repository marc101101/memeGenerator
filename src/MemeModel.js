MemeGenerator.MemeModel = (function() {
	var that = {},
	SERVER_URL = "http://132.199.139.24/~baa56852/meme-generator/api/memes.php",
	BASEURL = "http://132.199.139.24/~baa56852/meme-generator/memes/",
	sample = [];
		
	init = function() {
		_getInfoFromServer();
		return that;
	},
	//ajax holt sich vom server informationen
	_getInfoFromServer = function () {
					
			$.ajax({
				url: SERVER_URL,
				type: "GET",
				contentType: "text/javascript",
				dataType: "jsonp",
				success: _processServerResponse
			});
	},
		
	 _processServerResponse = function (data) {
            _improveData(data);		
            _finishSample();
      },	
	//bringt daten in passendes format
	_improveData = function (data) {
		for (var key in data.memes) {
			var sampleElement = {
				className: "listElement",
				title: data.memes[key].title,
				url: BASEURL + data.memes[key].url,
				dataUrl: "test2",
			};
			sample.push(sampleElement);
		}
	}
	//gibt daten weiter an die samplesview
	 _finishSample = function (event) {
		 $('body').trigger('onSampleAvailable', [sample]);
	 };

	that.init = init;

	return that;
})();