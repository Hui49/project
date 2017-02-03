
var margin = {top: 20, right: 20, bottom: 50, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
     padding = 100;
var timeFormat = d3.time.format("%M:%S");

var color = d3.scale.category10();
var ColorTable = ["#7A378B", "#2471A3", "#148F77", "#517693","#B7950B","#BA4A00","#A93226"];
var ColorTable1 = ["#a569bd", "#5499C7  ", "#17A589", "#80A0B9","#D4AC0D","#DC7633","#CD6155"];

var tooltipBox = d3.tip()
    .attr("id", "tooltipTxtBox")
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(function(d) {
        return "<span class='tooltip-txt'>Click to see game info</span>";
    });
var gameBarTooltip = d3.tip()
    .attr("id", "gameBarTooltipBox")
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(function(d) {
        return "<span class='tooltip-txt'>Click to see game info</span>";
    });



function init() {
   // update();
     UpdateSkates();
   // calcPlayerStats();
    // playerImgInteraction();
    //gameScoreBarInteraction();
}


var isCircleSelected = false;
var numOfGameSelected = 0;
var numOfCompetitionSelected = 0;
var gamesSelectedPlayersPlayed = [];
var teamWinDatesArray = [];
var teamLossDatesArray = [];
var com = "";
function  UpdateSkates(){
      $("#women_butt").click(function() {  
        
       d3.select("#scatterPlotVis svg").remove();
        $( ".button butt_comp" ).remove();
        $(".skater_Panel").html(
            "<table>"+"<tr><td><button style='background-color:#7A378B' class='button butt_label' id='Mao'></button></td><td> <button class='button butt_ska' style='color:#ddd' id='Mao Asada' value='Mao Asada'>" +"Mao Asada" + "</button></td></tr>"+
                                "<tr><td><button class='button butt_label' style='background-color:#2471A3' id='ashely'></button></td><td><button class='button butt_ska' style='color:#ddd' id='Ashely Wagner' value='Ashely Wagner'>" + "Ashely Wagner" +"</button></td></tr>"+ "<tr><td><button class='button butt_label' style='background-color:#148F77' id='gracie'></button></td><td><button class='button butt_ska' style='color:#ddd' id='Gracie GOLD' value='Gracie GOLD'>" + "Gracie GOLD" + "</button></td></tr>" +
            
                                "<tr><td><button class='button butt_label'  style='background-color:#517693' id='mai'></button></td><td><button class='button butt_ska' style='color:#ddd' id='Mai MIHARA' value='Mai MIHARA'>" + "Mai MIHARA" + "</button></td></tr>"+
            "<tr><td><button class='button butt_label' style='background-color:#B7950B' id='Gabrielle'></button></td><td><button class='button butt_ska' style='color:#ddd' id='Mao Asada' value='Gabrielle DALEMAN''>" +"Gabrielle DALEMAN'" + "</button></td></tr>"+
            "<tr><td><button class='button butt_label' style='background-color:#BA4A00' id='Mariah'></button></td><td><button class='button butt_ska' style='color:#ddd' id='Mariah BELL' value='Mariah BELL'>" + "Mariah BELL" + "</button></td></tr>"+
                                
                                "</table>" );
          
        
      
        
        update("women");  
          
      });
      $("#men_butt").click(function() { 
        d3.select("#scatterPlotVis svg").remove();
        $( ".skater_butt" ).remove();
        $(".skater_Panel").html("<button class='button butt_ska' style='color:#ddd' value='Yuzuru Hanyu'>" + "Yuzuru Hanyu" + "</button>"+"<button class='button butt_ska' style='color:#ddd' value='Boyang Jing'>" + "Boyang Jing" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='Gabrielle DALEMAN' value='Gabrielle DALEMAN'>" + "Gabrielle DALEMAN" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='Roberta RODEGHIERO' value='Roberta RODEGHIERO'>" + "Roberta RODEGHIERO" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='Mai MIHARA' value='Mai MIHARA'>" + "Mai MIHARA" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='Kanako MURAKAMI' value='Kanako MURAKAMI'>" + "Kanako MURAKAMI" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='Angelina KUCHVALSKA' value='Angelina KUCHVALSKA'>" + "Angelina KUCHVALSKA" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='So Youn PARK' value='So Youn PARK'>" + "So Youn PARK" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='So Youn PARK' value='So Youn PARK'>" + "So Youn PARK" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='Serafima SAKHANOVICH' value='Serafima SAKHANOVICH'>" + "Serafima SAKHANOVICH" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='Mariah BELL' value='Mariah BELL'>" + "Mariah BELL" + "</button>"+"<button class='button butt_ska' style='color:#ddd' id='Gracie GOLD' value='Gracie GOLD'>" + "Gracie GOLD" + "</button>"); 
        update("women");  
      });
}

var selectedCircle;
var selectedCompetition;


var gameScoreBarHeight = 80;
var gameScoreBarWidth = 10;
var gameScoreBarY = d3.scale.linear()
    .range([height, 0]);


function update(path) { 
    //UpdateSkates();
    //remove old graphics and set everything back to default
// link to skater data
    $(".butt_label").click(function() {
    window.open("maoasada.html");
    
    
    });

    path=path+".json";
    console.log(path);
   var nameCompetition;
    console.log(com);


var x_name = [];  

var nameSkater=[];
d3.json(path, function(data) {
    
    $(".butt_ska").click(function() {
   
    d3.select("#scatterPlotVis svg").remove();   
      name = $(this).val();
    if (!$(this).hasClass("skater-selected")) {
        
        $(this).addClass("skater-selected");
         x_name.push(name);
    }
    else{
        $(this).removeClass("skater-selected");
         x_name.pop(name);
        }
       // console.log( x_name);
      var xd = [];  
        var max =0; 
        var score=[];   
    data.forEach(function(d){
 if($.inArray(d.name, nameSkater) === -1) 
nameSkater.push(d.name); 
   if( $.inArray(d.name, x_name) != -1){
      if($.inArray(d.elements, xd) === -1){
         xd.push(d.elements);  }
       score.push(d.score);
      if(d.score>max){
          max=d.score;      
      }   
   }

       

 });
console.log(xd);
    console.log(max);
     var min= d3.min(d3.values(score));
 //create svg       
var x = d3.scale.ordinal()
    .domain(xd)
    .rangePoints([0, width]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10);
        
        
var yScale = d3.scale.linear().range([height, 0]).domain([min,max]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
        
        
var scatterPlot = d3.select("#scatterPlotVis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var selectedCircle= [ ];   
 scatterPlot.call(tooltipBox);

 scatterPlot.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("elements");
        
  // y-axis
  scatterPlot.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("score");
     
 
    scatterPlot.selectAll(".dot")
      .data(data)
    .enter().append("circle")
       .filter(function(d) { return  $.inArray(d.name, x_name) != -1 })
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) {return x(d.elements);})
      .attr("cy", function(d) { return yScale(d.score);})
       .style("fill", function(d) {
        var colors;
        console.log(nameSkater);
        if(d.program=="lp"){
        colors=ColorTable;    
    }
        else{colors=ColorTable1}
        return colors[nameSkater.indexOf(d.name)];}) 
      .on("mouseover", function(d) {
                         console.log(d.elements);
                         tooltipBox.html("<span class='tooltipHeader'>" + d['score'] + "</span></br>" + "<span class='tooltip-row-name'>Element: </span><span class='tooltip-opponent'>" + d['elements'] + "</span></br> "+"<span class='tooltip-row-name'>Competition: </span><span class='tooltip-opponent'>" + d['season'] +" " +d['competition']+ "</span></br> " );
                        tooltipBox.show();
                        // console.log("mouse over: ");
                        // console.log(d);
                        
                    })   
      .on("mouseout", function(d) {
                        tooltipBox.hide();    
                    })
      .style("opacity",1)
      .on("click", function(d) {
        
        var lineid= "line"+d.id;
     
        if(d3.select(this).attr('class')!= "circle-selected"){
          d3.select("#"+lineid).style('opacity', 1);
        d3.select(this).attr("class", "circle-selected");
            selectedCircle.push(d.id);
        }
        else{d3.select(this).classed("circle-selected",false);
             d3.select("#"+lineid).style('opacity', 0);
            selectedCircle.pop(d.id);}
        console.log(selectedCircle);
        
        d3.select("#ChartVis svg").remove();
        
         var ScoreChart = d3.select("#ChartVis").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
           ScoreChart.call(gameBarTooltip);
          var x1= d3.scale.ordinal()
              .domain(["J1","J2","J3","J4","J5","J6","J7","J8","J9"])
               .rangePoints([0, width]);
       
              var y1= d3.scale.linear()
            .range([height, 0])
             .domain([-3, 3]);
        
        
        var yAxis1 = d3.svg.axis()
            .ticks(8)
            .scale(y1)
            .orient("left");
       
      var xAxis1 = d3.svg.axis()
               .scale(x1)
           .orient("bottom");
            ScoreChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis1)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Judges");
        
        ScoreChart.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("score");
       
        
        data.forEach(function(d){


if($.inArray(d.id, selectedCircle) != -1){
 
var lineData = [{
  x: "J1",
  y: d["J1"]
}, {
  x: "J2",
  y: d["J2"]
},{
  x: "J3",
  y: d["J3"]
},
{
  x: "J4",
  y: d["J4"]
},{
  x: "J5",
  y: d["J5"]
},
{
  x: "J6",
  y: d["J6"]
},
{
  x: "J7",
  y: d["J7"]
},{
  x: "J8",
  y: d["J8"]
},{
  x: "J9",
  y: d["J9"]
} ];
        
      // var  score =[d.J1,d.J2,d.J3,d.J4,d.J5,d.J6,d.J7,d.J8,d.J9]
   
var lineFunc = d3.svg.line()
  .x(function(d) {
    return x1(d.x);
  })
  .y(function(d) {
    return y1(d.y);
  })
  .interpolate('linear');
    
    ScoreChart.append('path')
  .attr('d', lineFunc(lineData))
  .attr("id", "line"+d["id"])
  .attr('stroke', function() { 
        var colors;
        console.log(nameSkater);
        if(d['program']=="lp"){
        colors=ColorTable;    
    }
        else{colors=ColorTable1}
        return colors[nameSkater.indexOf(d['name'])];}) 
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .style('opacity', 1);
    
   
    ScoreChart.selectAll(".Scoredot"+d["id"])
    .data(lineData)
    .enter().append("circle")
      .attr("class", (".Scoredot"+d["id"]))
      .attr("r", 3)
      .attr("cx", function(d) {console.log(d.x); return x1(d.x);})
      .attr("cy", function(d) { console.log(d.y); return y1(d.y);})
       .style('opacity', 1)
    .style('fill',function() { 
        var colors;
        console.log(nameSkater);
        if(d['program']=="lp"){
        colors=ColorTable;    
    }
        else{colors=ColorTable1}
        return colors[nameSkater.indexOf(d['name'])];}) 
        .on("mouseover", function(d) {
                         console.log(d.elements);
                         gameBarTooltip.html("<span class='tooltipHeader'>" + d.y + "</span></br>" + "<span class='tooltip-row-name'>Judge: </span><span class='tooltip-opponent'>" + d.x + "</span></br>" );
                        gameBarTooltip.show();
                        // console.log("mouse over: ");
                        // console.log(d);
                        
                    })   
      .on("mouseout", function(d) {
                        gameBarTooltip.hide();    
                    })
       .on("click", function(item) {
       console.log("line"+d["name"]);
                    //  updateButtonColors(d3.select(this), d3.select(this.parentNode))
                               window.open("Judge2.html");
                            
        
        
     ///
     });
        
}
   
 })
//container for all buttons

        
        
   
       
        
        
        
        

     /* .on("mouseover", function(d) {
                         console.log(d.elements);
                        
                         gameBarTooltip.html("<span class='tooltipHeader'>" + d.x + "</span></br>" + "<span class='tooltip-row-name'>Judge: </span><span class='tooltip-opponent'>" +  d.y+ "</span></br>" );
                        gameBarTooltip.show();
                       
                     
                    })   
      .on("mouseout", function(d) {
                       gameBarTooltip.hide();    
                    });
*/
 
    });
 
        
   
  


});
});
        }