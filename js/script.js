Promise.all([ // load multiple files
	d3.json('./data/airports.json'),
	d3.json('./data/worldmap.json')
]).then(([airports, worldmap])=>{
    console.log("airports=", airports);
    console.log("worldmap=", worldmap);

    const margin = {top: 20, right: 20, bottom: 20, left: 20};
    const width = 720 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    const svg = d3.select('.nodeGram')
                .append('svg')
                .attr("viewBox", [0,0,width,height]);
    
    const circleScale = d3.scaleLinear()
                        .domain(d3.extent(airports.nodes, d=>d.passengers))
                        .range([3,9]);

    const force = d3.forceSimulation(airports.nodes)
                    .force("charge", d3.forceManyBody().strength(-20))
                    .force("center", d3.forceCenter(width/2, height/2))
                    .force("link", d3.forceLink(airports.links).distance(50))
                    // .force("collide", d3.forceCollide().radius(d=>circleScale(d.passengers)));

    const links = svg
                    // .append("g")
                    .attr("stroke", "black")
                    .attr("stroke-opacity", 0.6)
                    .selectAll("line")
                    .data(airports.links)
                    .join("line")
                    .attr("stroke-width", 1)
                    .attr("stroke", "black");
   
    drag = simulation => {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    const nodes = svg.selectAll("circle")
                    .data(airports.nodes)
                    .join("circle")
                    .attr("fill", "salmon")
                    .attr("r", d=>circleScale(d.passengers))
                    .call(drag(force));
    
    nodes.append("title")
        .text(d => d.name);

    force.on("tick", ()=>{
        nodes
            .attr("cx", d=>{return d.x;})
            .attr("cy", d=>{return d.y;});
        links
            .attr("x1", d=>{return d.source.x;})
            .attr("y1", d=>{return d.source.y;})
            .attr("x2", d=>{return d.target.x;})
            .attr("y2", d=>{return d.target.y;});
    });

})