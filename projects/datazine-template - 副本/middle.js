let w = 1200;
let w2 = 2400;
let h = 800;

let boxw = 250;
let boxh = 340;

let innerboxw = 230;
let innerboxh = boxh;

function split(data, category, title) {
  let newarray = [];
  for (i=0; i< data.length;i++) {
    if (data[i][category] == title)
    newarray.push(data[i]);
    // console.log(data[i][title]);
  }
  return newarray;
}

let svg1 = d3.select('#day1')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg1')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

let svg2 = d3.select('#day2')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg2')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

let svg3 = d3.select('#day3')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg3')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

let svg4 = d3.select('#day4')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg4')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

let svg5 = d3.select('#day5')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg5')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

let svg6 = d3.select('#day6')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg6')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

let svg7 = d3.select('#day7')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg7')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

let svg8 = d3.select('#day8')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg8')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

let svg9 = d3.select('#day9')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg9')
    .attr('class', 'svg')
    .attr('width', boxw)
    .attr('height', boxh)
;

function categorizeByDay(data) {
  day1data = split(data, 'day','day 1');
  console.log('day1', day1data);
  day2data = split(data, 'day','day 2');
  console.log('day2', day2data);
  day3data = split(data, 'day','day 3');
  console.log('day3', day3data);
  day4data = split(data, 'day','day 4');
  console.log('day4', day4data);
  day5data = split(data, 'day','day 5');
  console.log('day5', day5data);
  day6data = split(data, 'day','day 6');
  console.log('day6', day6data);
  day7data = split(data, 'day','day 7');
  console.log('day7', day7data);
  day8data = split(data, 'day','day 8');
  console.log('day8', day8data);
  day9data = split(data, 'day','day 9');
  console.log('day9', day9data);
}



function day1point(data) {

  //background circles
  backgroundcircle(svg1);

  //define foreground groups
  let day1group = svg1.selectAll(".day1point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day1point')
  ;
  // multiple circles
  day1group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day1group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day1group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day1group.append('text')
      .text(function(d,i){
        return (i+1)
      })
      .attr("fill", "red")
  ;


  day1group.attr('transform', randomTranslate)


}


function day2point(data) {

  //background circles
  backgroundcircle(svg2);

  //define foreground groups
  let day2group = svg2.selectAll(".day2point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day2point')
  ;
  // multiple circles
  day2group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day2group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day2group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day2group.append('text')
      .text(function(d,i){
        return (i+1+4)
      })
      .attr("fill", "red")
  ;


  day2group.attr('transform', randomTranslate)


}


function day3point(data) {

  //background circles
  backgroundcircle(svg3);

  //define foreground groups
  let day3group = svg3.selectAll(".day3point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day3point')
  ;
  // multiple circles
  day3group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day3group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day3group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day3group.append('text')
      .text(function(d,i){
        return (i+1+11)
      })
      .attr("fill", "red")
  ;


  day3group.attr('transform', randomTranslate)


}


function day4point(data) {

  //background circles
  backgroundcircle(svg4);

  //define foreground groups
  let day4group = svg4.selectAll(".day4point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day4point')
  ;
  // multiple circles
  day4group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day4group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day4group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day4group.append('text')
      .text(function(d,i){
        return (i+1+15)
      })
      .attr("fill", "red")
  ;


  day4group.attr('transform', randomTranslate)


}


function day5point(data) {

  //background circles
  backgroundcircle(svg5);

  //define foreground groups
  let day5group = svg5.selectAll(".day5point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day5point')
  ;
  // multiple circles
  day5group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day5group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day5group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day5group.append('text')
      .text(function(d,i){
        return (i+1+21)
      })
      .attr("fill", "red")
  ;


  day5group.attr('transform', randomTranslate)


}


function day6point(data) {

  //background circles
  backgroundcircle(svg6);

  //define foreground groups
  let day6group = svg6.selectAll(".day6point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day6point')
  ;
  // multiple circles
  day6group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day6group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day6group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day6group.append('text')
      .text(function(d,i){
        return (i+1+26)
      })
      .attr("fill", "red")
  ;


  day6group.attr('transform', randomTranslate)


}


function day7point(data) {

  //background circles
  backgroundcircle(svg7);

  //define foreground groups
  let day7group = svg7.selectAll(".day7point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day7point')
  ;
  // multiple circles
  day7group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day7group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day7group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day7group.append('text')
      .text(function(d,i){
        return (i+1+32)
      })
      .attr("fill", "red")
  ;


  day7group.attr('transform', randomTranslate)


}


function day8point(data) {

  //background circles
  backgroundcircle(svg8);

  //define foreground groups
  let day8group = svg8.selectAll(".day8point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day8point')
  ;
  // multiple circles
  day8group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day8group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day8group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day8group.append('text')
      .text(function(d,i){
        return (i+1+39)
      })
      .attr("fill", "red")
  ;


  day8group.attr('transform', randomTranslate)


}


function day9point(data) {

  //background circles
  backgroundcircle(svg9);

  //define foreground groups
  let day9group = svg9.selectAll(".day9point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day9point')
  ;
  // multiple circles
  day9group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+2) * 10;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day9group.append('circle')
      .attr('r',16)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

//center dot
  day9group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day9group.append('text')
      .text(function(d,i){
        return (i+1+43)
      })
      .attr("fill", "red")
  ;


  day9group.attr('transform', randomTranslate)


}



function backgroundcircle(svgi) {
  let row = svgi.selectAll('.row').data(d3.range(10))
    .enter()
      .append('g')
      .attr('class', 'row')

  row.selectAll('.rowcircle').data(d3.range(6)).enter()
    .append('circle')
      .attr('class','rowcircle')
      .attr('fill', 'grey')
      .attr('opacity', 0.2)
      .attr('r', 16)
      .attr('cx',function(d,i){
        return i*36+18
      })
      .attr('cy',20)
  row.attr('transform',function(d,i){
    return "translate(" + 15 + "," + i*33 + ")"
  })
}

function typecolor(p) {
  if (p['resist'] == 'convention') {
    return 'yellow';
  }
  if (p['resist'] == 'authority') {
    return 'red';
  }
  if (p['resist'] == 'control') {
    return 'blue';
  }
}

function checking(d, i) {
  return d3.range(d.noticable);
}

function randomTranslate(d, i){
  // let x = Math.floor(Math.random() * 121) + 20  ;
  let x =(d.xaxis+1)/5*(boxw-50);
  // let y = Math.floor(Math.random() * 361) + 20  ;
  let y = boxh-(d.yaxis+1)/5*(boxh-100);
  return "translate(" + x + "," + y + ")";
}

function gotData(data) {
  categorizeByDay(data);
  console.log(data);
  day1point(day1data);
  day2point(day2data);
  day3point(day3data);
  day4point(day4data);
  day5point(day5data);
  day6point(day6data);
  day7point(day7data);
  day8point(day8data);
  day9point(day9data);
}

d3.json("data.json").then(gotData);
