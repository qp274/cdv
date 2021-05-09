let w = 900;
let h = 600;
let padding = 30;
let mid1 = padding+(((h/3)-(padding*2))/2)+100;
let bot1 = (h/3)-padding+100;
let mid2= (h/3)+padding+(((h/3)-(padding*2))/2)
let bot2= ((h/3)*2)-padding;
let mid3 = h-padding-(((h/3)-(padding*2))/2)-100
let bot3 = h-padding-100;
let leftpadding = 30;
let rightpadding = 30;

let viz1 = d3.select('.viz1')
    .append('svg')
    .attr('width',w)
    .attr('height',h)
    // .style('background-color','lavender')
;


d3.json("murderballads.json").then(function(incomingData){

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
  ////////////////////////cleaning the data/////////////////////////////////////////
  let songnestMaker = d3.nest().key(function(d){ return d.song });
  let databysong = songnestMaker.entries(incomingData);
  // console.log('data by song',databysong);

  let deathnestMaker = d3.nest().key(function(d){ return d.death });
  let databydeath = deathnestMaker.entries(incomingData);
  // console.log('data by death type',databydeath);

  let categorynestMaker = d3.nest().key(function(d){ return d.category });
  let databycategory = categorynestMaker.entries(incomingData);
  // console.log('data by category',databycategory);



  let songlist = databysong.map(function(d){return d.key});
  // console.log('song list',songlist);

  let deathlist = databydeath.map(function(d){return d.key});
  // console.log('song list',deathlist);

  let categorylist = databycategory.map(function(d){return d.key});
  // console.log('song list',categorylist);


///////////////////////////////////create song x axis///////////////////////////////////////////////

  let songScale = d3.scaleBand()
      .domain(songlist)
      .range([leftpadding, w-rightpadding])
      // .call(wrap, x.rangeBand());
      // .paddingInner(0.1)
  ;
  let songAxis = d3.axisBottom(songScale);
  let songAxisGroup = viz1.append("g").attr("class", "xaxis songaxis");

  songAxisGroup.attr("transform", "translate(0,"+(bot1)+")");
  songAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 15);
  songAxisGroup.call(songAxis);
  songAxisGroup.attr('opacity',0)
  songAxisGroup.selectAll(".tick text")
      .call(wrap, songScale.bandwidth())
  ;
/////////////////////death x axis//////////////////////////////////
let deathScale = d3.scaleBand()
    .domain(deathlist)
    .range([leftpadding, w-rightpadding])
    // .paddingInner(0.1)
;
let deathAxis = d3.axisBottom(deathScale);
let deathAxisGroup = viz1.append("g").attr("class", "xaxis deathaxis");

deathAxisGroup.attr("transform", "translate(0,"+(bot2)+")");
deathAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
deathAxisGroup.call(deathAxis);
deathAxisGroup.attr('opacity',0)

/////////////////////category x axis//////////////////////////////////
let categoryScale = d3.scaleBand()
    .domain(categorylist)
    .range([leftpadding, w-rightpadding])
    // .paddingInner(0.1)
;
let categoryAxis = d3.axisBottom(categoryScale);
let categoryAxisGroup = viz1.append("g").attr("class", "xaxis categoryaxis");

categoryAxisGroup.attr("transform", "translate(0,"+(bot3)+")");
categoryAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
categoryAxisGroup.call(categoryAxis);
categoryAxisGroup.attr('opacity',0)
//////////////////////////////////////////////////////

  let graphgroup = viz1.append("g").attr("class", "graphgroup");

incomingData = incomingData.map(function(node, index) {
  node.color = '#bf0000';
  node.radius = 5;
  node.x = songScale(node.song);
  node.y = mid1;
  return node
});

  let force = d3.forceSimulation(incomingData)
    .force('forceX', d3.forceX(function(d){
      return songScale(d.song)+0.5*songScale.bandwidth()
    }))
    .force('forceY', d3.forceY(mid1))
    .force('collide', d3.forceCollide().radius(function(d,i){
      if (d.death == "fire") {
        return 31
      } else if (d.count == "unknown"){
        return 21
      }else{
        return 6
      }
    }))
    .tick(400)
    .on("end", function(){
      incomingData.forEach(node=>{
        node.songx = node.x;
        node.songy = node.y;
        node.x = deathScale(node.death) + deathScale.bandwidth()/2;
        node.y = mid2;
      });

      initSongGraph();
      enterView({
        selector: '.viz1',
        enter: function(el) {
          console.log('a special element entered');
          // points.transition().duration(500).attr('opacity',1);
          songAxisGroup.transition().duration(500).attr('opacity',1)
          d3.selectAll(".point").transition().duration(500).attr('opacity',1);
          // document.getElementById('intropara1').style.opacity=1;
        },
        exit: function(el) {
          console.log('a special element exited');
          songAxisGroup.transition().duration(500).attr('opacity',0)
          d3.selectAll(".point").transition().duration(500).attr('opacity',0);
          // document.getElementById('intropara1').style.opacity=0;
        },
        progress: function(el, progress) {
          console.log("the special element's progress is:", progress);
        },
        offset: 0.5 // enter at middle of viewport
        // once: true, // trigger just once
      });


      calcDeathPos()
    })
  ;



    function calcDeathPos(){

      force = d3.forceSimulation(incomingData)
        .force('forceX', d3.forceX( d => deathScale(d.death) + deathScale.bandwidth()/2 ) )
        .force('forceY', d3.forceY( d => mid2) )
        .force('collide', d3.forceCollide().radius(function(d,i){
          if (d.death == "fire") {
            return 31
          } else if (d.count == "unknown"){
            return 21
          }else{
            return 6
          }
        }))
        .tick(400) // explain stop
        .on("end", function(){
          incomingData.forEach(node=>{
            node.deathx = node.x;
            node.deathy = node.y;
            // node.x = categoryScalecategory(node.category) + categoryScale.bandwidth()/2;
            // node.y = mid3;
          });

          // deathButton.on("click", function(){
          //   showDeathGraph();
          // });
          enterView({
            selector: '#intropara2',
            enter: function(el) {
              console.log('a special element entered');
               showDeathGraph();
                deathAxisGroup.transition().duration(500).attr('opacity',1);
                songAxisGroup.transition().duration(500).attr('opacity',0)
                // document.getElementById('intropara2').style.opacity=1;
                // document.getElementById('intropara1').style.opacity=0;

            },
            exit: function(el) {
              console.log('a special element exited');
              // let viz1=document.getElementById('viz1placeholder');
              // viz1.src = "viz1_1.jpg"
               showSongGraph();
               songAxisGroup.transition().duration(500).attr('opacity',1);
               deathAxisGroup.transition().duration(500).attr('opacity',0)

               // document.getElementById('intropara2').style.opacity =0;
               // document.getElementById('intropara1').style.opacity=1;
            },
            progress: function(el, progress) {
              console.log("the special element's progress is:", progress);
            },
            offset: 0.6 // enter at middle of viewport
            // once: true, // trigger just once
          });
          // deathAxisGroup.call(deathAxis);

          calccategoryPos();

        })
      ;
    }

    function calccategoryPos(){
      force = d3.forceSimulation(incomingData)
        .force('forceX', d3.forceX( d => categoryScale(d.category) + categoryScale.bandwidth()/2 ) )
        .force('forceY', d3.forceY( d => mid3 ))
        .force('collide', d3.forceCollide().radius(function(d,i){
          if (d.death == "fire") {
            return 31
          } else if (d.count == "unknown"){
            return 21
          }else{
            return 6
          }
        }))
        .tick(400) // explain stop
        .on("end", function(){
          console.log(incomingData);
          incomingData.forEach(node=>{
            node.categoryx = node.x;
            node.categoryy = node.y;
          });

          enterView({
            selector: '#intropara3',
            enter: function(el) {
              console.log('a special element entered');
               showCategoryGraph();
                categoryAxisGroup.transition().duration(500).attr('opacity',1);
                deathAxisGroup.transition().duration(500).attr('opacity',0);

                // document.getElementById('intropara2').style.opacity=0;
                // document.getElementById('intropara3').style.opacity=1;

            },
            exit: function(el) {
              console.log('a special element exited');
              // let viz1=document.getElementById('viz1placeholder');
              // viz1.src = "viz1_1.jpg"
               showDeathGraph();
               categoryAxisGroup.transition().duration(500).attr('opacity',0);
               deathAxisGroup.transition().duration(500).attr('opacity',1);

               // document.getElementById('intropara2').style.opacity=1;
               // document.getElementById('intropara3').style.opacity=0;
            },
            progress: function(el, progress) {
              console.log("the special element's progress is:", progress);
            },
            offset: 0.6 // enter at middle of viewport
            // once: true, // trigger just once
          });
        })
      ;
    }
    function showSongGraph() {
      graphgroup.selectAll(".datagroup")
        .transition()
        .duration(500)
        .attr("transform", function(d){
          d.currentx = d.songx;
          d.currenty = d.songy;
          return "translate("+d.songx+","+d.songy+")"
        })
      ;
    }

    function showDeathGraph() {
      graphgroup.selectAll(".datagroup")
        .transition()
        .duration(500)
        .attr("transform", function(d){
          d.currentx = d.deathx;
          d.currenty = d.deathy;
          return "translate("+d.deathx+","+d.deathy+")"
        })
      ;
    }

    function showCategoryGraph() {
      graphgroup.selectAll(".datagroup")
        .transition()
        .duration(500)
        .attr("transform", function(d){
          d.currentx = d.categoryx;
          d.currenty = d.categoryxy;
          return "translate("+d.categoryx+","+d.categoryy+")"
        })
      ;
    }

    function initSongGraph(){
      let textelement= viz1.append('text')
          // .text("placeholder")
      ;
      let theSituation = graphgroup.selectAll(".datagroup").data(incomingData, d=>d.song);
      let enterSelection = theSituation.enter().append("g")
          .attr("class", "datagroup")
          .attr("transform", function(d){
            d.currentx = d.songx;
            d.currenty = d.songy;
            return "translate("+d.songx+","+d.songy+")"
          })
      let points = enterSelection.append("circle")
            .attr("class", "point")
            .attr("r", function(d,i){
              if (d.death == "fire") {
                return 30
              } else if (d.count == "unknown"){
                return 20
              }else{
                return 5
              }
            })
            .attr("fill", d=>d.color)
            .attr('opacity',0)
            .on('mouseover',function(d,i){
              console.log('mouse over');
              console.log(d3.mouse(viz1.node()))
              let mouseinsvg = d3.mouse(viz1.node());
              textelement.text(d.name)
                  .attr('x',mouseinsvg[0]-20)
                  .attr('y',mouseinsvg[1]-30)
                  .style('font-size','12px')


            })
            .on('mouseout', function(d,i){
              textelement.text('')
            })
          ;

      // points.transition().duration(500).attr('opacity',1);

    }


});
