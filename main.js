function post(path, params, method) {
	method = method || "post";

	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);

	for(var key in params) {
		if(params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();
}

function CountDownTimer(duration, granularity) {
	this.duration = duration;
	this.granularity = granularity || 1000;
	this.tickFtns = [];
	this.running = false;
}

CountDownTimer.prototype.start = function() {
	if (this.running) {
		return;
	}
	this.running = true;
	var start = Date.now(),
      		that = this,
      		diff, obj;

  	(function timer() {
    		diff = that.duration - (((Date.now() - start) / 1000) | 0);
    
    		if (diff > 0) {
      			setTimeout(timer, that.granularity);
    		} else {
      			diff = 0;
      			that.running = false;
    		}
		
		obj = CountDownTimer.parse(diff);
		that.tickFtns.forEach(function(ftn) {
			ftn.call(this, obj.minutes, obj.seconds);
		}, that);
	}());
};

CountDownTimer.prototype.onTick = function(ftn) {
	if (typeof ftn === 'function') {
    		this.tickFtns.push(ftn);
	}
	return this;
};

CountDownTimer.prototype.expired = function() {
	return !this.running;
};

CountDownTimer.parse = function(seconds) {
	return {
		'minutes': (seconds / 60) | 0,
    		'seconds': (seconds % 60) | 0
  	};
};

function timer(duration, temp) {
	var display = document.querySelector('#time');
    		timer = new CountDownTimer(duration),
        	timeObj = CountDownTimer.parse(duration);

    	format(timeObj.minutes, timeObj.seconds, temp, display);
    
    	timer.onTick(format);
   	timer.start();
}

function format(minutes, seconds, temp, display) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds + " at " + temp + " degrees farenheit.";
}

function interpretSearch() {
	var search = document.getElementById("js-search-input").value.split(" ");
    	var searchTerms = "";
    	console.log(search[0])
    	switch(search[0])
    	{
      	case '?':
        	alert("c: 4chan\nr: reddit\ng: github\nt: twitch\nyt: youtube\n\nTea Timers\nbt: black tea\ngt: green tea");
            	break;
        case 'c:':
            	window.location.href = "https://4chan.org/" + search[1];
            	return false;
        case 'r:':
            	window.location.href = "https://reddit.com/r/" + search[1];
            	return false;
        case 'g:':
            	window.location.href = "https://github.com/" + search[1];
            	return false;
        case 't:':
            	window.location.href = "https://twitch.tv/" + search[1];
            	return false;
        case 'yt:':
            	for(var i = 1; i < search.length; i++)
            	{
                	searchTerms += search[i]+'+';
            	}
            	window.location.href = "https://youtube.com/results?search_query=" + searchTerms;
            	return false;
	case '!bt':
	    	timer(4, 208)
	    	break;
	case '!gt':
	    	timer(2, 180)
	    	break;
        default:
	    	searchTerms += search[0]
            	for(var i = 1; i < search.length; i++)
            	{
                	searchTerms += ' '+search[i];
           	};
            	post("https://startpage.com/do/search", {query: searchTerms, t: "night"});
           	return false;
    	}
};
