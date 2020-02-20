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

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function setHeader(title) {
	$("#header").html(title); 
}

function setChapter(title, content) {
	$("#chapter").append(
		"<article class='main chapter'>" +
		"	<section class ='chapter title'>{0}</section>".format(title) +
		"	<section class ='chapter content word'>{0}</section>".format(content) +
		"</article>"
	);
}

function setOption(title, content, image, link) {
	$("option").append(
		// link
		/*
		var linkClass = (articleList[key]["directory"])
			? "link"
			: "";
		var linkOnclick = (articleList[key]["directory"])
			? "window.location.href='.?path={0}'".format(path + articleList[key]["directory"])
			: ""
			
		article += 	"<article class='main article {0}' onclick=\"{1}\">"
			.format(linkClass, linkOnclick);
		*/
		
			//header
			"<header class='article title'> {0} </header>".format(title) +
			
			//image
			"<section class='article image'>" +
			"	<image src='{0}'>".format(imgSrc) +
			"</section>" +
			
			//content
			"<section id='article_{0}' class='article content'>".format(articleList[key]["name"]) +
			
			"</section>" +
			
			// footer
			"<footer></footer>" +
		"</article>"
	);
	
	/*
	if (articleList[key]["content"]){
		var articleURL = url + path + articleList[key]["content"];
		$.ajax({ 
			url: articleURL
			,dataType : "html"
			
		}).done(function(data){
			var json = parseJSON(data);
			var content = "";
			
			content += "<ui>";
			json.forEach(function(e){
				content += "<li>{0}</li>".format(e);
			});
			content += "</ui>";
			
			$("#article_" + articleList[key]["name"]).append(content);
		});
	}
	*/
}

class Chapter{
	constructor(title, content) {
		this.title = title;
		this.content = content;
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
}