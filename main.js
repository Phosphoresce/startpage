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

function interpretSearch() {
    var search = document.getElementById("js-search-input").value.split(" ");
    var searchTerms = "";
    console.log(search[0])
    switch(search[0])
    {
        case '?':
            alert("c: 4chan\nr: reddit\nt: twitch\nyt: youtube");
            break;
        case 'c:':
            window.location.href = "https://4chan.org/" + search[1];
            return false;
        case 'r:':
            window.location.href = "https://reddit.com/r/" + search[1];
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
