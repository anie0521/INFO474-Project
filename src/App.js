import React from "react";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear, scaleBand } from "d3-scale";
import { extent, max, min, bin, rollups, filter } from "d3-array";
import { scale } from "vega";
import * as topojson from "topojson-client";
import world from "../land-50m";

const App = () => {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/anie0521/INFO474-Project/main/country_vaccinations.csv"
      );
/*     if(!loading) {
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

    const totalVaccinationsExtent = extent(groupedData, d => {return +d[1].total_vaccinations;});
    const xScale = scaleLinear().domain(totalVaccinationsExtent).range([leftMargin, size-margin]);
    const countries = groupedData.map(d => d[0]);
    const yScale = scaleBand().domain(countries).range([size - margin, margin]);
    } */

    return (
        <div>
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

            <h2>Which country is the most vaccinated?</h2>

            <h3>Data Table: Daily vaccinated and Fully vaccinated by countries</h3>
            <svg width="600" height="500" style={{ border: "1px solid black", marginBottom: "25px" }}>
                <foreignObject width="100%" height="100%">
                    <iframe src="https://public.tableau.com/views/INFO474-2/Sheet2?:language=en&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no&:embed=true"
                    width="700" height="500"></iframe>
                </foreignObject>
            </svg>
            <p>The data table shows the detailed information about how many people get vaccinted fully and daily.
            <br></br>As you can see closely, the United States is the most number of daily vaccination and people fully vaccinted.
            <br></br>Also, the daily vaccinations and the number of people fully vaccinated are proportional.
            </p>

            <h3>Bar Chart: Fully vaccinated countries(most recent data)</h3>
            <svg width="500" height="500" style={{ border: "1px solid black", marginBottom: "25px" }}>
                <foreignObject width="100%" height="100%">
                    <iframe src="https://public.tableau.com/views/INFO474-1/Sheet1?:language=en&:display_count=y&:origin=viz_share_link&:showVizHome=no&:embed=true"
                    width="500" height="500"></iframe>
                </foreignObject>
            </svg>
            <p>This bar chart indicates the information about total number of fully vaccinated people in country.
            <br></br>The most vaccinated country is United States. The number of fully vaccinated people in the U.S. is over 90M.
            <br></br>And, the second most vaccinated country is India. The number of fully vaccinated people in India. is over 20M.
            <br></br> The difference is almost 4 times more than those who have been vaccinated in both the United States and India.
            </p>

            <h3>Geo Graph: Fully vaccinated countries(most recent data)</h3>
            <svg width="800" height="800" style={{ border: "1px solid black", marginBottom: "25px" }}>
                <foreignObject width="100%" height="100%">
                    <iframe src="https://public.tableau.com/views/INFO474-3/Sheet3?:language=en&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no&:embed=true"
                    width="800" height="800"></iframe>
                </foreignObject>
            </svg>
            <p>We can compare which countries get the most vaccinated fully by comparing the size of circle with geo graph.
            <br></br>As you checked with table graph and bar graph, the United States has the biggest circle.
            </p>
            

            <h2>What is the most popular vaccine in the world?</h2>

            <h3>Data Table: Total vaccines and people fully vaccinated</h3>
            <svg width="600" height="500" style={{ border: "1px solid black", marginBottom: "25px" }}>
                <foreignObject width="100%" height="100%">
                    <iframe src="https://public.tableau.com/views/INFO474-4/Sheet4?:language=en&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no&:embed=true"
                    width="700" height="500"></iframe>
                </foreignObject>
            </svg>
            <p>Here is data table that shows total vaccinations and fully vaccinted by vaccines.
            <br></br>The most popluar vaccine which is same as the highest number of people fully vaccinated is Johnson&Johnson, Moderna, Pfizer/BioTech.
            <br></br>And the second highest vaccine is Sinopharm/Bejing, but there is no value for people fully vaccinted.
            <br></br>Covaxin, Oxford/AstraZeneca is the third highest rank on the data table.
            </p>
            

            <h3>Tree Map Table: Total vaccines</h3>
            <svg width="700" height="400" style={{ border: "1px solid black", marginBottom: "25px" }}>
                <foreignObject width="100%" height="100%">
                    <iframe src="https://public.tableau.com/views/INFO474-5/Sheet5?:language=en&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no&:embed=true"
                    width="700" height="500"></iframe>
                </foreignObject>
            </svg>
            <p>This tree map table shows total vaccines by vaccine manufacturers. As you can see from previous data visualization.
            <br></br>The most popular vaccines is Johnson&Johnson, Moderna, Pfizer/BioTech and it indicates with biggest square with blue color.
            <br></br> However, the tables for the first highest ranking of vaccine and the second one show significant differences, but this graph does not show much difference on this graph.
            </p>

            <h2>Which country has the most vaccines?</h2>

            <h3>Data Table: Total vaccines</h3>
            <svg width="400" height="700" style={{ border: "1px solid black", marginBottom: "25px" }}>
                <foreignObject width="100%" height="100%">
                    <iframe src="https://public.tableau.com/views/INFO474-6/Sheet6?:language=en&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no&:embed=true"
                    width="400" height="700"></iframe>
                </foreignObject>
            </svg>
            <p>This data table shows the relationship between countries and total vaccinations.
            <br></br>There is no information on how many vaccines each country has in the actual dataset.
            <br></br>However, from seeing how the number of total vaccinations, Vaccine reserves can be measured.
            <br></br>The United States has the most vaccines, followed by China.
            </p>

            <h3>Tree Map Table: Vaccines by countries</h3>
            <svg width="700" height="400" style={{ border: "1px solid black", marginBottom: "25px" }}>
                <foreignObject width="100%" height="100%">
                    <iframe src="https://public.tableau.com/views/INFO474-7/Sheet7?:language=en&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no&:embed=true"
                    width="700" height="500"></iframe>
                </foreignObject>
            </svg>
            <p>This tree map shows more details such as the relationship between vaccine manufacturers and countries.
            <br></br>From this graph, we can check the United States has the most vaccines which is from Johnson&Johnson, Moderna, Pfizer/BioTech.</p>

            <h3>Bar Chart: Total Vaccines and People fully vaccinated by countries)</h3>
            <svg width="800" height="600" style={{ border: "1px solid black", marginBottom: "25px" }}>
                <foreignObject width="100%" height="100%">
                    <iframe src="https://public.tableau.com/views/INFO474-8/Sheet8?:language=en&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no&:embed=true"
                    width="800" height="600"></iframe>
                </foreignObject>
            </svg>
            <p>This bar graph shows the relationship between total vacciens and people fully vaccinted by countries.
            <br></br>total vacciens and people fully vaccinated are proportional, so the United States is the highest number on the both values.</p>

            <h2>Write-up</h2>
            <ol>
                <li>Which country is the most vaccinated?</li>
                <li>What is the most popular vaccine in the world?</li>
                <li>Which country has the most vaccines?</li>
            </ol>

            <p> From analyzing data and data visualization, I can answer these three qeustions. First of all, the most vaccinated countries
                is the "United States." Over 90M people get vaccinated and over 2M people get vaccinated daily in the United States.
                In order to see detailed information, I used the data table. And, to see the information visually, I created a bar graph and a geo graph.
                Next, the most poplar vaccine is Johnson&Johnson, Moderna, Pfizer/BioTech in the world. The second highest is Sinopharm/Bejing and the third highest vaccine is Covaxin, Oxford/AstraZeneca.
                Lastly, the country which has the most vaccien is the United States. There is no data about the vaccine retention, but we can assume through analyzing total vaccination and people fully vaccinated.
                Therefore, I can see the result that the United States has the most vaccines and the vaccine is Johnson&Johnson, Moderna, Pfizer/BioTech.
            </p>
        </div>
    );
};

export default App;