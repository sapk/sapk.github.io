var CV = CV || {};

        	$(function(){
        		//Definition de variable globale
        		CV.console = $("#console");
        		CV.input = $("#console input");
        		
				CV.console.add = function(text) { 
        			CV.input.parent().before(`<pre id="line-${CV.console.find('pre').length}" >${text}</pre>`); //TODO réfléchir si l'id est utile'
				};
				
        		//on focus la console au démarrage
        		CV.input.val("").removeAttr("disabled").focus();
        		
        		//Ajout de l'event enterKeyPress
				CV.input.keypress(function(e) {
    			    var keyCode = e.keyCode || e.which; 
    
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
        		    var exe = $(this).val().split(" ");
        			window.console.log("Commande saisie :",exe,typeof CV.cmd[exe[0]]);
        			CV.input.attr("disabled","disabled");
        			CV.console.add(`visitor@sapk.github.io ~ $ ${$(this).val()}`);
        			if(typeof CV.cmd[exe[0]] == "function"){
        				window.console.log("Execution de :",exe[0],CV.cmd[exe[0]]);
        				CV.cmd[exe.shift()](exe);
        			}else if (exe[0].length >= 1) {
        				//On cherche les resemblance
        				var result = CV.tool.searchStringInArray(exe[0],Object.keys(CV.cmd));
        				if(result == -1){
        					CV.console.add(`command not found`);
        				}else{
        					CV.console.add(`command not found maybe you want to use : ${result}`);
        				}
        			}
        			CV.input.removeAttr("disabled");
        			CV.input.val("").focus();
        		});
        		
        		$("#console").on("click", function(){
        		    CV.input.focus();
        		})
        	})
