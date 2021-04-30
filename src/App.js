import React from "react";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear, scaleBand } from "d3-scale";
import { extent, max, min, bin, rollups } from "d3-array";
import { scale } from "vega";
import * as topojson from "topojson-client";
import world from "../land-50m";

const App = () => {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/anie0521/INFO474-Project/main/country_vaccinations.csv"
      );
    if(!loading) {
      const colNames = ["country", "date", "people_fully_vaccinated", "total_vaccinations", "vaccines"]
    
    let filteredData = data.filter((d) => {
      for(let i = 0; i < colNames.length; i++) {
        if(!d[colNames[i]]) {
          return false;
        }
      }
      return true;
    });

    let groupedData = rollups(filteredData, (v) => {
      // find row with largest total vaccination
      let indexOfMax = 0;
      let max = 0;
      for (let i = 0; i < v.length; i++) {
         const currRow = v[i];
         if (+currRow.total_vaccinations > max) {
            indexOfMax = i;
            max = +currRow.total_vaccinations;
         }
      }
      return v[indexOfMax];
    }, d => d.country);

    console.log(groupedData);

    const size = 500;
    const margin = 20;
    const leftMargin = 50;

    const totalVaccinationsExtent = extent(groupedData, d => +d[1].total_vaccinations);
    const xScale = scaleLinear().domain(totalVaccinationsExtent).range([leftMargin, size-margin]);
    const countries = groupedData.map(d => d[0]);
    const yScale = scaleBand().domain(countries).range([size - margin, margin]);
    
    const rects = groupedData.map(d => {
      const row = d[1];
      const x = xScale(+row.total_vaccinations);
      const y = yScale(d[0]);
      const barWidth = yScale.bandWidth();
      return <rect x={0} y={y} height={barWidth} width={x} />;
    });

    const axisTextAlignmentFactor = 3;

  
    const histogramLeftPadding = 30;

    const land = topojson.feature(world, world.objects.land);
    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);
    //https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json
    const mapPathString = path(land);
    }

    return (
        <div>
              <svg width={size} height={size} style={{ border: "1px solid black" }}>
                {rects}
              </svg>
              





            <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021 by Jisu Kim</h1>
            <p>{loading && "Loading data!"}</p>
            <h2>About Data</h2>
            <p>This dataset shows the current vaccine status in the world in 2021. From this dataset, I want to observe <br></br>vaccinated percentage in the world with different forms of data visualization. 
                Later, I hope people can understand vaccine status with this.</p>
            
            <h2>Questions?</h2>
            <ol>
                <li>Which country is the most vaccinated?</li>
                <li>What is the most popular vaccine in the world?</li>
                <li>Which country has the most vaccines?</li>
            </ol>

            <h2>Which country is the most vaccinated?
            </h2>
            <div style={{margin: "10px"}}>
              <h3>Total fully vaccinated people table by top 10 countries</h3>
                <tbody>
                  <tr>
                    <th>Country</th>
                    <th>Fully vaccinated</th>
                  </tr>
                  <tr>
                    <td style={{padding: "2px 10px"}}>1. United States</td>
                    <td>3,533,075,091</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 10px"}}>2. India</td>
                    <td>511,332,420</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 10px"}}>3. Israel</td>
                    <td>347,443,009</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 10px"}}>4. Turkey</td>
                    <td>327,131,074</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 10px"}}>5. United Kingdom</td>
                    <td>289,869,551</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 10px"}}>6. Germany</td>
                    <td>273,038,264</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 10px"}}>7. Brazil</td>
                    <td>252,081,830</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 10px"}}>8. England</td>
                    <td>234,899,771</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 10px"}}>9. Italy</td>
                    <td>211,520,297</td>
                  </tr>
                  <tr>
                  <td style={{padding: "2px 2px"}}>10. France</td>
                    <td>193,908,873</td>
                  </tr>
                </tbody>
              </div>
              <p>This data table shows top 10 fully vaccinated countries. As you can see this chart, 
                <br></br> the United States is the most vaccinated country and most European countries are in top 10 list.
              </p>
              <h3>Total fully vaccinated people bar chart by countries</h3>
              <svg width={size} height={size} style={{ border: "1px solid black" }}>
 {/*                {fullvaccineBins.map((bin, i) => {
                  console.log(i, bin);
                  return (
                    <rect
                      y={size - bin.length}
                      width="25"
                      height={bin.length}
                      x={histogramLeftPadding + i * 40}
                      style={{fill: "gray"}}
                    />
                  );
                })} */}
                <text
                  x={size * 0.6}
                  y={size / 2 - 170}
                  textAnchor="end"
                  style={{ fontSize: 20, fontFamily: "Gill Sans, sans serif", fill: "red" }}
                >
                - United States : 3,533,075,091
                </text>
                <text
                  x={size / 2 + 5}
                  y={size * 0.95}
                  textAnchor="end"
                  style={{ fontSize: 20, fontFamily: "Gill Sans, sans serif", fill: "black" }}
                >
                - India : 511,332,420
                </text>
              </svg>
              <p>This bar chart indicates the information about total number of fully vaccinated people in country.
              <br></br>The most vaccinated country is United States, and the second most vaccinated country is India.</p>

              <h3>geo data</h3>
 {/*              <svg width={size * 2} height={size} style={{ border: "1px solid black" }}>
                <path d={mapPathString} fill="rgb(200, 200, 200)" />
                {dataSmallSample.map((measurement) => {
                  return (
                    <circle
                      transform={`translate(
                        ${projection([measurement.country, measurement.country])})`}
                      r="1.5"
                    />
                  );
                })}
              </svg> */}
            <h2>What is the most popular vaccine in the world?</h2>
            <h2>Which country has the most vaccines?</h2>
        </div>
    );
};

export default App;