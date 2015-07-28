var CV = CV || {};

//TODO cmd.func should not wirte directly to DOM but wrap by a caller that send to DOM wath is send by comdm execution

CV.cmd = {
	        		"time" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_time"]+"\n ");
	        		    }
	        			CV.console.log((new Date()).toLocaleTimeString()+"\n ");
	        		},
	        		"date" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_date"]+"\n ");
	        		    }
	        			CV.console.log((new Date()).toLocaleDateString()+"\n ");
	        		},
	        		"datetime" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_datetime"]+"\n ");
	        		    }
	        			CV.console.log((new Date()).toLocaleString()+"\n ");
	        		},
	        		"snake" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_snake"]+"\n ");
	        		    }
	        		    window.location.href="game/snake/";
	        		},
	        		"history" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_history"]+"\n ");
	        		    }
	        		    
	        		    if(args.length > 0 && args.indexOf("-c") != -1){
	        		        //Show help message
	        			    return CV.history.reset();
	        		    }
	        		    
	        		    max_line = (args.length > 0 && args.indexOf("-n") != -1)?args[args.indexOf("-n")+1]:CV.history.max_length;
                        nb_line=Math.max(CV.history.count(),max_line);
	        		    $.each(CV.history.list().slice(-max_line), function(i, cmd){
    	        		     CV.console.log("["+(i+1+nb_line-max_line)+"] : " +cmd)
                        })
	        		    CV.console.log(" ")
	        			//CV.console.log((new Date()).toLocaleDateString()+"\n ");
	        		},
	        		"locale" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_locale"]+"\n ");
	        		    }
	        		    console.log(args);
	        		    if(args.length == 0){
	        		        CV.console.log(CV.conf.locale+"\n ");
	        		    } else if (args[0] == "-a") {
	        		        $.each(CV.locale, function(index, item){
	        		            CV.console.log(index)
                            })
	        		        CV.console.log(" ")
	        		    }
	        		},
	        		"export" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_export"]+"\n ");
	        		    }
	        		    //TODO save all unkonw variables
	        		    console.log(args);
	        		    if (args.length == 1 && args[0].startsWith("LANG=")) {
	        		        //TODO change lang without reload
	        		        if(typeof CV.locale[args[0].split("=")[1]] == "undefined") {
    	        		        return CV.console.log(CV.current_locale["unknown_language"]);
    	        		    }
	        		        localStorage.current_locale = args[0].split("=")[1]
	        		        console.log(localStorage.current_locale)
	        		        window.location.reload()
	        		    }
	        		},
	        		"env" : function(args){
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_env"]+"\n ");
	        		    }
	        		    CV.console.log("LANG="+CV.conf.locale+"\n ");
	        		},
	        		"open" : function(args){
	        		    //TODO support subfolder + add direct link
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_open"]+"\n ");
	        		    }
	        		     CV.file.open(args[0]);
	        		},
	        		"ls" : function(args){
	        		    //TODO support subfolder + add direct link
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_ls"]+"\n ");
	        		    }
	        		    var html = ". ";
	        		    $.each(CV.file.list(),function(id,f){
	        		        html += `<a data-file-id="${id}" title="${f.desc}" >${id}</a> `
	        		    })
	        		    CV.console.log(html+"\n ");
	        		},
	        		"tree" : function(args){
	        		    //TODO support subfolder + add direct link
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_tree"]+"\n ");
	        		    }
	        		    var html = ". \n";
	        		    var file_list = CV.file.list();
	        		    //last= CV.file.list().last()
	        		    $.each(file_list,function(id,f){
	        		        html += `|-- <a data-file-id="${id}" title="${f.desc}" >${id}</a>\n`
	        		    })
						//We change last line
	        		    var n=html.lastIndexOf("|--");
	        		    html = html.substring(0, n)+ `\\\`` + html.substring(n+1) ;
	        		    //html += `\\\`-- <a data-file-id="${file}">${last}</a>\n`
	        		    CV.console.log(html+"\n ");

	        		}, 
	        		"help" : function(args){
    	        		    if(args.length > 0 && args.indexOf("-h") != -1){
    	        		        //Show help message
    	        			    return CV.console.log(CV.current_locale["help_help"]+"\n ");
    	        		    }
    	        		    if(args.length > 0){ //functionname has been specified
    	        		        $.each(args, function(i, name){
    	        		            console.log(i,name,CV.cmd[name],typeof CV.cmd[name])
    	        		            if(typeof CV.cmd[name] == "function"){
        	        		            CV.console.log(name +" : ")
        	        		            CV.cmd[name](["-h"])
        	        		        }
                                })
                                return 
    	        		    }
    	        		    //Else we show all functions
	        		        $.each(CV.cmd, function(name, func){
	        		            if(name != "help"){
    	        		            //CV.console.log(name +" : \n"+func(["-h"])+"\n ")
    	        		            CV.console.log(name +" : ")
    	        		            func(["-h"])
	        		            }
                            })
	        		},
}