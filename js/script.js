var CV = CV || {};

        	$(function(){
        		//Definition de variable globale
        		CV.console = $("#console");
        		$("#console #input").html(`${CV.current_locale["prompt"]} <input type="text">`);
        		CV.input = $("#console input");

				CV.console.add = function(text) { 
        			CV.input.parent().before(`<pre id="line-${CV.console.find('pre').length}" >${text}</pre>`); //TODO réfléchir si l'id est utile'
        		    //CV.input.focus(); //to go down
        		    CV.console[0].scrollTo(0, CV.console.height());
				};
				
        		//on focus la console au démarrage
        		CV.input.val("").removeAttr("disabled").focus();
        		
        		//Ajout de l'event enterKeyPress
				CV.input.keypress(function(e) {
    			    var keyCode = e.keyCode || e.which; 
    
                    //TODO add keyup and down for history
                    switch(keyCode){
                        case 13 :  //enter ke is press
        			        $(this).trigger("enterKeyPress");
        			    break;
        			    case 9 : //TAB kay
        			        //TODO if it is already a command pass to the next
        			        e.preventDefault();
        			        if($(this).val().trim().length > 0){
            			        var str=$(this).val().toLowerCase();
            			        var cmds=Object.keys(CV.cmd)
            			         console.log(str,cmds)
            			        if(cmds.indexOf(str)!= -1){
            			            cmds.splice(cmds.indexOf(str), 1);
            			            str=CV.input.attr("data-tab");
            			        }
            			        console.log(str,cmds)
                        	    for (var j=0; j<cmds.length; j++) {
                        	        if (cmds[j].toLowerCase().startsWith(str)) {
                        	            CV.input.attr("data-tab",str)
                        	            $(this).val(cmds[j]);
                        	            break;
                        	        }
                        	    }
        			        }
        			    break;
                    }
				});
				//Si l'on a validé la saisi on cherche la comamnde et on l'execute
        		CV.input.on("enterKeyPress",function(){
        		    window.console.log(CV)
        		    var exe = $(this).val().replace(/\s+/g,' ').split(" ");
        			window.console.log("Commande saisie :",exe,typeof CV.cmd[exe[0]]);
        			CV.input.attr("disabled","disabled");
        			CV.console.add(`${CV.current_locale["prompt"]} ${$(this).val()}`);
        			if(typeof CV.cmd[exe[0]] == "function"){
        				window.console.log("Execution de :",exe[0],CV.cmd[exe[0]]);
        				CV.cmd[exe.shift()](exe);
        			}else if (exe[0].length >= 1) {
        				//On cherche les resemblance
        				var result = CV.tool.searchStringInArray(exe[0],Object.keys(CV.cmd));
        				if(result == -1){
        					CV.console.add(`${CV.current_locale["command_not_found"]}`);
        				}else{
        					CV.console.add(`${CV.current_locale["command_not_found_maybe"]} : ${result}`);
        				}
        			}
        			CV.input.removeAttr("disabled");
        			CV.input.val("").focus();
        		});
        		
        		$("#console").on("click", function(){
        		    var themes = ["ubuntu","hacker","red","normal"]
        		    CV.input.focus();
        		    var i = (themes.indexOf(CV.console.attr("data-theme"))+1)%themes.length
        		    console.log(i,themes[i])
        		    CV.console.attr("data-theme",themes[i])
        		    //TODO change them color
        		})
        	})
