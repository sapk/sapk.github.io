var CV = CV || {};
CV.console =  {
    _el : null,
    themes : ["ubuntu","hacker","red","normal"],
    init : function() {
        CV.console._el = $("#console");
        CV.console._el.on("click", function(e){
            //console.log(this,e,$(this).attr("data-file-id"))
            if($(e.target).is("[data-file-id]")){ //file link
                return CV.file.open($(e.target).attr("data-file-id"));
            }
            
    	    CV.input._el.focus();
    	    var i = (CV.console.themes.indexOf(CV.console._el.attr("data-theme"))+1)%CV.console.themes.length
    	    console.log(i,CV.console.themes[i])
		    CV.console._el.attr("data-theme",CV.console.themes[i])
		    localStorage.current_theme = CV.console.themes[i];
            CV.console.goBottom();
		    //TODO change them color
        })
		CV.console._el.attr("data-theme",localStorage.current_theme || "normal") //load last theme for localstorage
    },
    goBottom : function() {
        //window.setTimeout("CV.input.blur().focus()",100); //to go down
        CV.input._el.blur().focus();
        //CV.console[0].scrollTo(0, CV.console.height()); //TODO better
    },
    log : function(text) {
        CV.input._el.parent().before(`<pre id="line-${CV.console._el.find('pre').length}" >${text}</pre>`);
        CV.console.goBottom();
    }
}

CV.console.init()