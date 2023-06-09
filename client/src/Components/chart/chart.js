import React, { useCallback, useEffect, useRef, useState} from 'react';
import './chart.css'
import * as d3 from 'd3'
import {gsap} from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    chartData, 
    convertScrollToTime, 
    formatTime, 
    height,
    minWidth, 
    xSunLevel, 
    xTideLevel, 
    ySunLevel
} from '../../Data/chartData'

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const D3Chart = () => {
    const [moonIsHidden, setMoonIsHidden] = useState(true)
    const [time, setTime ] = useState("")
    const svgRef = useRef(null)
        
    const handleScroll = useCallback(() => {
        //handle show time
        let svgContain = document.querySelector(".chart")
        let scrollPercent =  svgContain.scrollLeft/ (svgContain.scrollWidth - minWidth * 2) 
        if(scrollPercent > 1){
            scrollPercent = 1
        }
        setTime(formatTime(convertScrollToTime(scrollPercent)))
        //handle motion 
        const lineChecking = document.querySelector("#morningLine")
        if(lineChecking){
            let rawpath = MotionPathPlugin.getRawPath("#morningLine"),point;
            if(rawpath){
            MotionPathPlugin.cacheRawPathMeasurements(rawpath)
            point = MotionPathPlugin.getPositionOnPath(rawpath, scrollPercent) ;
            let sun = document.getElementById("sun")
            let moon = document.getElementById("moon")
            if (point.x > 0) {
                sun.setAttribute("transform", `translate(${point.x},${point.y})`);
            } else {
            gsap.to("#sun", { x: minWidth, y: height });
            }
            if (point.y >= 205){
            setMoonIsHidden(false)
            }else{
            setMoonIsHidden(true)
            }
            moon.setAttribute("transform", `translate(${point.x},100)`)  
            }  
        }else{
            console.error("undefined");
        }
        
    },[])
    
     useEffect(()=>{
        handleScroll()
        document.querySelector(".chart").addEventListener("scroll",(e)=>{
          handleScroll()  
        })
        
        const svg = d3.select(svgRef.current)
        const xScale = d3.scaleBand()
            .domain(chartData.map(d => d.hour))
            .range([0,minWidth *12])
        const xTimeScale = d3.scaleBand()
            .domain(xSunLevel.map(d => d.hour))
            .range([0,minWidth *12])
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(chartData, d=>d.tide)])
            .range([height, 0])
        const sun = xSunLevel.map((x,i)=>{
            return{
                x: x,
                y: height - ySunLevel[i] * 70,
            }
        })
        const tide = xTideLevel.map((x,i)=>{
            return {
                x: x,
                y: height- chartData[i].tide *60
            }
        })
        //Sun rise & set
        const sunLevel = d3.line()
            .curve(d3.curveCardinal)
            .x((d)=>d.x)
            .y((d)=>d.y)
        const pathOfMorningLine =  sunLevel(sun)
        //Tide level
        const tideLevel = d3.area()
            .curve(d3.curveBasis)
            .x((d)=>d.x)
            .y1((d)=>d.y)
            .y0(height)
        const pathOfTideArea = tideLevel(tide)  

        svg.select("#tideArea").attr("d",pathOfTideArea);
        svg.select("#morningLine").attr("d",pathOfMorningLine)
        svg.selectAll("text")
        .data(chartData)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("text-anchor", "start")
        .attr("x", (d) => xScale(d.hour))
        .attr("y", (d) => yScale(d.tide) +30)
        .text((d) => d.hour)
        .attr('fill', '#797979');
        svg.selectAll('rect')
        .data(xSunLevel)
        .attr('x', (d) => xTimeScale(d))
        .attr('y', 0)
        .attr('class','nightBackground')
        .attr('width', minWidth)
        .attr('height', height)
        .attr('fill',  (d, i) => {
            if (ySunLevel[i] === 0 || ySunLevel[i] === -2) {
              return 'lightgray';
            } else {
              return 'none';
        }});
        
    },[handleScroll])
    
  return (
    <div className='chart'>
        <div className='d3_canvas'>
            <div className='chart_measure'></div>
            <svg 
            ref={svgRef} 
            width={12 * minWidth} 
            height={height} 
            onScroll={handleScroll}
            >   
                <rect className='nightBackground'/>
                
                <g>
                    <path id='tideArea' fill="#c1e5f7" stroke="none" d=''/>
                </g>
                <g>
                    <path id='morningLine' fill="none" stroke="orange" d=''/>
                </g>
                <g>
                    <circle id='sun' fill='orange' r={12} style={{display: `${moonIsHidden ? "block": "none"}`}}/>
                </g>
                <g>
                    <circle id='moon' fill='$c1e5f7' r={12} style={{display: `${moonIsHidden ? "none": "block"}`, zIndex: 100}}/>
                </g>
                <text className='label'/>           
            </svg>
        </div>
        <div className='chart_title'>
            <h5 className='chart_titleTide'>Tide</h5>
            <span>•</span>
            <h5 className='chart_titleSun'>Sunrise & Sunset</h5>
        </div>
        {/* <MarkOfTimes/> */}
        <span className='chart_time'>{time}</span>
    </div>
  )
}

export default D3Chart
