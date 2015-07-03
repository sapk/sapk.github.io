var CV = CV || {};

//TODO cmd.func should not wirte directly to DOM but wrap by a caller that send to DOM wath is send by comdm execution

CV.cmd = {
	        		"time" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.add(CV.current_locale["help_time"]+"\n ");
	        		    }
	        			CV.console.add((new Date()).toLocaleTimeString()+"\n ");
	        		},
	        		"date" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.add(CV.current_locale["help_date"]+"\n ");
	        		    }
	        			CV.console.add((new Date()).toLocaleDateString()+"\n ");
	        		},
	        		"datetime" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.add(CV.current_locale["help_datetime"]+"\n ");
	        		    }
	        			CV.console.add((new Date()).toLocaleString()+"\n ");
	        		},
	        		"locale" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.add(CV.current_locale["help_locale"]+"\n ");
	        		    }
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
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.add(CV.current_locale["help_export"]+"\n ");
	        		    }
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
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.add(CV.current_locale["help_env"]+"\n ");
	        		    }
	        		    CV.console.add("LANG="+CV.conf.locale+"\n ");
	        		},/*
	        		"ls" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.add(CV.current_locale["help_ls"]+"\n ");
	        		    }
	        		    CV.console.add("cdd img index.html js\n ");
	        		},
	        		"tree" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.add(CV.current_locale["help_tree"]+"\n ");
	        		    }
	        			CV.console.add(`
.
|-- css
|-- img
|-- index.html
\`-- js
  `);
	        		}, //*/
	        		"help" : function(args){
    	        		    if(args.length > 0 && args.indexOf("-h") != -1){
    	        		        //Show help message
    	        			    return CV.console.add(CV.current_locale["help_help"]+"\n ");
    	        		    }
    	        		    if(args.length > 0){ //functionname has been specified
    	        		        $.each(args, function(i, name){
    	        		            console.log(i,name,CV.cmd[name],typeof CV.cmd[name])
    	        		            if(typeof CV.cmd[name] == "function"){
        	        		            CV.console.add(name +" : ")
        	        		            CV.cmd[name](["-h"])
        	        		        }
                                })
                                return 
    	        		    }
    	        		    //Else we show all functions
	        		        $.each(CV.cmd, function(name, func){
	        		            if(name != "help"){
    	        		            //CV.console.add(name +" : \n"+func(["-h"])+"\n ")
    	        		            CV.console.add(name +" : ")
    	        		            func(["-h"])
	        		            }
                            })
	        		},
}
