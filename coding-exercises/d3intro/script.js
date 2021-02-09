


let svg2 = d3.select('#container2')
  .append('svg') //viz2 = this svgS
    .attr('x',1000)
    .attr('y', 500)
    .attr('id', 'viz2')
    .attr('class', 'svg')
    .attr('width', 1200)
    .attr('height', 600)
;

function randompos(point) {
  // console.log(point);
  p = Math.random(0.1,1)*300 +80
  return p;
}

function triy(point){
  p =  Math.random(0.2,1)*300 +130
  return p
}
function radius(point) {
  // console.log(point);
  return point*10
}

function point(p){
  return p
}

function split(data, title) {
  let newarray = [];
  for (i=0; i< data.length;i++) {
    newarray.push(data[i][title]);
    // console.log(data[i][title]);
  }
  // console.log(newarray)
  return newarray;
}

function recty(point) {
  p = Math.random(0,0.6)*400
  return p
}

function rectx(point) {
  p = 280-0.5*radius(point)
  return p
}

function ry(point) {
  ry=radius(point)*.4
  return ry
}

function fsize(point) {
  return point*50
}

function gotData(data){   // this function expects to be passed data
  traffic(data);
  misplace(data);
  smoking(data);
  trespassing(data);
}


function traffic(data) {
  trafficdata = split(data,'trafficLight');
  console.log(trafficdata);
  svg2.selectAll('circle').data(trafficdata).enter()
    .append('circle')
        .attr('r', radius)
        .attr('cx', 100)
        .attr('cy', randompos)
        .attr('fill', '#F56000')
        .attr("opacity", .5)
        .attr('stroke', '#60F552')
        .attr('stroke-width', 10)
  ;
}

function misplace(data) {
  misplaceata = split(data,'misplacement');
  console.log(misplaceata);
  svg2.selectAll('rect').data(misplaceata).enter()
    .append('rect')
        .attr('width', radius)
        .attr('height', radius)
        .attr('x', rectx)
        .attr('y', randompos)
        .attr('fill', 'blue')
        .attr("opacity", .5)
        .attr('stroke', 'red')
        .attr('stroke-width', 6)
  ;
}

function smoking(data) {
  smokingdata = split(data,'smoking');
  console.log(smokingdata );
  svg2.selectAll('ellipse').data(smokingdata).enter()
    .append('ellipse')
        .attr('rx', ry)
        .attr('ry', radius)
        .attr('cx', 500)
        .attr('cy', randompos)
        .attr('fill', '#5FF545')
        .attr("opacity", .5)
        .attr('stroke', '#F522E0')
        .attr('stroke-width', 9)

  ;
}

function trespassing(data) {
  trespassingdata = split(data,'trespassing');
  svg2.selectAll('text').data(trespassingdata).enter()
    .append('text')
        .attr('x', 600)
        .attr('y', triy)
        .attr('fill', 'yellow')
        .attr("opacity", .5)
        .attr('font-size', fsize)
        .attr('paint-order','stroke')
        .attr('stroke', '#224AF5')
        .attr('stroke-width', 15)
        .text('▲')

  ;
}
d3.json("data.json").then(gotData)
