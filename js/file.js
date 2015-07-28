var CV = CV || {};


//TODO choose better name to display + upload file + i18n
CV.file = {
    base_url : "files/", 
    _files : {
        "AntoineGIRARD.pdf" : { f : "AntoineGIRARD.pdf", desc : "CV in pdf format"},
        "AntoineGIRARD.vcf" : { f : "AntoineGIRARD.vcf", desc : "vCard"},
        "AntoineGIRARD.asc" : { f : "AntoineGIRARD.asc", desc : "Public key"}    
    },
    list : function(){
    	return CV.file._files;
      //return Object.keys(CV.file._files).sort()  
    },
    open : function(id){
        if(typeof CV.file._files[id] == "undefined")
	        return CV.console.log(CV.current_locale["file_not_found"]);
        var win = window.open(CV.file.base_url+CV.file._files[id].f, '_blank');
        win.focus();
    }
};

//$("#console").on("click","a[data-file-id]",CV.file.openlink);