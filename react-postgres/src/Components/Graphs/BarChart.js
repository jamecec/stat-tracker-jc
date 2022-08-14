import * as d3 from "d3";
import React, {useState, useEffect, useRef} from 'react';

export const BarChart = ({data,y,x,filter}) => {
    const ungroupedData = data.filter(d=> d.game == filter)
    //group by xValue
    const groups = ungroupedData.reduce((groups, stat)=>{
        const statdate = stat.statdate.split('T')[0];
        const groupBy = x =="date" ? stat.statdate.split('T')[0]: x == "character" ? stat.character : stat.loadout;
        if(!groups[groupBy]){
          groups[groupBy]=[];
        }
        groups[groupBy].push(stat);
        return groups
      },{});
      const dataset = Object.keys(groups).map((groupBy)=>{
        return{
          groupBy,
          stats: groups[groupBy]
        };
      });
    //add a new property for the average yValue for the stats property
    for(let i=0; i<dataset.length; i++){
      let averageArr = [];
      for(let j=0; j<dataset[i].stats.length; j++){
        averageArr.push(dataset[i].stats[j][y]);
      }
      let aveValue = averageArr.reduce((a,b)=>a+b, 0)/averageArr.length;
      dataset[i].average = Math.round(aveValue);
    }
    //creating svg specifications
    const svgRef = React.useRef(null);
    const w = 800;
    const h= 500;
    const padding = 100;
    // populating svg
    React.useEffect(()=>{
      const xArr = dataset.map((d)=>d.groupBy);
      const yMax = d3.max(dataset, (d)=>d.average);
      //tooltip on hover
      const tooltip = d3.select(".graphDisplay")
                        .append("div")
                        .attr("id", "tooltip");

      function handleMouseOver(e, d){
        tooltip.style("opacity", .8)
               .style("left", ((e.pageX)-50)+"px")
               .style("top", ((e.pageY)-50)+"px")
               .html(y.toUpperCase() + ": " + d.average + "<br>" + x.toUpperCase() + ": " + d.groupBy)
      }
      function handleMouseOut(){
        tooltip.style("opacity", 0)
      }
      //creating scales
      const xScale = d3.scaleBand()
                           .domain(xArr)
                           .range([padding, w-padding]);
      const yScale = d3.scaleLinear()
                       .domain([0, yMax])
                       .range([h-padding, padding]);
      //creating svg
      const svgEl = d3.select(svgRef.current);
      svgEl.selectAll("*").remove(); //clear contents before adding new elements
      const svg = svgEl
                  .append("g")
      // creating chart area
        svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("x", (d,i) => xScale(d.groupBy))
          .attr("y", (d) => yScale(d.average))
          .attr("width", xScale.bandwidth())
          .attr("height", (d)=> (h-padding)-yScale(d.average))
          .attr("class", "bar")
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut)
      //wrapping xAxis labels
      function wrap(text,width){
        text.each(function(){
          var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line  =[],
          lineNumber = 0,
          lineHeight = 1.1, //ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x",0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()){
          line.push(word);
          tspan.text(line.join(" "));
          if(tspan.node().getComputedTextLength() > width){
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
      }
      //creating axis
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append("g")
         .attr("transform", "translate(0," + (h-padding) + ")")
         .call(xAxis)
         .selectAll(".tick text")
         .call(wrap, xScale.bandwidth())

      svg.append("g")
         .attr("transform", "translate(" + padding + ",0)")
         .call(yAxis);

       //adding axis labels
       svg.append("text")
          .attr("id", "xAxisLabel")
          .attr("text-anchor", "middle")
          .attr("x", ((w/2.5)+padding))
          .attr("y", h-60)
          .text(x.toUpperCase())
          .attr("class", "axis-label")
      svg.append("text")
          .attr("id", "yAxisLabel")
          .attr("text-anchor", "middle")
          .attr("y", 40)
          .attr("x", -h/2)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text(y.toUpperCase())
          .attr("class", "axis-label")

      })
    return (
      <svg
          ref={svgRef}
          viewBox="0 80 800 500"
          width="100%"
          height="auto"
          preserveAspectRatio="xMinYMid"
          />
    );
}
//references
//	Grouping objects https://stackoverflow.com/questions/46802448/how-do-i-group-items-in-an-array-by-date
//Wrapping X-Axis Labels https://bl.ocks.org/mbostock/7555321
//implementing react & d3 together https://blog.griddynamics.com/using-d3-js-with-react-js-an-8-step-comprehensive-manual/

export default BarChart;
