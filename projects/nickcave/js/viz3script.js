ypadding = 50;
xpadding = 250;

w3 = 900;
h3 = 600;
console.log('viz3script loaded');
let viz3 = d3.select('.viz3').append("svg")
    .attr('width', w3)
    .attr('height', h3)
    // .attr('x',0)
    // .attr('y',0)
    .attr('id','svg3')
    // .style('background-color','blue')
;
// let axisLayer = viz3.append("g")
// let gridLayer = viz3.append("g")
// let graphL:Layer =

function gotData(incomingData) {
  console.log('allscore',incomingData);

////////////////////////////////////y axis/////////////////////////////////
  let allNames = incomingData.map(function(d){return d.album});
  console.log(allNames);

  let yScale = d3.scaleBand()
      .domain(allNames)
      .range([ypadding, h3-ypadding])
      // .paddingInner(0.1)
  ;
  let yAxis = d3.axisLeft(yScale);

  let yAxisGroup = viz3.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding)+","+0+")")
  ;
  yAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);

  yAxisGroup.call(yAxis);


////////////////////////////x axis/////////////////////////////////////////
  let scoreMax = d3.max(incomingData, function(d){
    return d.score;
  })
  let scoreMin = d3.min(incomingData, function(d){
    return d.score;
  })
  let xDomain = [scoreMin, scoreMax];
  let xScale = d3.scaleLinear().domain(xDomain).range([xpadding, w3-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz3.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h3-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);


//////////////////////////colorscale///////////////////////////////
  let colorScale = d3.scaleLinear().domain(xDomain).range(["red","blue"]);





///////////////////////////creating grid lines//////////////////////////////
function make_x_gridlines() {
    return d3.axisBottom(xScale)
        .ticks(7)
}

function make_y_gridlines() {
    return d3.axisLeft(yScale)
        .ticks(17)
}
function zeroline(){
  return d3.axisBottom(xScale)
      .ticks(1)
}
  viz3.append("g")
      .attr("class", "grid")
      // .attr("transform", "translate("+(xpadding/2+200)+",-160)")
      .attr("transform", "translate(0,"+(h3-ypadding)+")")


      .call(make_x_gridlines()
          .tickSize(-(h3-2*ypadding))
          .tickFormat("")
      )
  ;
  viz3.append("g")
      .attr("class", "zerogrid")
      // .attr("transform", "translate("+(xpadding/2+200)+",-160)")
      .attr("transform", "translate(0,"+(h3-ypadding)+")")

      .style('stroke','black')
      .call(zeroline()
          .tickSize(-(h3-2*ypadding))
          .tickFormat("")
      )
  ;

  viz3.append("g")
      .attr("class", "grid")
      .attr("transform", "translate("+(xpadding)+","+0+")")
      .call(make_y_gridlines()
          .tickSize(-(w3-2*xpadding))
          .tickFormat("")
      )
  ;


  /////////////////////////////////drawing line/////////////////////////////////
  let graphGroup = viz3.append('g').attr("class", "graphGroup");
  let lineMaker = d3.line().curve(d3.curveCatmullRom)
      .x(function(d){
        return xScale(d.score)

      })
      .y(function(d){

        return yScale(d.album) + (yScale.bandwidth()/2)
      })
  ;
  graphGroup.selectAll('.curveline').data([incomingData]).enter()
      .append('path')
        .attr('d',lineMaker)
        .attr('fill', "none")
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr("class", "curveline")
  ;
  graphGroup.selectAll('.point').data(incomingData).enter()
      .append('circle')
      .attr('cx',function(d){
        return xScale(d.score)
      })
      .attr('cy',function(d){
        return yScale(d.album) + (yScale.bandwidth()/2)
      })
      .attr('r',4)
      .attr('fill',function(d,i){
        return colorScale(d.score)
      })
      .attr('stroke','black')
      .attr('class','point')
//   graphGroup.attr("transform", "translate(260,-160)");
//
//


}

d3.json("allscore.json").then(gotData);
