var CV = CV || {};

CV.tool = {
	searchStringInArray : function (str, strArray) {
	   	str=str.toLowerCase();
	    for (var j=0; j<strArray.length; j++) {
	        if (strArray[j].toLowerCase().match(str)) return strArray[j];
	    }
	    return -1;
    },
    cleanFolderArgs : function (args) {
	    console.log(args);
	    while(args.indexOf("")>-1){
	        //do cleaning of empty string
	        args.splice(args.indexOf(""), 1);
	    }
	    console.log(args);
	    while(args.indexOf("*")>-1){
	        //We replace * by all folder
	        var index = args.indexOf("*");
	        args.splice(index, 1);
		    $.each(Object.keys(CV.file._files).sort().reverse(),function(i,folder){
		       args.splice(index, 0,folder);
		    });
	    }
	    console.log(args);
	    return args;
    },
    listAllFiles : function(folder){
        folder=folder?folder:CV.file._files;
        var ret = {};
        $.each(folder,function(id,obj){
            if(obj._isfolder){
               $.extend(ret, CV.tool.listAllFiles(obj));
            }
            //if(obj.url)
            ret[id] = obj;
        });
        return ret;
    }
}