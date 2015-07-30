var CV = CV || {};


//TODO choose better name to display + upload file + i18n
CV.file = {
    base_url : "files/", 
    _files : {
    	"Documents" : {
	        "AntoineGIRARD.pdf" : { url : "AntoineGIRARD.pdf", desc : "CV in pdf format"},
	        "AntoineGIRARD.vcf" : { url : "AntoineGIRARD.vcf", desc : "vCard"},
	        "AntoineGIRARD.asc" : { url : "AntoineGIRARD.asc", desc : "Public key"},
        	_isfolder : true
    	},
        "Compétences" : { 
	        "Langues" : { 
        		"Anglais" : { desc : "Niveau B2 / TOEIC 940"},
        		"Espagnol" : { desc : "Niveau A1"},
	        	_isfolder : true
    		}, 
	        "Programation" : { 
        		"PHP" : { desc : ""},
        		"JavaScript" : { desc : ""},
        		"GoLang" : { desc : ""},
        		"SQL" : { desc : "Structured Database"},
        		"JAVA" : { desc : ""},
        		"Android" : { desc : ""},
        		"C++" : { desc : ""},
	        	_isfolder : true
    		},
        	_isfolder : true
        }//TODO support i18n
    },
    list : function(folder){
    	console.log(folder, typeof folder,CV.file._files[folder], typeof CV.file._files[folder]);
    	var filelist = CV.file.getFolder(folder)
    	/*
    	var ret = {".":{desc : "Root"}} //TODO better and determine if .. or desc of .
    	if(typeof folder == "string"){ 
    		if( typeof CV.file._files[folder] != "undefined" && CV.file._files[folder]._isfolder){
    		filelist=CV.file._files[folder];
    		ret = {".":{desc : folder}}
	    	} else {
	    		//CV.console.log(CV.current_locale["folder_not_found"]); //TODO better fine
	    		return {"folder_not_found":{desc : CV.current_locale["folder_not_found"]}}; //TODo finish it
	    	}
    	}
    	*/
    	//return (["." : {},".." : {},]).concat(CV.file._files);
    	var ret = {};
    	if(typeof filelist == "object"){ 
	    	$.each(Object.keys(filelist).sort(),function(id,name){
	    		if(!name.startsWith("_"))
	    			ret[name] = filelist[name]; //TODO better
	    	});
    	}else{
    		return {"folder_not_found":{desc : CV.current_locale["folder_not_found"]}};
    	}
    	console.log(filelist,ret);
    	return ret
      
    },
    getFolder : function(folder){    	
        if(typeof folder == "string"){
            f = CV.file._files;
            $.each(folder.replace("\\", "/").replace(/^\/+|\/+$/g,'').split('/'),function(lvl,folder_name){
            	if(folder_name.trim()=="")
            		return;
                f = f[folder_name];
            });
            console.log(f);
            return f?$.extend({".":{desc : folder}},f):undefined;
        }else{
            return $.extend({".":{desc : "Root"}},CV.file._files);
        }
    },
    open : function(id){
    	var files=CV.tool.listAllFiles();
    	if(id == "folder_not_found")
    		return;
        if(typeof files[id] == "undefined")
	        return CV.console.log(CV.current_locale["file_not_found"]);
	    if(typeof files[id].url != "undefined"){ // If the file as a url 
        	var win = window.open(CV.file.base_url+files[id].url, '_blank');
    	 	win.focus();
    	} else {
    		//TODO dertermine if necessary
    	}
    }
};

//$("#console").on("click","a[data-file-id]",CV.file.openlink);