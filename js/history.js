var CV = CV || {};

CV.history = {
	max_length : 42,
    _current : 0,
    add : function(cmd){
        CV.history.cmds.push(cmd);
        if(CV.history.cmds.length > CV.history.max_length)
        	CV.history.cmds.shift()
        CV.history._current = CV.history.cmds.length;
        localStorage.cmds_history = JSON.stringify(CV.history.cmds);
    },
    current : function(){
    	if(CV.history._current<0)
	    	CV.history._current += CV.history.cmds.length;
    	//console.log(CV.history._current%CV.history.cmds.length);
        return CV.history._current%CV.history.cmds.length;
    },
    next : function(){
        CV.history._current++;
        return CV.history.cmds[CV.history.current()];
    },
    prev : function(){
        CV.history._current--;
        return CV.history.cmds[CV.history.current()];
    },
    list : function(){
      return CV.history.cmds;
    },
    count : function(){
      return CV.history.cmds.length;
    },
    reset : function(){
    	CV.history.cmds = [];
        localStorage.cmds_history = "[]";
    },
}


CV.history.cmds = JSON.parse(localStorage.cmds_history || "[]");
CV.history._current = CV.history.cmds.length;