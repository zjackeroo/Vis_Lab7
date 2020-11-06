d3.json('./data/airports.json', d3.autoType).then(data=>{
    console.log("data=", data)

    const margin = {top: 20, right: 20, bottom: 20, left: 20};
    const width = 900 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    const svg = d3.select('.nodeGram')
                .append('svg')
                .attr("viewBox", [0,0,width,height])
                // .append("g");

    const circleScale = d3.scaleLinear()
                        .domain(d3.extent(data.nodes, d=>d.passengers))
                        .range([5,20]);

    const force = d3.forceSimulation(data.nodes)
                    .force("charge", d3.forceManyBody().strength(-30))
                    .force("center", d3.forceCenter())
                    .force("collide", d3.forceCollide().radius(d=>circleScale(d.passengers)));

    const nodes = svg.selectAll("circle")
                        .data(data.nodes)
                        .join("circle")
                        .attr("fill", "salmon")
                        .attr("r", d=>circleScale(d.passengers));
    
    force.on("tick", ()=>{
        nodes.attr("cx", d=>{
            console.log(d);
            return 300+d.x;
        });
        nodes.attr("cy", d=>{
            console.log(d);
            return 300+d.y;
        });
    });
    
    // const nodes = svg.selectAll(".nodeGram")
    //                     .data(data.nodes)
    //                     .join("circle")
    //                     .attr("fill", "salmon")
    //                     .attr("r", d=>circleScale(d.passengers))
    //                     .append("title")
    //                     .text(d=>d.nodes.name);
    // const links = svg.append("g")
    //                 .attr("stroke", "#999")
    //                 .attr("stroke-opacity", 0.6)
    //                 .selectAll("line")
    //                 .data(data.nodes)
    //                 .join("line")
    //                 .attr("stroke-width", d => Math.sqrt(d.passengers));

    // const nodes = svg.append("g")
    //                 .attr("stroke", "#fff")
    //                 .attr("stroke-width", 1.5)
    //                 .selectAll("circle")
    //                 .data(data.nodes)
    //                 .join("circle")
    //                 .attr("r", 5)
    //                 .attr("fill", "color")
    //                 // .call(drag(simulation));
    
    // nodes.append("title")
    //     .text(d => d.nodes.name);

    // force.on("tick", function() {
    //     // update positions
    // });
    
    













    // // create axes and axis title containers
    // svg.append('g')
    // .attr('class', 'axis x-axis')
    // .attr('transform', `translate(20, ${height})`)
    // svg.append('g')
    // .attr('class', 'axis y-axis')
    // .attr("transform", "translate(20, 0)")
    // svg.append("text")
    // .attr('class', 'title')
    // .attr('x', margin.left-10)
    // .attr('y', -10)
    // .attr('alignment-baseline', 'middle')
    // .attr('text-anchor', 'middle')
    // .attr('font-size', 14);

    // // (Later) Define update parameters: measure type, sorting direction
    // let type = document.getElementById('group-by').value
    // let sort = 1;

    // // CHART UPDATE FUNCTION -----------------------------------------------------------------------
    // function update(data, type, sort){
    //     console.log('current type is:', type)

    //     if (sort==0) {
    //         data = data.sort((a,b)=>(b[type] - a[type]));
    //     } else {
    //         sort = -sort;
    //         data = data.sort((a,b)=>(sort*b[type] - sort*a[type]));
    //     }
        
    //     console.log('data: ', data)

    //     // update domains
    //     xScale.domain(data.map(d=>d.company))
    //     yScale.domain([0, d3.max(data, d=>(d[type]))])

    //     // update bars
    //     const barchart = svg.selectAll('rect')
    //                         .data(data)
    //     barchart.enter()
    //             .append('rect')
    //             .attr('fill', '#6f4e37')
    //             .merge(barchart)
    //             .transition()
    //             .duration(750)
    //             .delay(200)
    //             .attr('width', 65)
    //             .attr('height', d=>(height-yScale(d[type])))
    //             .attr('x', (d,i)=>25+(i*xScale.bandwidth()))
    //             .attr('y', d=>(yScale(d[type])))
    //     if (type=='stores') {
    //         barchart.attr('fill', '#6f4e37');
    //     } else {
    //         barchart.attr('fill', '#fa8b0d');
    //     }
            
    //     // update axes and axis title
    //     xAxis = d3.axisBottom()
    //                 .scale(xScale);
    //     yAxis = d3.axisLeft()
    //                 .scale(yScale);
    //     svg.select('.x-axis')
    //     .transition()
    //     .duration(750)
    //     .delay(400)
    //     .call(xAxis);
    //     svg.select('.y-axis')
    //     .transition()
    //     .duration(750)
    //     .delay(600)
    //     .call(yAxis);
    //     svg.select('.title')
    //     .text(`${type}`);
        
    //     return sort;
    // }

    // // CHART UPDATES -------------------------------------------------------------------------------

    // // Loading data
    // data = d3.csv('./data/coffee-house-chains.csv', d3.autoType).then(data => {
    //     update(data, 'stores', 0);
    //     // (Later) Handling the type change
    //     document.querySelector('#group-by').addEventListener('change', (e)=>{
    //         console.log('Selected type is: ', e.target.value);
    //         update(data, e.target.value, 0);
    //     });

    //     // (Later) Handling the sorting direction change
    //     document.querySelector('#sort').addEventListener('click', (e)=>{
    //         type = document.querySelector('#group-by').value
    //         console.log(`sorting by ${type}...`)
    //         sort = update(data, type, sort)
    //     });
    // });
})