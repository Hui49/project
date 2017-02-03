
var margin = {top: 20, right: 20, bottom: 50, left: 40},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
     padding = 100;
var timeFormat = d3.time.format("%M:%S");
var yScale = d3.scale.linear().range([height, 0]).domain([6,10]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
var color = d3.scale.category10();
var ColorTable_Judge = ["#81F7BE", "#f39c12", "#e74c3c", "#9b59b6","#F3F781","#0B610B","#088A85","#819FF7"];
var ColorTable1 = ["#a569bd", "#5499C7  ", "#17A589", "#80A0B9","#D4AC0D","#DC7633","#CD6155"];
var nameJudge_genaral=["Cynthia BENSON", "Lisa JELINEK", "Maira ABASOVA", "Franco BENINI","Tianyi ZHANGI","Yuri GUSKOV"]; 

var nameSkater_genaral=[ "Shoma UNO", "Adam RIPPON", "Jason BROWN", "Nam NGUYEN", "Sergei VORONOV", "Timothy DOLENSKY" ]; 
var tooltipBox = d3.tip()
    .attr("id", "tooltipTxtBox")
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(function(d) {
        return "<span class='tooltip-txt'>Click to see game info</span>";
    });

function init() {
     update();
   
}



function update() { 
    //UpdateSkates();
    //remove old graphics and set everything back to default
   name_Judges=[];
    name_Skater=[];
   $(".butt_Judge").click(function() {
    
    d3.select("#scatterPlotVis svg").remove();
            nameJudge = $(this).val();
       if (!$(this).hasClass("Judge-selected")) {
        
        $(this).addClass("Judge-selected");
        name_Judges.push(nameJudge);
    }
    else{
        $(this).removeClass("Judge-selected");
         name_Judges.pop(nameJudge);
        }
      
   
       draw(name_Judges,name_Skater);
         
  

   });
       
 $(".butt_ska").click(function() {
            
       d3.select("#scatterPlotVis svg").remove();
            nameSkater = $(this).val();
       if (!$(this).hasClass("skater-selected")) {
        
        $(this).addClass("skater-selected");
        name_Skater.push(nameSkater );
      
           
        
    }
    else{
        $(this).removeClass("skater-selected");
       name_Skater.pop(nameSkater );
          $( this ).css("background-color", "white");
        }
     
 
               draw(name_Judges,name_Skater);
         });  

}


function draw(judges,skaters){
     d3.selectAll(".butt_Judge")
          .style("background-color", "white");  
        d3.selectAll(".butt_ska")
          .style("background-color", "white");  
    
         d3.selectAll(".skater-selected")
          .style("background-color", function( ) { 
        return ColorTable1[nameSkater_genaral.indexOf($(this).val())];}); 
       d3.selectAll(".Judge-selected")
          .style("background-color", function( ) { 
        return ColorTable_Judge[nameJudge_genaral.indexOf($(this).val())];}); 

       
        
    if (judges.length==1 && skaters.length==0){
        
         d3.selectAll(".butt_ska")
          .filter(function( ) { return $.inArray($(this).val(), nameSkater_genaral) != -1;})
          .style("background-color", function( ) { 
       
        return ColorTable1[nameSkater_genaral.indexOf($(this).val())];}) 
        path="Cynthia BENSON"+".json";
        
        

var xd = [];  
var nameSkater=[];
d3.json(path, function(data) {
          
data.forEach(function(d){

//console.log(d.elements);
if($.inArray(d.elements, xd) === -1) 
xd.push(d.elements); 
 if($.inArray(d.name, nameSkater) === -1) 
nameSkater.push(d.name); 
   
 })
//var seasonData = data.filter(function(d){ console.log( d.season == nameSeason );
 // return d.season == nameSeason  });   

var x = d3.scale.ordinal()
    .domain(xd)
    .rangePoints([0, width]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  
var scatterPlot = d3.select("#scatterPlotVis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
 //scatterPlot.call(tooltipBox);


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
    .enter().append("circle").filter(function(d) { return  d.judge ==judges[0]; })
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) { return x(d.elements);})
      .attr("cy", function(d) { return yScale(d.score);})
      .style("fill", function(d) { 
        //console.log(nameSkater);
        return ColorTable1[nameSkater_genaral.indexOf(d.name)];}) 
      .on("mouseover", function(d) {
                        // console.log(d.elements);
                        
                       
                         tooltipBox.html("<span class='tooltipHeader'>" + d['name'] + "</span></br>" + "<span class='tooltip-row-name'>Competition: </span><span class='tooltip-opponent'>" + d['season'] +" " +d['competition']  + "</span></br>" );
                        tooltipBox.show();
                        // console.log("mouse over: ");
                        // console.log(d);
                        var id = "#"+d.name;
                      console.log(id);
                     
                      
                      $(".skater_butt").css("background-color", "yellow");   
                    })   
      .on("mouseout", function(d) {
                        tooltipBox.hide();    
                    });
       
  
   
    
 });
    }
    

    
    
if (judges.length >0 && skaters.length ==1 ){
        
 path="Cynthia BENSON"+".json";

var xd = [];  
var nameSkater=[];
d3.json(path, function(data) {
          


      var xd = [];  
     
        var score=[]; 
    var lineData = {};
    data.forEach(function(d){
       // console.log("hi");
              console.log(judges);
      console.log(d.judge);
     
  if($.inArray(d.judge, judges) != -1) {
   
  
      
      if($.inArray(d.name, skaters) === -1) {


      if($.inArray(d.elements, xd) === -1){
         xd.push(d.elements);  }
       score.push(d.score);
    
        }
      }      

});
//var seasonData = data.filter(function(d){ console.log( d.season == nameSeason );
 // return d.season == nameSeason  });   
 var min= d3.min(d3.values(score));
     var max= d3.max(d3.values(score));
    console.log(min);
     console.log(max);
var x = d3.scale.ordinal()
    .domain(xd)
    .rangePoints([0, width]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
var yScale = d3.scale.linear().range([height, 0]).domain([6,10]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
  
var scatterPlot = d3.select("#scatterPlotVis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
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
     .filter(function(d) { return  $.inArray(d.name,skaters) != -1 && $.inArray(d.judge,judges) != -1 })
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) { return x(d.elements);})
      .attr("cy", function(d) {  return yScale(d.score);})
    .style("fill",function(d) { 
        console.log(d.judge);
       return ColorTable_Judge[nameJudge_genaral.indexOf(d.judge)];}) 
    .style('opacity', 0.6)
      .on("mouseover", function(d) {
                         console.log(d.elements);
                    
                         tooltipBox.html("<span class='tooltipHeader'>" + d['name'] + "</span></br>" + "<span class='tooltip-row-name'>Competition: </span><span class='tooltip-opponent'>" + d['season'] +" " +d['competition']  + "</span></br>" );
                        tooltipBox.show();
                        // console.log("mouse over: ");
                        // console.log(d);
                        var id = "#"+d.name;
                      console.log(id);
                     
                    
                    })   
      .on("mouseout", function(d) {
                        tooltipBox.hide();    
                    });
    
    
 //////   
    var lineFunc = d3.svg.line()
  .x(function(d) {
    return x(d.elements);
  })
  .y(function(d) {
    return yScale(d.score);
  })
  .interpolate('linear');
    
    var linedata=data.filter(function(d) { console.log("iam hero"); return  $.inArray(d.name,skaters) != -1 && $.inArray(d.judge,judges) != -1 });
    
    
    
    scatterPlot.append('path')
  .attr('d', lineFunc)
 .style("stroke", "white")
  .attr('stroke-width', 1)
  .attr('fill', 'none')
  .style('opacity', 0.6);
    

    

    
        
 });
    
    }
    
    
        
    if (judges.length ==1 && skaters.length>1){
             
     
 path="Cynthia BENSON"+".json";

var xd = [];  
var nameSkater=[];
d3.json(path, function(data) {
          


      var xd = [];  
     
        var score=[];   
    data.forEach(function(d){
       // console.log("hi");
              console.log(judges);
      console.log(d.judge);
     
  if($.inArray(d.judge, judges) === -1) {
      console.log("itsss");
  
      
      if($.inArray(d.name, skaters) === -1) {

        console.log("ijisisi"); 
      if($.inArray(d.elements, xd) === -1){
         xd.push(d.elements);  }
       score.push(d.score);
    
        }
      }      

});
//var seasonData = data.filter(function(d){ console.log( d.season == nameSeason );
 // return d.season == nameSeason  });   
 var min= d3.min(d3.values(score));
     var max= d3.max(d3.values(score));
    console.log(min);
     console.log(max);
var x = d3.scale.ordinal()
    .domain(xd)
    .rangePoints([0, width]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
var yScale = d3.scale.linear().range([height, 0]).domain([6,10]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
  
var scatterPlot = d3.select("#scatterPlotVis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
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
     .filter(function(d) { return  $.inArray(d.name,skaters) != -1 && $.inArray(d.judge,judges) != -1 })
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) { return x(d.elements);})
      .attr("cy", function(d) {  
        return yScale(d.score);})
      .style("fill",function(d) { 
       return ColorTable1[nameSkater_genaral.indexOf(d.name)];}) 
      .on("mouseover", function(d) {
                         console.log(d.elements);
                    
                         tooltipBox.html("<span class='tooltipHeader'>" + d['name'] + "</span></br>" + "<span class='tooltip-row-name'>Competition: </span><span class='tooltip-opponent'>" + d['season'] +" " +d['competition']  + "</span></br>" );
                        tooltipBox.show();
                        // console.log("mouse over: ");
                        // console.log(d);
                        var id = "#"+d.name;
                      console.log(id);
                     
                    
                    })   
      .on("mouseout", function(d) {
                        tooltipBox.hide();    
                    });
        
 });
    }
    

    else{
         d3.select("#scatterPlotVis svg").remove();
        console.log("deleterall");
    }

 
}
    

    
    
    
    
    


