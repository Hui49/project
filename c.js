
var margin = {top: 20, right: 20, bottom: 50, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
     padding = 100;
var timeFormat = d3.time.format("%M:%S");
var yScale = d3.scale.linear().range([height, 0]).domain([-3,3]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

var ColorTable = ["#7A378B", "#2471A3", "#148F77", "#517693","#B7950B","#BA4A00","#A93226"];
var ColorTable1 = [["#884EA0  ", "#AF7AC5"], ["#1A5276", "#1F618D","#2471A3","#2980B9","#5499C7"],["#117864", "#138D75","#45B39D","#73C6B6","#A2D9CE"],["#9A7D0A","#B7950B","#D4AC0D","#F1C40F","#F9E79F"]];
seasons =["2016-2017","2015-2016","2014-2015","2013-2014"];
var competition = [["sa","fra"],["coc","nhk","gpf","national","wc"]];
var tooltipBox = d3.tip()
    .attr("id", "tooltipTxtBox")
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(function(d) {
        return "<span class='tooltip-txt'>Click to see game info</span>";
    });
var zoom = d3.behavior.zoom()
    .scaleExtent([1, 1000])
    .on("zoom", zoomed);


function init() {

    var node = d3.select('#xdropdown').node();
    var i = node.selectedIndex;
      var path = node[i].value;
    update(path);
    
   // calcPlayerStats();
    // playerImgInteraction();
    //gameScoreBarInteraction();
 
}


function zoomed() {
   d3.select("#scatterPlotVis svg").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}  

var isCircleSelected = false;
var numOfGameSelected = 0;
var numOfCompetitionSelected = 0;
var gamesSelectedPlayersPlayed = [];
var teamWinDatesArray = [];
var teamLossDatesArray = [];
var com = "";

var selectedCircle;
var selectedCompetition;

//var plusMinusColorTable = ["#3374DC", "#F26823", "#C9F013"];
//var starterReserveColorTable = ["#3498db", "#B359D8"];
//var playerPositionColorTable = ["#3374dc", "#f39c12", "#e74c3c", "#9b59b6"];
//var playerPositionColorTable = ["#3374dc", "#f39c12", "#e74c3c", "#9b59b6", "#66a61e"];
//var winLossColorTable = ["#3288bd", "#d53e4f", "#27ae60"];
//ColorTable = [["#3374dc", "#f39c12"],["#3288bd", "#d53e4f"],["#F26823", "#C9F013"]];
function update(path) {  
    //remove old graphics and set everything back to default
    d3.select("#scatterPlotVis svg").remove();
    
     $(".button2").click(function() {
    window.open("competitiondata.html");
    
    
    });
 


   
    path =path+".json";
    console.log(path);

  
d3.json(path, function(data) {


    var x_season = [];  

var seasonList=[];
        $(".button_season").click(function() {
           
               d3.select("#scatterPlotVis svg").remove();   
            var season = $(this).val();
      if (!$(this).hasClass("season-selected1")) {
                 x_season.push(season);
            $( this ).css("background-color", function(d) { 
       return ColorTable[seasons.indexOf(season)];}) 
                $(this).addClass("season-selected1");
      }
        else{
            $(this).removeClass("season-selected1");
           $( this).css("background-color", "#FFBF00");
            x_season.pop(season);
            
        }
            
var xd = [];  
 
var score=[];   
    data.forEach(function(d){

   if( $.inArray(d.season, x_season) != -1){
      if($.inArray(d.elements, xd) === -1){
         xd.push(d.elements);  }
         score.push(d.score);
        
   }
 });      
  
      console.log(score); 
     console.log(min);
    var min= d3.min(d3.values(score));
     var max=x= d3.max(d3.values(score));        

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
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 2)
    .attr("dy", ".35em")
    .attr("transform", "rotate(20)")
    .style("text-anchor", "start")
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
       .filter(function(d) { return  $.inArray(d.season, x_season) != -1 })
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) {return x(d.elements);})
      .attr("cy", function(d) { return yScale(d.score);})
      .style('fill',function(d) { 
        console.log(x_season.indexOf(d['season']));
        console.log(ColorTable[seasons.indexOf(d['season'])]);
       return ColorTable[seasons.indexOf(d['season'])];}) 
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
      .style("opacity",0.7)
                  .on("click", function(d) {
        
        d3.select(".circle-selected").classed("circle-selected",false);
        
          d3.select(this).attr("class", "circle-selected");
     
        draw_chart(d);
  
    });
      
     });  
    
    x_season_game=[];
    $(".button4").click(function() {
        
       
        $( ".button_season" ).each(function( d) {
  
      this.style.backgroundColor = "#FFBF00";
 $(this).removeClass("season-selected1");
  });
      
    d3.select("#scatterPlotVis svg").remove();                     
    //nameCompetition = $(this).val().split(" ")[1];
   // nameseason = $(this).val().split(" ")[0];
        x_season=[];
        x_competiton=[];
   
        sea= $(this).val();
      if (!$(this).hasClass("season-selected")) {
                
                  x_season_game.push(sea);
    
                $(this).addClass("season-selected");
      }
        else{
            $(this).removeClass("season-selected");
        
               x_season_game.pop(sea);
            
        }
    console.log(  x_season_game)  ;
            
var xd = [];  
 
var score=[];   

    data.forEach(function(d){
var season_game= d.season+" "+d.competition;
   if( $.inArray(season_game, x_season_game) != -1){
     if($.inArray(d.elements, xd) === -1){
         xd.push(d.elements);  }
         score.push(d.score);
       
   }
 });      
  
  
    var min= d3.min(d3.values(score));
     var max=x= d3.max(d3.values(score));        

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
       .filter(function(d) { 
        
        var season_game= d.season+" "+d.competition;
      return  $.inArray(season_game, x_season_game) != -1 ;})
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) {return x(d.elements);})
      .attr("cy", function(d) { return yScale(d.score);})
      .style('fill',function(d) { 
      
       return ColorTable1[seasons.indexOf(d['season'])][competition[seasons.indexOf(d['season'])].indexOf(d['competition'])];}) 
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
      .style("opacity",0.7)
      .on("click", function(d) {
        
        d3.select(".circle-selected").classed("circle-selected",false);
        
          d3.select(this).attr("class", "circle-selected");
     
        draw_chart(d);
  
    });
    
});  
    
                      
    

    });

}

function draw_chart(d){
    
    
     d3.select("#ChartVis svg").remove();
         var totalcount= [0,0]; 
        var postivecount= [0,0]; 
        var max = 0;
        var min = 0;
        var totalscore =  [0,0]; 
    var average= [0,0];
    var width=800;
    var height=150;
    d3.json("tes.json", function(data) {
       
        data.forEach(function(item){
            if (item['elements']==d['elements']){
              if (item['season']== "2015-2016")
              totalcount[0]=totalcount[0]+1; 
              totalscore[0]=totalscore[0]+item['score'];
                       if (item['season']== "2016-2017")
              totalcount[1]=totalcount[1]+1; 
              totalscore[1]=totalscore[1]+item['score']; 
                   if (item['score']>0){
                        postivecount[0]= postivecount[0]+1;
                   }
            }

        })
         if (totalcount[0]!=0){
           average[0]=totalscore[0]/totalcount[0];
        }
        else average[0]=0;
        if (totalcount[1]!=0){
           average[1]=totalscore[1]/totalcount[1];
        }
        else average[1]=0;
        if (average[0]>3){
           average[0]=3;
        }
        if (average[1]>3){
           average[1]=3;
        }
 
console.log(average);
            
 var ScoreChart = d3.select("#ChartVis").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //  ScoreChart.call(gameBarTooltip);
         
        var x1= d3.scale.ordinal()
              .domain(["2013-2014","2014-2015","2015-2016","2016-2017"])
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
      .text("season");
        
        ScoreChart.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("class", "label")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("score");
        
        var lineData = [
   { x: "2013-2014",
  y:   average[0]-0.5
}, {
  x: "2014-2015",
  y:   average[0]-0.25
},         
    
            {
  x: "2015-2016",
  y:   average[0]
}, {
  x: "2016-2017",
  y:   average[1]
}
  ];

        
    
    var lineFunc = d3.svg.line()
  .x(function(d) {
    return x1(d.x);
  })
  .y(function(d) {
    return y1(d.y);
  })
  .interpolate('linear');
    

   ScoreChart.append('path')
    .datum(lineData)
  .attr('d', lineFunc)
   .attr("id", function(d) {
    console.log(d);
        return d;
  })
 .style("stroke", function(d) {
    console.log(d);
        return "white";
  })
  .attr('stroke-width', 1)
  .attr('fill', 'none')
  .style('opacity', 1);
        
        
        
        
        
        

        
        
        
      })
    
    
    
    
}

