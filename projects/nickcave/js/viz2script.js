console.log('viz2 script loaded');

left = 190;
right = 30;
w2 = 900;
h2 = 1600;
blockheight = 12;
let viz2 = d3.select('.viz2')
    .append('svg')
    .attr('width',w2)
    .attr('height',h2+600)
    // .style('background-color','lavender')
;
let viz4 = d3.select('.viz4')
    .append('svg')
    .attr('width',1200)
    .attr('height',300)
    // .style('background-color','lightgrey')
;

// let viz5 = d3.select('.stretcher')
//     .append('svg')
//     .attr('x',0)
//     .attr('y',0)
//     .attr('width',900)
//     .attr('height',500)
//     .style('background-color','lightgrey')
// ;
d3.json("wordcount.json").then(function(incomingData){
  console.log("data2",incomingData);
  let entiregraphgroup = viz2.append('g').attr('class','entiregraphgroup');
  entiregraphgroup.attr('transform',function(d,i){
    x=0;
    y=0;
    return "translate("+x+","+y+")"
  })
  ;
  ///////////////album data y axis left//////////////////
  let albumnestMaker = d3.nest().key(function(d){ return d.album });
  let databyalbum = albumnestMaker.entries(incomingData);
  let albumlist = databyalbum.map(function(d){return d.key});
  console.log('album',databyalbum)

  let albumScale = d3.scaleBand()
      .domain(albumlist)
      .range([padding, h2-padding])
      // .call(wrap, x.rangeBand());
      // .paddingInner(0.1)
  ;
  let albumAxis = d3.axisLeft(albumScale);
  let albumAxisGroup = entiregraphgroup.append("g").attr("class", "xaxis albumaxis");

  albumAxisGroup.attr("transform", "translate("+(left)+","+0+")");
  albumAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);

  albumAxisGroup.call(albumAxis);

  //////////////////////count x axis bottom/////////////////////////
  countmax = 53;
  countmin = 0;
  let countdomain = [countmin, countmax];

  let countScale = d3.scaleLinear().domain(countdomain).range([left, w-right]);
  let countAxis = d3.axisBottom(countScale);
  let countAxisGroup = entiregraphgroup.append("g")
      .attr("class", "countaxisgroup")
      .attr("transform", "translate("+0+","+(h2-padding)+")")
  ;
  countAxisGroup.call(countAxis);
///////////////////////////color scale///////////////////////////
  let keyword = ['Lord/Jesus','mercy','pray','babe/baby','pain','blood','fuck/fucking/fucker/motherfucker','die/death/dead'];

  let keyworddomain = ['Lord/lord/jesus/Jesus','babe/baby','fuck/fucking/fuckin/fucker/motherfucker','die/death/dead'];

  let wordcolorScale = d3.scaleOrdinal().domain(keyworddomain).range(['#fc6d6d','#E01219','#bf0000','#612527']);


//////////////////////////////////////////////

let eachalbumgroup = entiregraphgroup.selectAll(".datagroup").data(incomingData).enter()
  .append("g")
  .classed("eachalbumgroup", true)
;

let innerblock = eachalbumgroup.selectAll('.eachword').data(function(d){
  console.log('d.wordcount',d.wordcount)
  return d.wordcount
}).enter()
  .append('g')
    .attr('class','eachword')
  ;


let rect=innerblock.append('rect')
    .attr('x',0)
    .attr('y',0)
    .attr('height',blockheight)
    .attr('width',function(d,i){
      // if (d.count == 0) {
      //   return none
      // }else{
      //   return countScale(d.count)-left
      // }
      return countScale(d.count)-left
    })
    .attr('transform', function(d,i){
      let x = 0;
      let y = (i-2)*blockheight;

      return  "translate("+x+","+y+")"
    })
    .attr('fill',function(d,i){
      // if (d.count==0){
      //   return none
      // }else{
      //
      // }
      return wordcolorScale(d.word)
    })

let numlabel = entiregraphgroup.append('text')
;
  innerblock.on('mouseenter',function(d,i){
    d3.select(this).attr('opacity',0.6);
    let mouseinsvg = d3.mouse(viz2.node());
    console.log(mouseinsvg)

    numlabel.text(d.count)
      .attr('x',countScale(d.count) + 10)
      .attr('y',mouseinsvg[1])
      .attr('font-size',15)
    ;
  })
  .on('mouseleave',function(d){
     d3.select(this).attr('opacity',1)
     numlabel.text('')

  })
;

eachalbumgroup.attr("transform", function(d,i){
  let x = left;
  let y = albumScale(d.album)+0.5*albumScale.bandwidth()

  return  "translate("+x+","+y+")"
});


let graphGroup = entiregraphgroup.append('g').attr("class", "wcgraphGroup");
let redlineMaker = d3.line().curve(d3.curveCatmullRom)
    .x(function(d,i){
      console.log(d.wordcount[3].count)
      return countScale(d.wordcount[3].count)
    })
    .y(function(d,i){
      console.log('y')
      return albumScale(d.album)+0.5*albumScale.bandwidth()+3*blockheight-2*blockheight
    })
;

let bluelineMaker = d3.line().curve(d3.curveCatmullRom)
    .x(function(d,i){
      console.log(d.wordcount[0].count)
      return countScale(d.wordcount[0].count)
    })
    .y(function(d,i){
      console.log('y')
      return albumScale(d.album)+0.5*albumScale.bandwidth()+0*blockheight-2*blockheight
    })
;
let secondlineMaker = d3.line().curve(d3.curveCatmullRom)
    .x(function(d,i){
      console.log(d.wordcount[1].count)
      return countScale(d.wordcount[1].count)
    })
    .y(function(d,i){
      console.log('y')
      return albumScale(d.album)+0.5*albumScale.bandwidth()+3*blockheight-2*blockheight
    })
;

// enterView({
// 	selector: '.stretcher',
// 	enter: function(el) {
// 		console.log('a special element entered');
//
//     entiregraphgroup.attr('transform',function(d,i){
//       x=100;
//       y=1400;
//       return "translate("+x+","+y+")"
//     })
//     ;
//     rect.transition().duration(500).attr('opacity',0);
//     albumScale.range([padding, 500-padding]);
//     albumAxis = d3.axisLeft(albumScale);
//     albumAxisGroup.transition().duration(500).call(albumAxis);
//
//     ////////////////////////////red line////////////////////
//     graphGroup.attr('opacity',1);
//     graphGroup.selectAll('.curveline').data([incomingData]).enter()
//         .append('path')
//           .attr('d',redlineMaker)
//           .attr('fill', "none")
//           .attr('stroke', '#612527')
//           .attr('stroke-width', 0.5)
//
//           // .attr("class", "redline")
//           // .attr('fill', 'darkred')
//           // .attr('opacity',0.5)
//     ;
//     // '#fc6d6d','#E01219','#bf0000','#612527'
//
//     ///////////////////////blue line//////////////////////////
//
//     graphGroup.selectAll('.curveline').data([incomingData]).enter()
//         .append('path')
//           .attr('d',bluelineMaker)
//           .attr('fill', "none")
//           .attr('stroke', '#fc6d6d')
//           .attr('stroke-width', 0.5)
//           // .attr("class", "blueline")
//           // .attr('fill', 'yellow')
//           // .attr('opacity',0.5)
//     ;
//     ///////////////second line/////////////
//     // graphGroup.selectAll('.curveline').data([incomingData]).enter()
//     //     .append('path')
//     //       .attr('d',secondlineMaker)
//     //       .attr('fill', "none")
//     //       .attr('stroke', '#E01219')
//     //       .attr('stroke-width', 0.5)
//     //       // .attr("class", "blueline")
//     //       // .attr('fill', 'yellow')
//     //       // .attr('opacity',0.5)
//     // ;
//
//     graphGroup.transition().delay(200).duration(700).attr('transform',function(d,i){
//       x=0;
//       y=0;
//       return "translate("+x+","+y+")"
//     })
//     ;
//
//
// 	},
// 	exit: function(el) {
//     console.log('a special element exited');
//     entiregraphgroup.attr('transform',function(d,i){
//       x=0;
//       y=0;
//       return "translate("+x+","+y+")"
//     })
//     ;
//     rect.transition().duration(500).attr('opacity',1);
//     albumScale.range([padding, h2-padding]);
//     albumAxis = d3.axisLeft(albumScale);
//     albumAxisGroup.transition().duration(500).call(albumAxis);
//
//     graphGroup.transition().duration(500).attr('transform',function(d,i){
//       x=-1000;
//       y=-1000;
//       return "translate("+x+","+y+")"
//     })
//     ;
//
// 	},
// 	progress: function(el, progress) {
//     console.log("the special element's progress is:", progress);
// 	},
// 	offset: 0.5 // enter at middle of viewport
// 	// once: true, // trigger just once
// });

});

d3.json("allwordcount.json").then(function(incomingData){
  function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 1, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", 0)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
  }
  let keyworddomain = ['Lord/Jesus','babe/baby','fuck/fuckin/fucker/motherfucker','die/death/dead'];

  let wordcolorScale = d3.scaleOrdinal().domain(keyworddomain).range(['#fc6d6d','#E01219','#bf0000','#612527']);

  let allgroup = viz4.selectAll('.allgroup').data(incomingData).enter().append('g')
      .attr('class','allgroup')
    ;
  let key = allgroup.append('circle')
    .attr('class','key')
    .attr('r',function(d,i){
      console.log(d)
      return Math.sqrt(d.count)*5
    })
    .attr('cx',0)
    .attr('cy',0)
    .attr('fill',function(d){
      return wordcolorScale(d.word)
    })
  ;
  let textelement = allgroup.append('text')
    .text(function(d,i){
      return d.word
    })
    .attr('text-anchor','middle')
    .attr('x',0)
    .attr('y',function(d){
      return Math.sqrt(d.count)*5 + 20
    })
    .attr('font-size',15)
  ;
  let numtext = allgroup.append('text')
    .text(function(d){
      return d.count
    })
    .attr('text-anchor','middle')
    .attr('x',0)
    .attr('y',0)
    .attr('fill','white')
    .attr('font-size',15)
  ;
  allgroup.attr('transform',function(d,i){
    x = 300+i*200;
    // y =200+ Math.floor(i/4)*50;
    y = 150;
    return "translate("+x+","+y+")"
  })

  enterView({
  	selector: '.viz2',
  	enter: function(el) {
  		console.log('a special element entered');
      allgroup.transition().duration(500).attr('transform',function(d,i){
        x = 100;
        // y =200+ Math.floor(i/4)*50;
        y = 80+i*50;
        return "translate("+x+","+y+")"
      })
      ;
      key.transition().duration(500)
        .attr('r',10)
      ;
      textelement.transition().duration(500).attr('x',15)
        .attr('y',0)
        .attr('text-anchor','start')
      ;
      numtext.transition().duration(500).attr('opacity',0)
  	},
  	exit: function(el) {
      console.log('a special element exited');
      allgroup.transition().duration(500).attr('transform',function(d,i){
        x = 300+i*200;
        // y =200+ Math.floor(i/4)*50;
        y = 150;
        return "translate("+x+","+y+")"
      })
      ;
      key.transition().duration(500).attr('r',function(d,i){
        console.log(d)
        return Math.sqrt(d.count)*5
      })
      ;
      textelement.transition().duration(500).attr('y',function(d){
        return Math.sqrt(d.count)*5 +20
      })
      .attr('text-anchor','middle')
    ;
      numtext.transition().duration(500).attr('opacity',1)
  	},
  	progress: function(el, progress) {
      console.log("the special element's progress is:", progress);
  	},
  	offset: 0.5
  });
});
