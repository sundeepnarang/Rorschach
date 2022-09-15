/**
 * Created by Sundeep on 8/30/2015.
 */

var colorMode = 0
var colorModeMap = {
    0: "B/W",
    1: "B/R/W",
    2: "Left Color",
    3: "Right Color",
    4: "Same Color All",
    5: "Diff Left/Right Color"
}

function create(side,res){
    d3.selectAll('circle').remove();
    if((!res)||(typeof(res)!== "number")||res>0.1){
        res = 0.1;
    }
    var f, s, f1, f2, f3, s1, s2, s3, g1, g2, g3, t1, t2, t3;
    var radius = side*res;
    var xMax  = parseInt(side/2);
    for(var x = radius;x<=xMax;x=x+radius){
        var ymin = parseInt(((-((x+3)*(x+3)*(x+3)))/((xMax+3)*(xMax+3)))+xMax);
        var ymax = parseInt(((((x+3)*(x+3)*(x+3)))/((xMax+3)*(xMax+3)))+xMax);
        for(var y = ymin;y<=ymax;y=y+radius){
            var r = parseInt(radius*Math.random());
            var sw = parseInt(radius*Math.random())+1;
            switch(colorMode){
                case 0: {
                    f = 255 * parseInt(Math.random() + 0.25);
                    s = 255 * parseInt(Math.random() + 0.25);
                    f1 = f2 = f3 = g1 = g2 = g3 = f
                    s1 = s2 = s3 = t1 = t2 = t3 = s
                }
                break;
                case 1: {
                    g1 = f1 = 255 * parseInt(Math.random() + 0.25);
                    t1 = s1 = 255 * parseInt(Math.random() + 0.25);
                    if(f1===0){
                        f = 0
                    } else {
                        f = 255 * parseInt(Math.random() + 0.25);
                    }
                    if(s1===0){
                        s = 0
                    } else {
                        s = 255 * parseInt(Math.random() + 0.25);
                    }
                    f2 = f3 = g2 = g3 = f
                    s2 = s3 = t2 = t3 = s
                }
                break;
                case 2: {
                    f1 = parseInt(255 * Math.random());
                    f2 = parseInt(255 * Math.random());
                    f3 = parseInt(255 * Math.random());
                    s1 = parseInt(255 * Math.random());
                    s2 = parseInt(255 * Math.random());
                    s3 = parseInt(255 * Math.random());
                    f = 255 * parseInt(Math.random() + 0.25);
                    s = 255 * parseInt(Math.random() + 0.25);
                    g1 = g2 = g3 = f
                    t1 = t2 = t3 = s
                }
                break;
                case 3: {
                    g1 = parseInt(255 * Math.random());
                    g2 = parseInt(255 * Math.random());
                    g3 = parseInt(255 * Math.random());
                    t1 = parseInt(255 * Math.random());
                    t2 = parseInt(255 * Math.random());
                    t3 = parseInt(255 * Math.random());
                    f = 255 * parseInt(Math.random() + 0.25);
                    s = 255 * parseInt(Math.random() + 0.25);
                    f1 = f2 = f3 = f
                    s1 = s2 = s3 = s
                }
                break;
                case 4: {
                    f1 = g1 = parseInt(255 * Math.random());
                    f2 = g2 = parseInt(255 * Math.random());
                    f3 = g3 = parseInt(255 * Math.random());
                    s1 = t1 = parseInt(255 * Math.random());
                    s2 = t2 = parseInt(255 * Math.random());
                    s3 = t3 = parseInt(255 * Math.random());
                }
                break;
                case 5: {
                    f1 = parseInt(255 * Math.random());
                    f2 = parseInt(255 * Math.random());
                    f3 = parseInt(255 * Math.random());
                    s1 = parseInt(255 * Math.random());
                    s2 = parseInt(255 * Math.random());
                    s3 = parseInt(255 * Math.random());
                    g1 = parseInt(255 * Math.random());
                    g2 = parseInt(255 * Math.random());
                    g3 = parseInt(255 * Math.random());
                    t1 = parseInt(255 * Math.random());
                    t2 = parseInt(255 * Math.random());
                    t3 = parseInt(255 * Math.random());
                }
                break;
            }

            d3.select('svg')
                .append("circle")
                .attr("cx",x)
                .attr("cy",y)
                .attr("r",r)
                .attr("stroke-width",sw)
                .attr("fill",'rgb('+ f1 +','+ f2 + ','+ f3 + ')')
                .attr("fill-rule",'evenodd')
                .attr("stroke",'rgb('+ s1 +','+ s2 + ','+ s3 + ')');

            d3.select('svg')
                .append("circle")
                .attr("cx",side-x)
                .attr("cy",y)
                .attr("r",r)
                .attr("stroke-width",sw)
                .attr("fill",'rgb('+ g1 +','+ g2 + ','+ g3 + ')')
                .attr("fill-rule",'evenodd')
                .attr("stroke",'rgb('+ t1 +','+ t2 + ','+ t3 + ')');
        }
    }
}

$(function () {
    var side = 750;
    var res = 0.05;
    var interval;
    d3.select('svg').attr("width",side).attr("height",side);
    create(side,res);
    $("button#next").click(function () {
        clearInterval(interval);
        create(side,res);
    });
    $("button#play").click(function () {
        clearInterval(interval);
        interval = setInterval(function(){create(side,res);},3000);
    });
    $("button#pause").click(function () {
        clearInterval(interval);
    });
    $("button#color").click(function () {
        colorMode = colorMode +1
        if(colorMode == 6){
            colorMode = 0
        }
        $("#colormode").text(colorModeMap[colorMode])
        create(side,res);
    });
    //setInterval(function(){create(side,res);},3000);
});