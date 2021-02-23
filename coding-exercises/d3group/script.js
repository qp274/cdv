
let svg1 = d3.select('#day1')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg1')
    .attr('class', 'svg')
    .attr('width', 160)
    .attr('height', 400)
;

let svg2 = d3.select('#day2')
  .append('svg') //viz2 = this svgS
    .attr('x',180)
    .attr('y', 0)
    .attr('id', 'svg2')
    .attr('class', 'svg')
    .attr('width', 160)
    .attr('height', 400)
;


function split(data, category, title) {
  let newarray = [];
  for (i=0; i< data.length;i++) {
    if (data[i][category] == title)
    newarray.push(data[i]);
    // console.log(data[i][title]);
  }
  return newarray;
}


function gotData(data){   // this function expects to be passed data
  categorizeByDay(data);
  day1point(day1data);
  day2point(day2data)
  // seriousness(data);
}

function randomTranslate(d, i){
  // let x = Math.floor(Math.random() * 121) + 20  ;
  let x = 80;
  // let y = Math.floor(Math.random() * 361) + 20  ;
  let y = 40 + 65*i;
  return "translate(" + x + "," + y + ")";
}



function categorizeByDay(data) {
  day1data = split(data, 'day','day 1');
  console.log('day1', day1data);
  day2data = split(data, 'day','day 2');
    console.log('day2', day2data);
}

function day1point(data) {
  let day1group = svg1.selectAll(".day1point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day1point')

  multiplecircle(data, day1group)

  day1group.append('circle')
      .attr('r',20)
      .attr('fill', 'green')
      .attr('opacity', 0.2)

  day1group.append('line')
      .attr('stroke', 'red')
      .attr('x1',0)
      .attr('y1',0)
      .attr('x2',0)
      .attr('y2',length)
      .attr('stroke-width',5)
      .attr('opacity',0.6)


  day1group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
      .attr('cx',2)


  day1group.attr('transform', randomTranslate)

}

function day2point(data) {
  let day2group = svg2.selectAll(".day2point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day2point')
  day2group.append('circle')
      .attr('r',20)
      .attr('fill', 'green')
      .attr('opacity', 0.2)

  multiplecircle(data, day2group)
  day2group.append('line')
      .attr('stroke', 'red')
      .attr('stroke-width',5)
      .attr('opacity',0.6)
      .attr('x1',0)
      .attr('y1',0)
      .attr('x2',0)
      .attr('y2',length)

  day2group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
      .attr('cx', 3)


  day2group.attr('transform', randomTranslate)

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

function length(p) {
  return p['noticable']*10 + 12
}

function multiplecircle(data, group) {
  for (i=0; i< data.length; i++) {
    for (j=0; j<= data[i]['seriousness']; j++) {
      let radius = 15*j
      console.log(i,j, radius)
      group.append('circle')
          .attr('r', radius)
          .attr('fill', 'green')
          .attr('opacity', 0.1)
          .attr('cx', j*2)
    }
  }
}


d3.json("data.json").then(gotData);
