var CV = CV || {};

CV.input =  {
    _el :  null,
    set : function(){ //Permit to change lang and reset el
        $("#console #input").html(`${CV.current_locale["prompt"]} <input type="text">`);
        CV.input._el = $("#console input");
        CV.input._el.width(($(document).width()-CV.input._el.offset().left-42)+"px")
        //console.log(CV.input);
        //console.log($.extend(CV.input, CV.input._el));
        //console.log(CV.input);
    },
    init : function() {
        CV.input.set();
        //on focus la console au démarrage
        CV.input._el.val("").removeAttr("disabled").focus();
    	//Ajout de l'event enterKeyPress
		CV.input._el.keypress(function(e) {
                //console.log(e)
    		    var keyCode = e.keyCode || e.which; 
                //TODO add keyup and down for history
                switch(keyCode){
                        case 38 :  //UP key is press
                            $(this).val(CV.history.prev())
        			    break;
                        case 40 :  //DOWN key is press
                            $(this).val(CV.history.next())
        			    break;
                        case 13 :  //enter key is press
        			        $(this).trigger("enterKeyPress");
        			    break;
        			    case 9 : //TAB kay
        			        //TODO if it is already a command pass to the next
        			        e.preventDefault();
        			        if($(this).val().trim().length > 0){
            			        var str=$(this).val().toLowerCase();
            			        var cmds=Object.keys(CV.cmd)
            			         window.console.log(str,cmds)
            			        if(cmds.indexOf(str)!= -1){
            			            cmds.splice(cmds.indexOf(str), 1);
            			            str=$(this).attr("data-tab");
            			        }
            			        window.console.log(str,cmds)
                        	    for (var j=0; j<cmds.length; j++) {
                        	        if (cmds[j].toLowerCase().startsWith(str)) {
                        	            $(this).attr("data-tab",str)
                        	            $(this).val(cmds[j]);
                        	            break;
                        	        }
                        	    }
        			        }
        			    break;
                }
	    });
		
		//Si l'on a validé la saisi on cherche la comamnde et on l'execute
        CV.input._el.on("enterKeyPress",function(){
        	    window.console.log(CV)
        	    var exe = $(this).val().replace(/\s+/g,' ').split(" ");
        		window.console.log("Commande saisie :",exe,typeof CV.cmd[exe[0]]);
        		$(this).attr("disabled","disabled");
        		CV.console.log(`${CV.current_locale["prompt"]} ${$(this).val()}`);
        		if(typeof CV.cmd[exe[0]] == "function"){
        				window.console.log("Execution de :",exe[0],CV.cmd[exe[0]]);
        				CV.cmd[exe.shift()](exe);
        				CV.history.add($(this).val());
        		}else if (exe[0].length >= 1) {
        				//On cherche les resemblance
        				var result = CV.tool.searchStringInArray(exe[0],Object.keys(CV.cmd));
        				if(result == -1){
        					CV.console.log(`${CV.current_locale["command_not_found"]}`);
        				}else{
        					CV.console.log(`${CV.current_locale["command_not_found_maybe"]} : ${result}`);
        				}
        		}
        		$(this).removeAttr("disabled");
        		$(this).val("").focus();
        });
    }
};


CV.input.init()	