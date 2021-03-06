/**
 * Created by Sundeep on 8/30/2015.
 */

function create(side,res){
    d3.selectAll('circle').remove();
    if((!res)||(typeof(res)!== "number")||res>0.1){
        res = 0.1;
    }
    var radius = side*res;
    var xMax  = parseInt(side/2);
    for(var x = radius;x<=xMax;x=x+radius){
        var ymin = parseInt(((-((x+3)*(x+3)*(x+3)))/((xMax+3)*(xMax+3)))+xMax);
        var ymax = parseInt(((((x+3)*(x+3)*(x+3)))/((xMax+3)*(xMax+3)))+xMax);
        for(var y = ymin;y<=ymax;y=y+radius){
            var r = parseInt(radius*Math.random());
            var sw = parseInt(radius*Math.random())+1;
            var f = 255*parseInt(Math.random()+0.25);
            var s = 255*parseInt(Math.random()+0.25);

            d3.select('svg')
                .append("circle")
                .attr("cx",x)
                .attr("cy",y)
                .attr("r",r)
                .attr("stroke-width",sw)
                .attr("fill",'rgb('+ f +','+ f + ','+ f + ')')
                .attr("fill-rule",'evenodd')
                .attr("stroke",'rgb('+ s +','+ s + ','+ s + ')');

            d3.select('svg')
                .append("circle")
                .attr("cx",side-x)
                .attr("cy",y)
                .attr("r",r)
                .attr("stroke-width",sw)
                .attr("fill",'rgb('+ f +','+ f + ','+ f + ')')
                .attr("fill-rule",'evenodd')
                .attr("stroke",'rgb('+ s +','+ s + ','+ s + ')');
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
    //setInterval(function(){create(side,res);},3000);
});