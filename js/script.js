(function() {
	/**** INITIAL VARIABLE DECLARATION ****/
	var  patternCont = document.getElementById('contLock'),
		saveP = document.getElementById('savePattern'),
		checkP = document.getElementById('checkPattern'),
		sequenceArr = [],
		savedArr = [];

	/**** CREATING CROSS BROWSER EVENT LISTENERS ****/
	function addEvent(obj, type, fn) {
		if (obj.addEventListener)
			obj.addEventListener(type, fn, false);
		else if (obj.attachEvent) {
			obj["e" + type + fn] = fn;
			obj[type + fn] = function() {
				obj["e" + type + fn](window.event);
			}
			obj.attachEvent("on" + type, obj[type + fn]);
		}
	};

	function removeEvent(obj, type, fn) {
		if (obj.removeEventListener)
			obj.removeEventListener(type, fn, false);
		else if (obj.detachEvent) {
			obj.detachEvent("on" + type, obj[type + fn]);
			obj[type + fn] = null;
			obj["e" + type + fn] = null;
		}
	};
	/**** CREATING CROSS BROWSER EVENT LISTENERS ****/


	/**** STARTING POINT OF PATTERN CREATION ****/
	var startLockPattern = {
		init: function(e) {
			var target = e.target || e.srcElement;
			if (target && target.nodeName == "LI") {

				sequenceArr.length = 0;
				giveColor.init();
				removePattern.init();
				target.style.backgroundColor = 'green';
				sequenceArr.push(target.id);

				addEvent(patternCont, 'mouseover', createLockPattern.init);

				/**** TOUCH MOVE EVENT ****/
				addEvent(patternCont, 'touchmove', createPatternForTouchEvent.init);
			}
		}
	},

		/**** CREATION OF THE COMPLETE PATTERN ****/
		createLockPattern = {
			init: function(e) {
				var target = e.target || e.srcElement;

				if (target && target.nodeName == "LI") {
					target.style.backgroundColor = 'green';
					sequenceArr.push(target.id);
					giveThePattern.init();
				}
			}
		},

		/**** FOR TOUCHSCREEN - CREATION OF THE COMPLETE PATTERN ****/
		/****  BECAUSE THE TOUCHENTER DOES NOT WORK AS IT SHOULD :)  ****/
		createPatternForTouchEvent = {
			init: function(e) {
				var changedTouches = e.changedTouches[0];
				var target = document.elementFromPoint(changedTouches.pageX, changedTouches.pageY);

				if (target && target.nodeName == "LI") {
					target.style.backgroundColor = 'green';
					if (sequenceArr.indexOf(target.id) == -1){
						sequenceArr.push(target.id);
						giveThePattern.init();
					}
				}	
			}
		},


		/**** MOUSEUP EVENT FOR PATTERN COMPLETION ****/
		endLockPattern = {
			init: function(e) {
				removeEvent(patternCont, 'mouseover', createLockPattern.init);

				/**** TOUCH MOVE EVENT ****/
				removeEvent(patternCont, 'touchmove', createLockPattern.init);				
			}
		},

		/**** CREATING LINKS FOR THE PATTERN ****/
		giveThePattern = {
			init: function() {
				var patternLinks;
				if (parseInt(sequenceArr[sequenceArr.length - 2]) > parseInt(sequenceArr[sequenceArr.length - 1])) {
					patternLinks = sequenceArr[sequenceArr.length - 1] + sequenceArr[sequenceArr.length - 2];
				} else {
					patternLinks = sequenceArr[sequenceArr.length - 2] + sequenceArr[sequenceArr.length - 1];
				}
				
				if (sequenceArr[sequenceArr.length - 1] != sequenceArr[sequenceArr.length - 2]) {
					document.getElementById('line' + patternLinks).style.display = 'block';
				}

			}
		},

		/**** CLEARING OUT THE PATTERN ****/
		removePattern = {
			init: function() {
				var patternVal = document.getElementById('patternImg').childNodes,
					patternLength = patternVal.length;

				for (var i = 0; i < patternLength; i++) {
					if (patternVal[i].nodeType == 1) {
						patternVal[i].style.display = 'none';
					}
				};
			}
		},

		/**** CLEARINNG OUT THE HIGHLIGHTED PASSWORD****/
		giveColor = {
			init: function() {
				var childLI = patternCont.childNodes;
				for (var i = 0; i < childLI.length; i++) {
					if (childLI[i].nodeType == 1) {
						childLI[i].style.background = 'none';
					}
				};
			}
		},

		/**** SAVING THE PATTERN ****/
		savePattern = function() {
			saveP.onclick = function() {
				if (sequenceArr.length === 0) {
					alert("Please Draw a Pattern");
				} else {
					patternTest.init();
					savedArr = sequenceArr.join('');
					sequenceArr.length = 0;
					giveColor.init();
					removePattern.init();
				}
			}
		},

		/**** VERIFYING THE PATTERN WITH THE SAVED PATTERN ****/
		checkPattern = function() {
			checkP.onclick = function() {
				if (sequenceArr.join('') === savedArr) {
					alert("Pattern Matched");
					alert("Phone Unlocked")
					alert("Set Pattern Again")
					patternTest.init();
					giveColor.init();
					removePattern.init();
					sequenceArr.length = 0;
				} else {
					alert("Wrong Pattern, Try Again !!!");
					giveColor.init();
					removePattern.init();
					sequenceArr.length = 0;
				}
			}
		},

		/**** TOGGLE FUNCTIONALITY OF THE SAVE AND CHECK PATTERN BUTTON ****/
		patternTest = {
			init: function() {
				if (saveP.style.display == 'block') {
					saveP.style.display = 'none';
					checkP.style.display = 'block';
				} else {
					saveP.style.display = 'block';
					checkP.style.display = 'none';
				}
			}
		};

	/**** REMOVING SELECTION OF IMAGES ON DRAG****/
	document.onselectstart = function() {
		return false;
	};

	/**** EVENT LISTENER FOR PATTERN START ****/
	addEvent(patternCont, 'mousedown', startLockPattern.init);

	/**** EVENT LISTENER FOR TOUCH PATTERN START ****/
	addEvent(patternCont, 'touchstart', startLockPattern.init);	

	/**** EVENT LISTENER FOR THE PATTERN END ****/
	addEvent(document, 'mouseup', endLockPattern.init);

	/**** EVENT LISTENER FOR THE PATTERN END ****/
	addEvent(document, 'touchend', endLockPattern.init);	

	savePattern();
	checkPattern();

}(window, document));
