         $(document).ready(function () {
	$('input[name="q"]').autocomplete( {
		source: function(query, response) {
			$.getJSON("https://suggestqueries.google.com/complete/search?callback=?", { 
				"hl":"id",      
				"jsonp":"suggestCallBack", 
				"q":query.term,
				"ds":"yt",
				"client":"youtube",
			});
			suggestCallBack = function(data) {
			var suggestions = [];
			$.each(data[1], function(key, val) {
				suggestions.push(val[0]);
			});
			suggestions.length = 10;
			response(suggestions);
			};
		},
		delay: 0,
	});
});