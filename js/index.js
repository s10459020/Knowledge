String.prototype.format = function() {
	 var formatted = this;
	 for( var arg in arguments ) {
		formatted = formatted.replace("{" + arg +"}", arguments[arg]);
	 }
	 return formatted;
};

function getQuery(){
	var queries = [];
	  $.each(document.location.search.substr(1).split('&'),function(c,q){
		var i = q.split('=');
		queries[i[0]] = i[1];
	  });
	return queries;
}

function parseJSON(data){
	// change all \t in string to \\t
	var predata = data.replace(/(?:").*?(?:")/g, function(match){
		return match.replace(/\t/g, "\\t");
	});
	
	return JSON.parse(predata);
}