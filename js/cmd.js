var CV = CV || {};

CV.cmd = {
	        		"time" : function(args){
	        			CV.console.add((new Date()).toLocaleTimeString()+"\n ");
	        		},
	        		"date" : function(args){
	        			CV.console.add((new Date()).toLocaleDateString()+"\n ");
	        		},
	        		"datetime" : function(args){
	        			CV.console.add((new Date()).toLocaleString()+"\n ");
	        		},
	        		"locale" : function(args){
	        		    console.log(args);
	        		    if(args.length == 0){
	        		        CV.console.add(CV.conf.locale+"\n ");
	        		    } else if (args[0] == "-a") {
	        		        $.each(CV.locale, function(index, item){
	        		            CV.console.add(index)
                            })
	        		        CV.console.add(" ")
	        		    }
	        		},
	        		"export" : function(args){
	        		    //TODO save all unkonw variables
	        		    console.log(args);
	        		    if (args.length == 1 && args[0].startsWith("LANG=")) {
	        		        if(typeof CV.locale[args[0].split("=")[1]] == "undefined") {
    	        		        return CV.console.add(CV.current_locale["unknown_language"]);
    	        		    }
	        		        localStorage.current_locale = args[0].split("=")[1]
	        		        console.log(localStorage.current_locale)
	        		        window.location.reload()
	        		    }
	        		},
	        		"env" : function(args){
	        		    CV.console.add("LANG="+CV.conf.locale+"\n ");
	        		},
	        		"ls" : function(args){
	        		    CV.console.add("cdd img index.html js\n ");
	        		},
	        		"tree" : function(args){
	        			CV.console.add(`
.
|-- css
|-- img
|-- index.html
\`-- js
  `);
	        		}
}
