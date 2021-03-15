console.log("hi");
//data from https://towardsdatascience.com/how-to-build-animated-charts-like-hans-rosling-doing-it-all-in-r-570efc6ba382

let w = 1200;
let h = 800;
let xPadding = 50;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "grey")
;


function gotData(incomingData){
  console.log(incomingData);

  // min max fertility rate (for xScale)
  let fertExtent = d3.extent(incomingData, function(d, i){
    return d.fert;
  });
  console.log("fertExtent", fertExtent);

  // make the xscale which we use to locate points along the xaxis
  let xScale = d3.scaleLinear().domain(fertExtent).range([xPadding, w-xPadding]);


  // min max life expectancy
  let lifeExtent = d3.extent(incomingData, function(d, i){
    return d.life;
  });
  console.log("lifeExtent", lifeExtent);

  // make the yscale which we use to locate points along the yaxis
  let yScale = d3.scaleLinear().domain(lifeExtent).range([h-yPadding, yPadding]);

  // using the function defined at the bottom of this script to build two axis
  buildXAndYAxis(xScale, yScale);


  // min max Population
  let popExtent = d3.extent(incomingData, function(d, i){
    return d.pop;
  });
  console.log("popExtent", popExtent);
  // you may use this scale to define a radius for the circles
  let rScale = d3.scaleLinear().domain(popExtent).range([5, 50]);




  // the simple out put of this complicated bit of code,
  // is an array of all the years the data talks about.
  // the "dates" array looks like:
  // ["1962", "1963", "1964", "1965", ... , "2012", "2013", "2014", "2015"]
  let dates = incomingData.reduce(function(acc,d,i){
    if(!acc.includes(d.year)){
      acc.push(d.year)
    }
    return acc
  }, [])

  console.log("dates", dates);

  // this block of code is needed to select a subsection of the data (by year)
  let currentYearIndex = 0;
  let currentYear = dates[currentYearIndex];
  function filterYear(d, i){
    if(d.year == currentYear){
      return true;
    }else{
      return false;
    }
  }


  function getGroupLocation(d,i) {
    let x = xScale(d.fert)
    let y = yScale(d.life)
    return "translate(" + x +"," + y + ")"
  }

  function getIncomingGroupLocation(d,i) {
    let x = xScale(d.fert)
    let y = -30
    return "translate(" + x +"," + y + ")"
  }

  function colorfunc(d,i) {
    if (d.continent == 'Asia') {
      return 'red'
    }
    if (d.continent == 'Europe') {
      return 'lightgreen'
    }
    if (d.continent == 'Africa') {
      return 'blue'
    }
    if (d.continent == 'Americas') {
      return 'orange'
    }
    if (d.continent == 'Oceania') {
      return 'pink'
    }

  }








  // make a group for all things visualization:
  let vizGroup = viz.append("g").attr("class", "vizGroup");


  // this function is called every second.
  // inside it is a data variable that always carries the "latest" data of a new year
  // inside it we want to draw shapes and deal wirth both updating and entering element.
  function drawViz(){

    let currentYearData = incomingData.filter(filterYear);
    console.log("---\nthe currentYearData array now carries the data for year", currentYear);


    // Below here is where your coding should take place! learn from lab 6:
    // https://github.com/leoneckert/critical-data-and-visualization-spring-2020/tree/master/labs/lab-6
    // the three steps in the comments below help you to know what to aim for here

    // bind currentYearData to elements
    function assignKeys(d,i) {
      return d.Country
    }

    function assignid(d,i) {
      return '#'+d.Country
    }

    let datagroups = vizGroup.selectAll('.datagroups').data(currentYearData, assignKeys);


    // take care of entering elements
    let enteringElements = datagroups.enter()
      .append('g')
        .attr('class', 'datagroups')
    ;

    enteringElements.append('circle')
      .attr('r', function(d,i){
        return rScale(d.pop)
      })
      .attr('opacity', 0.4)
      .attr('fill', colorfunc)
      .attr('id', assignKeys)
    ;

    enteringElements.append('text')
      .text(function(d,i){
        return d.Country
      })
      .attr('opacity', 1)
      .attr('font-size', '10px')
      .attr('fill',colorfunc)
      .attr('x',0)
      .attr('y',0)
      .on('mouseover', function(d,i){
        radius= rScale(d.pop)
        d3.select(this)
        .attr('font-size', '32px')
        .attr('stroke','darkgrey')
        .attr('stroke-width', '0.4px');
        // d3.select(this).append('circle').attr('r', radius).attr('id', 'ring').attr('fill',colorfunc).attr('opacity',1)
        // d3.select(assignid).attr('opacity', 1);
      })
      .on('mouseout', function(d,i){
        d3.select(this)
        .attr('font-size', '10px')
        .attr('stroke',colorfunc)
        .attr('stroke-width', 0)

      })
    ;




    enteringElements.transition('transform', getIncomingGroupLocation).attr('transform',getGroupLocation);



    // take care of updating elements
    datagroups.select('circle')
      .attr('r', function(d,i){
        return rScale(d.pop)
      })
    ;
    datagroups.transition().duration(1000).attr('transform', getGroupLocation);








  }




  // this puts the YEAR onto the visualization
  let year = viz.append("text")
      .text("")
      .attr("x", 100)
      .attr("y", h-100)
      .attr("font-family", "sans-serif")
      .attr("font-size", "2.7em")

  ;

  // this called the drawViz function every second
  // and changes the year of interest
  // and updates the text element that displays the year.
  setInterval(function(){
    currentYearIndex++;
    if(currentYearIndex>dates.length){
      currentYearIndex = 0;
    }
    currentYear = dates[currentYearIndex];
    year.text(currentYear)
    drawViz();
  }, 1000);
}


// load data
d3.csv("data.csv").then(gotData);





// function to build x anc y axis.
// the only reasons these are down here is to make the code above look less polluted

function buildXAndYAxis(xScale, yScale){
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0, "+ (h-yPadding) +")")
  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate("+w/2+", 40)")
    .append("text")
    .attr("fill", "black")
    .text("fertility")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

  ;

  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")

  yAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(-33, "+h/2+") rotate(-90)")
    .append("text")
    .attr("fill", "black")
    .text("life expectancy")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

  ;
}
