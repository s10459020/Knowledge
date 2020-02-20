String.prototype.format = function() {
	 var formatted = this;
	 for( var arg in arguments ) {
		formatted = formatted.replace("{" + arg +"}", arguments[arg]);
	 }
	 return formatted;
};

function getPathQuery(){
	var queriesText = document.location.search.substr(1).split('&');
	var queries = [];
	queriesText.forEach(function(q){
		var i = q.split('=');
		queries[i[0]] = i[1];
	});
	
	var path = queries["path"];
	return path;
}

function parseJSON(data){
	// change all \t in string to \\t
	var predata = data.replace(/(?:").*?(?:")/g, function(match){
		return match.replace(/\t/g, "\\t");
	});
	
	return JSON.parse(predata);
}

class Chapter{
	constructor(title, content) {
		this.title = title;
		this.content = content;
	}
	
	parseHTML(url, path){
		return "" +
			"<article class='main chapter'>" +
			"	<section class ='chapter title'>{0}</section>".format(this.title) +
			"	<section class ='chapter content word'>{0}</section>".format(this.content) +
			"</article>";
	}
}

class Option{
	constructor(title, content, image, link) {
		this.title = title;
		this.content = content;
		this.image = image;
		this.link = link;
	}
	
	static contain(list, title){
		var option = null;
		list.forEach(function(e){
			if(e.title == title){
				option = e;
			}
		});
		return option;
	}
	
	parseHTML(url, path){
		var link = this.link;
		var title = this.title;
		var image = this.image;
		var content = this.content;
		
		// link
		var islink = (link) ? "link" : "";
		var onclick = (link) ? "window.location.href='index.html?path={0}/'".format(path + title)	: "";

		//image
		var imgSrc = (image) ? (url + path + image) : (url + "imageNoFound.jpg")
				
		//content
		var contents = ""
		if (content)
			content.forEach(function(e){
				contents += "<li class='word'>{0}</li>".format(e);
			});
				
		// footer
		return "" +
			"<article class='main option {0}' onclick=\"{1}\">".format(islink, onclick) +
				"<header class='option title'> {0} </header>".format(title) +

				"<section class='option image'>" +
					"<image src='{0}'>".format(imgSrc) +
				"</section>" +
				
				"<section class='option content'>" +
					"<ui>" +
						contents +
					"</ui>" +
				"</section>" +
				
				"<footer></footer>"+
			"</article>";
	}
}