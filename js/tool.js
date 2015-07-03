var CV = CV || {};

CV.tool = {
	searchStringInArray : function (str, strArray) {
	   	str=str.toLowerCase();
	    for (var j=0; j<strArray.length; j++) {
	        if (strArray[j].toLowerCase().match(str)) return strArray[j];
	    }
	    return -1;
    }
}
