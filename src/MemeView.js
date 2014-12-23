MemeGenerator.MemeView = (function() {
	var that = {},
	MEMECANVASWIDTH = 600,
	MEMECANVASHEIGHT = 380,
	THUMBNAILSIZE = 100,
	LOCAL_STORAGE_HS_KEY = "MEMES"
	target = document.getElementById("workarea"),
	canvas = document.querySelector('#meme'),
	context= canvas.getContext('2d'),
	globalUrl = "", 
	inputTitle = document.getElementById('input-title'),
	inputTop = document.getElementById('input-top'),
	inputBottom = document.getElementById('input-bottom'),
	inputFont = document.getElementById('input-font'),
	inputCaps= document.getElementById('input-caps'),
	inputOutline = document.getElementById('input-outline'),
	inputCreate = document.getElementById('button-create'),
	inputReset = document.getElementById('button-reset'),
	title ="";
	textTop ="",
	textBottom ="",
	font ="Impact",
	caps ="uppercase",
	outline ="outline",
    img = new Image(),
		
	init = function() {
		_initUI();
		_initEvents();
		return that;
	},

	_initUI = function() {
		target.addEventListener('drop', _onDrop, false);
		target.addEventListener('dragover', _onDragOver, false);
	},

	_initEvents = function() {
		canvas.height = MEMECANVASHEIGHT;
		canvas.width = MEMECANVASWIDTH;
		$('body').on('onLoadImageAvailable', _loadImage);
	},
	//lädt bild in den canvas
	_loadImage = function (event,url){
		img.setAttribute('crossOrigin', 'anonymous');
		img.src = url;
		globalUrl = url;
       	context.drawImage(img, MEMECANVASWIDTH/5, 20, MEMECANVASHEIGHT/1.1, MEMECANVASHEIGHT/1.1);	
		_workareaTitleVisability("hidden");
		renderNew;
		return that;
	},
	//setzt platzhalter unsichtbar
	_workareaTitleVisability = function(status){
		document.getElementsByClassName('workarea-title')[0].style.visibility=status;
	},
	//nach drag and drop lässt die methode bild neu laden
	_setBackgroundImage = function (file) {
         globalUrl = URL.createObjectURL(file);
		 _loadImage(null,globalUrl);
		 renderNew;
     }
	
	_onDragOver = function (event) {
		event.stopPropagation();
		event.preventDefault();
    },

    _onDrop = function (event) {
		var file = event.dataTransfer.files[0];
		event.stopPropagation();
		event.preventDefault();
		_setBackgroundImage(file);
    },
	//holt sich daten aus input elementen und rendert diese auf das canvas
	renderNew = function () {
		
		_loadImage(null, globalUrl);
		
		context.clearRect(0,0,MEMECANVASWIDTH,MEMECANVASHEIGHT);
		if(globalUrl != null){
			textTop = inputTop.value;
			textBottom = inputBottom.value;
			font = inputFont.value;
		}
		title = inputTitle.value;		
		context.textBaseline = 'bottom';
		context.textAlign = 'center';
		context.strokeStyle = 'black';
    	context.lineWidth = 2;
		if(font === "Impact"){
			context.font = "30px Impact";
		}
		else{
			context.font = '32px Comic Sans MS';
		}
		if(inputCaps.checked == true){
			textTop = textTop.toUpperCase();
			textBottom= textBottom.toUpperCase();
		}
		else{
			textTop = "" + textTop.toLowerCase();
			textBottom = "" + textBottom.toLowerCase();
		}
		if(inputOutline.checked === true){
			_loadImage(null, globalUrl);
			context.fillStyle = 'white';
			context.fillText(textTop, MEMECANVASWIDTH/2, 60);
			context.strokeText(textTop, MEMECANVASWIDTH/2, 60);
			context.fillText(textBottom, MEMECANVASWIDTH/2, MEMECANVASHEIGHT-25);
			context.strokeText(textBottom, MEMECANVASWIDTH/2, MEMECANVASHEIGHT-25);
			
		}
		else{
			_loadImage(null, globalUrl);
			context.fillStyle = 'white';
			context.fillText(textTop, MEMECANVASWIDTH/2, 60);
			context.fillText(textBottom, MEMECANVASWIDTH/2, MEMECANVASHEIGHT-25);
		}
		img.onload = function(){
			_loadImage(null, globalUrl);
			context.fillStyle = 'white';
			context.fillText(textTop, MEMECANVASWIDTH/2, 60);
			context.strokeText(textTop, MEMECANVASWIDTH/2, 60);
			context.fillText(textBottom, MEMECANVASWIDTH/2, MEMECANVASHEIGHT-25);
			context.strokeText(textBottom, MEMECANVASWIDTH/2, MEMECANVASHEIGHT-25);
		}
	},
		
	createMeme = function () {
		var aktMeme = [title, textTop, textBottom, font, caps, outline, canvas.toDataURL()];
		$('body').trigger('saveMeme', [aktMeme]);
	},
	//setzt alle elemente auf null und rendert alles wieder bzw. setzt platzhalter wieder auf sichtbar
	resetView = function(){
		inputTitle.value ="";
		inputTop.value = "";
		inputBottom.value = "";
		globalUrl = "";
		inputCaps.checked = true;
		inputOutline.checked = true;
		renderNew();
		_workareaTitleVisability("visible");
	};
	
	that.renderNew = renderNew;
	that.createMeme = createMeme;
	that.resetView = resetView;
	that.init = init;
	//that.loadImage = loadImage;
	return that;
})();
