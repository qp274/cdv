let w = 1200;
let h = 800;

let viz = d3.select('#container').append("svg")
    .attr('width', w)
    .attr('height', h)
;

viz.append('circle')
        .attr('r',300)
        .attr('fill','grey')
        .attr('opacity', 0.2)

viz.append('circle')
    .attr('r',700)
    .attr('fill','grey')
    .attr('opacity', 0.2)
    .attr('cx',400)
    .attr('cy', -500)

    viz.append('circle')
        .attr('r',400)
        .attr('fill','grey')
        .attr('opacity', 0.2)
        .attr('cx',1100)
        .attr('cy', 900)


viz.append('circle')
    .attr('r',60)
    .attr('fill','grey')
    .attr('opacity', 0.2)
    .attr('cx',1100)
    .attr('cy', 400)
