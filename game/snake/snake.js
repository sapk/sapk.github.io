//TODO en général code à perfectionner
//TODO reread code and implement i18n and other stuff from new console interface

var snake = {
    "data" : {
        "nb_lignes" : 80,
        "nb_colonne" : 130,
        "cerise":{},
        "positions" : [{
            x:7,
            y:8
        },{
            x:6,
            y:8
        },{
            x:5,
            y:8
        }],
        "timing" : 100,
        "direction" : "right",
        "prev_direction" : "right",
        "time_start_pause": false,
        "time_to_remove":0,
        "cerise_eat" : 0,
        "score":0,
        "game_is_paused":false
    },
    "fnct" : {
        "start" : function(){
            snake.data.start_time = new Date();
            snake.data.nb_colonne = Math.floor(($(window).width()-30)/12);
            snake.data.nb_lignes = Math.floor(($(window).height()-60)/12);
            $("#console").css("height",$(window).height()-60+"px");
            snake.fnct.init_table();
            snake.fnct.draw_snake();
            snake.fnct.add_cerise();
            snake.data.timer=setInterval("snake.fnct.clock()", snake.data.timing);
        },
        "clock" : function(){
            var queue = snake.data.positions[snake.data.positions.length-1];
            var head = snake.data.positions[0];
            switch (snake.data.direction) {
                case "up":
                    var y = head.y-1;
                    var x = head.x;
                    break;
                case "down":
                    var y = head.y+1;
                    var x = head.x;
                    break;
                case "right":
                    var x = head.x+1;
                    var y = head.y;
                    break;
                case "left":
                    var x = head.x-1;
                    var y = head.y;
                    break;
                default:
                    break;
            }
            snake.data.prev_direction = snake.data.direction;
            x = x%snake.data.nb_colonne;
            y = y%snake.data.nb_lignes
            if (x==0)
                x=snake.data.nb_colonne
            if (y==0)
                y=snake.data.nb_lignes

            snake.data.positions.unshift({
                "x":x,
                "y":y
            });
            if($("#lgn_"+y+" #col_"+x+" div").attr("id") == "snake"){
                var currentTime = new Date();
                var dif = (currentTime.getTime()-snake.data.start_time.getTime()) - snake.data.time_to_remove;
                var mil = dif % 1000;
                dif = (dif - mil)/1000
                var sec = dif%60;
                dif = (dif - sec)/60;
                var min = dif%60;
                dif = (dif - min)/60;
                
                if (min<10){
                    min = "0"+min;
                }
                if (sec<10){
                    sec = "0"+sec;
                }
                
                alert("\
¤¤¤    GAME OVER !!!   ¤¤¤\n\
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤\n\
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤\n\
      SCORE : "+Math.floor(snake.data.score)+" points\n\
      TEMPS  : "+dif+":"+min+":"+sec+" \n\
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤");
                clearInterval(snake.data.timer);
                setInterval("window.location.reload()", 500);
            }
            else
                $("#lgn_"+y+" #col_"+x).html("<div id='snake'></div>");
            
            if(snake.data.cerise.x == x && snake.data.cerise.y == y){
                clearInterval(snake.data.timer);
                snake.data.cerise_eat++;
                snake.data.score = snake.data.score+15;
                $("#score").html(Math.floor(snake.data.score));
                if(snake.data.timing>0)
                    snake.data.timing--;
                console.log(snake.data.timing);
                snake.fnct.add_cerise();
                if(snake.data.cerise_eat%3 != 2){
                    snake.data.positions.pop()
                    $("#lgn_"+queue.y+" #col_"+queue.x).html("");
                }
                snake.data.timer=setInterval("snake.fnct.clock()", snake.data.timing);
            }
            else{
                snake.data.positions.pop()
                $("#lgn_"+queue.y+" #col_"+queue.x).html("");
                snake.data.score = snake.data.score+0.1;
                $("#score").html(Math.floor(snake.data.score));
            }
                
            
        },
        "init_table": function(){
            var h = "<center><table>";
            var l = "";
            for (i = 0; i < snake.data.nb_colonne; i++) {
                l += "<td id='col_"+(i+1)+"'></td>";
            }
            for (i = 0; i < snake.data.nb_lignes; i++) {
                h += "<tr id='lgn_"+(i+1)+"'>"+l+"</tr>";
            }
            h += "</table></center>";
            $("#console").html(h);
        },
        "draw_snake": function(){
            $("#snake").remove();
            for (var id in snake.data.positions) {
                var pos = snake.data.positions[id];
                $("#lgn_"+pos.y+" #col_"+pos.x).html("<div id='snake'></div>");
            }
        },
        "add_cerise": function(){
            var x = 0;
            while (x<1||x>snake.data.nb_colonne)
                x = Math.ceil(Math.random()* snake.data.nb_colonne);
            var y = 0;
            while (y<1||y>snake.data.nb_lignes)
                y = Math.ceil(Math.random()* snake.data.nb_lignes);
            snake.data.cerise = {
                "x":x,
                "y":y
            };
            console.log(snake.data.cerise);
            
            $("#lgn_"+y+" #col_"+x).html("<div id='cerise'></div>");
        }
    }
};
$(document).keydown(function(e) {
    //console.log("keyCode : "+e.keyCode);
    switch (e.keyCode) {
        case 38:
            if( snake.data.prev_direction != "down")
                snake.data.direction = "up";
            break;
        case 40:
            if( snake.data.prev_direction != "up")
                snake.data.direction = "down";
            break;
        case 37:
            if( snake.data.prev_direction != "right")
                snake.data.direction = "left";
            break;
        case 39:
            if( snake.data.prev_direction != "left")
                snake.data.direction = "right";
            break;
        case 82:
            window.location.reload();
            break;
        case 82:
            //TODO Controle musique par touche M
            break;
        case 107:
            //TODO Controle vit par touche +
            clearInterval(snake.data.timer);
            if(snake.data.timing>0)
                snake.data.timing--;
            console.log(snake.data.timing);
            snake.data.timer=setInterval("snake.fnct.clock()", snake.data.timing);
            break;
        case 109:
            //TODO Controle vit par touche -
            clearInterval(snake.data.timer);
            snake.data.timing++;
            console.log(snake.data.timing);
            snake.data.timer=setInterval("snake.fnct.clock()", snake.data.timing);
            break;
        case 32:
        case 80:
            if(snake.data.game_is_paused){
                snake.data.game_is_paused = false;
                var currentTime = new Date();
                snake.data.time_to_remove = (currentTime.getTime()-snake.data.time_start_pause.getTime()) + snake.data.time_to_remove;
                snake.data.timer=setInterval("snake.fnct.clock()", snake.data.timing);
            }
            else{
                snake.data.game_is_paused = true;
                snake.data.time_start_pause = new Date();
                clearInterval(snake.data.timer);
            }
            break;
        default:
            console.log("unknow keyCode : "+e.keyCode);
            break;
    }
});
$(document).ready(function() {
    snake.fnct.start();
});