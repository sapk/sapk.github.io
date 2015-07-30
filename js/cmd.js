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
	        		    //TODO support folder +  multiple folder
	        		    var html = "";
                        args = CV.tool.cleanFolderArgs(args);
	        		    if(args.length > 0){
    	        		    $.each(args,function(i,folder){
    	        		        if (folder=="")
    	        		            return;
    	        		        //TODO check if folder exist
	        		            html += `<div>${folder} : <br><span style="margin-left:10px;">`
        	        		    $.each(CV.file.list(folder),function(id,f){
        	        		        html += `<a data-file-id="${id}" title="${f.desc}" >${id}</a> `
        	        		    })
	        		            html += `</span></div>`
        	        		});
	        		    }else{
    	        		    $.each(CV.file.list(),function(id,f){
    	        		        html += `<a data-file-id="${id}" title="${f.desc}" >${id}</a> `
    	        		    })
	        		    }
	        		    CV.console.log(html+"\n ");
	        		},
	        		"tree" : function(args){

	        		    //TODO support subfolder + add direct link
	        		    if(args.length > 0 && args.indexOf("-h") != -1){
	        		        //Show help message
	        			    return CV.console.log(CV.current_locale["help_tree"]+"\n ");
	        		    }
	        		    var html = "";
                        args = CV.tool.cleanFolderArgs(args);
                        if(args.length > 0){
    	        		    $.each(args,function(i,folder){
    	        		        //TODO nicrement spacing
	        		            html += `<div>${folder} : <br>`
                                html += CV.cmd_sub_func.tree(folder,1);
	        		            html += `</div>`
    	        		    });
	        		    }else{
	        		        html += CV.cmd_sub_func.tree();
	        		    }
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
	        		"sudo" : function(args){ //TODO
    	        		    if(args.length > 0 && args.indexOf("-h") != -1){
    	        		        //Show help message
    	        			    return CV.console.log("\n ");
    	        		    }
    	        		    //TODO crack the matrice
	        		},
	        		"uname" : function(args){ //TODO
    	        		    if(args.length > 0 && args.indexOf("-h") != -1){
    	        		        //Show help message
    	        			    return CV.console.log("\n ");
    	        		    }
    	        		    //TODO crack the matrice
	        		},
}
CV.cmd_sub_func = {
    tree : function(folder,level){
        level = level?level:0;
        console.log(folder,level)
        var html = "";
        var tab = "";
        for(i=0;i<level;i++)
            tab+= "     ";
            
	    $.each(CV.file.list(folder),function(id,f){
	        if(f._isfolder){ //TODO a recursive function
	            html += tab+`|-- <a data-file-id="${id}" title="${f.desc}" >${id} : </a>\n`
	            html += CV.cmd_sub_func.tree((folder?folder+"/":"")+id,level+1);
	        }else {
	            html += tab+`|-- <a data-file-id="${id}" title="${f.desc}" >${id}</a>\n`
	        }
	    })
        var n=html.lastIndexOf("|--");
        var n2=html.lastIndexOf("\\\`--");
        console.log(n,n2,html)
        if(n>n2){
            html = html.substring(0, n)+ `\\\`` + html.substring(n+1) ;
        }
        return html;
    }
}