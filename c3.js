
var margin = {top: 20, right: 20, bottom: 50, left: 40},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
     padding = 100;
var timeFormat = d3.time.format("%M:%S");
var yScale = d3.scale.linear().range([height, 0]).domain([6,10]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
var color = d3.scale.category10();
var ColorTable = ["#81F7BE", "#f39c12", "#e74c3c", "#9b59b6","#F3F781","#0B610B","#088A85","#819FF7"];
var nameJudge = '';
//var nameSkater =[ "Shoma UNO", "Adam RIPPON", "Jason BROWN", "Nam NGUYEN", "Sergei VORONOV", "Timothy DOLENSKY" ]; 
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
     update();
    // UpdateSkates();
   // calcPlayerStats();
    // playerImgInteraction();
    //gameScoreBarInteraction();
}
function zoomed() {
   d3.select("#scatterPlotVis svg").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}  



function update() { 
    //UpdateSkates();
    //remove old graphics and set everything back to default
   
   $(".butt_Judge").click(function() {
        d3.select("#scatterPlotVis svg").remove();
            nameJudge = $(this).val();
        $(".butt_Judge").removeClass("skater-selected");
        $(this).addClass("skater-selected");
       //console.log(nameJudge);
     
path=nameJudge+".json";
console.log(nameJudge);
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
    
 scatterPlot.call(tooltipBox);
     scatterPlot.call(zoom);
    var rect = scatterPlot.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");
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
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) {console.log(d.elements); return x(d.elements);})
      .attr("cy", function(d) { console.log(d.score); return yScale(d.score);})
      .style("fill", function(d) { 
        //console.log(nameSkater);
        return ColorTable[nameSkater.indexOf(d.name)];}) 
      .on("mouseover", function(d) {
                         console.log(d.elements);
                        
                       
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
                    })
    
      .on("click", function(d) {
          //$(".circle-selected").empty;
         // d3.select(this).style("fill","white");
         //$(".circle-selected").empty();
      // $(".dot").removeAttr( "class" );
        // d3.selectAll(".dot").attr("class", "circle-notselected");
         d3.select(this).attr("class", "circle-selected");
              $("#playerStatsRight").html("<span class='tooltipHeader' style='color:#ddd'>" + d.competition + "</span>"
                                +"<span class='score details' style='color:#ddd'>" + d.J1+ "</span>");
          
          
         console.log(d.J1);
        
    
    });
    //@@@delete
  
     var scatterPlotLegend = scatterPlot.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(0," + (height+40) + ")");
        
        var legendOffset = 100;
        scatterPlotLegend.selectAll(".legend-circle-winloss")
                .data(nameSkater)
            .enter().append("circle")
                .attr("class", "legend-circle-winloss")
                .attr("r", 6)
                .attr("fill", function(d, i) { return ColorTable[i]; })
                .attr("transform", function(d, i) { return "translate(" + (width - legendOffset * (i+1)) + ", 0)"; })
                .on("click", function(d, i) {
       
                    var name1=nameSkater[i];
                   var doy= d3.selectAll(".dot").filter(function(data) {
                        if(data.name == name1) {
                            console.log("hui");
                            //gamesSelectedPlayersPlayed.push(d.Date);
                            return true;
                        }
                    });
             if(d3.select(this).attr('class')!= "circle-selected"){
               doy.style("opacity", 0.8);
        d3.select(this).attr("class", "circle-selected");
        
        
        }
        else{d3.select(this).classed("circle-selected",false);
            doy.style("opacity", 0.2);}
            
            
         var totalcount=0; 
        var generaltotal=0;
        var generalcount=0;
        var postivecount=0;
        var max = 0;
       var min=0;
        var totalscore = 0;
     var  min= data[0]['score'];
        data.forEach(function(item){
             generalcount=generalcount+1;
            generaltotal=item['score']+generaltotal;
            if (item['name']==name1){
             
              totalcount=totalcount+1; 
              totalscore=totalscore+item['score'];
                   if (item['score']>max){
                       max=item['score'];
                   }
                
                if (item['score']<min){
                      var min=item['score'];
                   }
                
             //console.log(count);
            }
           //console.log(count);
        })
        console.log(max);
        
     $(".container").html("<div class='playerStatsRight' >"+"<span class='tooltipHeader'>" + name1 + "</span></br>" +"<span class='tooltip-row-name'>avarage: </span><span class='tooltip-opponent'>"+totalscore/totalcount+ "</span><span class='tooltip-row-name'> general avarage: </span><span class='tooltip-opponent'>"+generaltotal/generalcount+"</span> </br>"+"<span class='tooltip-row-name'>Max: </span><span class='tooltip-opponent'>"+max+ "</span></br> "+"<span class='tooltip-row-name'>Min: </span><span class='tooltip-opponent'>"+min+ "</span></br></div> ");
        
        
        
        
        })
        
            
      /*  scatterPlotLegend.selectAll(".legend-text-winloss")
                .data(ColorTable)
            .enter().append("text")
                .attr("class", "legend-text-winloss")
                .attr("r", 6)
                .attr("dx", "1em")
                    .attr("dy", "0.4em")
                    .attr("fill", "#888")
                    .attr("transform", function(d, i) { return "translate(" + (width - legendOffset * (i+1)) + ", 0)"; })
                    .text(function(d, i) {
                     return nameSkater[i];
                    });*/

    

    $(".skater_butt").click(function() {
            nameskater = $(this).val();
    if (!$(this).hasClass("skater-selected")) {
                $(this).addClass("skater-selected");
       d3.selectAll(".dot").filter(function(d) {
                        if(d.name == nameskater) {
                            
                            //gamesSelectedPlayersPlayed.push(d.Date);
                            return true;
                        }
                    }).style("opacity", 0.9);}
        else{
            $(this).removeClass("skater-selected");
              d3.selectAll(".dot").filter(function(d) {
                        if(d.name == nameskater) {
                            
                            //gamesSelectedPlayersPlayed.push(d.Date);
                            return true;
                        }
                    }).style("opacity", 0.1);
        }
    
        console.log(nameskater);
     
   
     });  
    
                    
});
    //create svg canvas
  
    //loading data
    
 });   
                      
    

}

