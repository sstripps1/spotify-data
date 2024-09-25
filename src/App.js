"use client";

import React, { useEffect, useState } from "react";

// Create a row for the table
function TableRow({ top, type }) {
  if (type === "tracks") {
    return (
      <tr>
        <td>{top.rank}</td>
        <td>{top.name}</td>
        <td>{top.artist}</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{top.rank}</td>
        <td>{top.name}</td>
      </tr>
    )
  }
}

// Radio buttons for type of table (ie top tracks or top artists)
function TableType({ typeToggle, onSelectionChange }) {
  const buttons = (
    <div>
      <form name="typeForm">
        <input type="radio" name="typeToggle" value="tracks" checked={typeToggle === "tracks"} onChange={onSelectionChange} /> Top Tracks
        <input type="radio" name="typeToggle" value="artists" checked={typeToggle === "artists"} onChange={onSelectionChange} /> Top Artists
      </form>
    </div>
  );
  return buttons;
}

// Radio buttons for time range (ie 1 month, 6 months, 1 year)
function TimeRange({ timeRangeToggle, onSelectionChange }) {
  const buttons = (
    <div>
      <form name="timeRangeForm">
        <input type="radio" name="timeToggle" value="1Month" checked={timeRangeToggle === "1Month"} onChange={onSelectionChange} /> 1 Month
        <input type="radio" name="timeToggle" value="6Months" checked={timeRangeToggle === "6Months"} onChange={onSelectionChange} /> 6 Months
        <input type="radio" name="timeToggle" value="1Year" checked={timeRangeToggle === "1Year"} onChange={onSelectionChange} /> 1 Year
      </form>
    </div>
  );
  return buttons;
}

// Radio buttons for number of results to display (ie top 10 or top 50)
function NumResults({ numResultsToggle, onSelectionChange }) {
  const buttons = (
    <div>
      <form name="numResultsForm">
        <input type="radio" name="numResultsToggle" value="10" checked={numResultsToggle === "10"} onChange={onSelectionChange} /> Top 10
        <input type="radio" name="numResultsToggle" value="50" checked={numResultsToggle === "50"} onChange={onSelectionChange} /> Top 50
      </form>
    </div>

  );
  return buttons;
}

// Function to create the table of top tracks or top artists
function TopsTable({ topData, type, timeRange, numResults }) {
  let headings;
  const rows = [];
  if (type === "tracks") {
    headings = (
      <tr>
        <th>Rank</th>
        <th>Title</th>
        <th>Artist</th>
      </tr>
    );
  } else {
    headings = (
      <tr>
        <th>Rank</th>
        <th>Name</th>
      </tr>
    )
  }
  const numResultsInt = parseInt(numResults);
  let count = 0;
  for (let i = 0; i < topData.length; i++) {
    if (topData[i].category === type && topData[i].range === timeRange) { // verify that category and range match
      if (count < numResultsInt) {
        rows.push(
          <TableRow
            top={topData[i]}
            type={type}
            key={topData[i].rank}
          />
        );
        count++;
      }
      if (count >= numResultsInt) {
        break;
      }
    }
  }

  return (
    <table>
      <thead>{headings}</thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

// Parent component to hold the table and controls
function ToggleableTopsTable() {
  const [typeToggle, setTypeToggle] = useState("tracks");
  const [timeRangeToggle, setTimeRangeToggle] = useState("6Months");
  const [numResultsToggle, setNumResultsToggle] = useState("10");
  const [topData, setTopData] = useState([]);

  const fetchTopData = async (type, range) => {
    const response = await fetch(`/top_data?type=${type}&range=${range}`);
    const queryData = await response.json();
    setTopData(queryData.data);
  };

  const handleTimeChange = async (e) => {
    const value = e.target.value;
    setTimeRangeToggle(value);
    fetchTopData(typeToggle, value);
  }

  const handleTypeChange = async (e) => {
    const value = e.target.value;
    setTypeToggle(value);
    fetchTopData(value, timeRangeToggle);
  }

  const handleNumResultsChange = async (e) => {
    const value = e.target.value;
    setNumResultsToggle(value);
  }

  useEffect(() => {
    fetchTopData(typeToggle, timeRangeToggle);
  }, []);

  return (
    <div>
      <div class="controls">
        <div>
          <TableType typeToggle={typeToggle} onSelectionChange={handleTypeChange} />
          <TimeRange timeRangeToggle={timeRangeToggle} onSelectionChange={handleTimeChange} />
        </div>
        <NumResults numResultsToggle={numResultsToggle} onSelectionChange={handleNumResultsChange} />
      </div>
      <TopsTable class="topsTable" topData={topData} type={typeToggle} timeRange={timeRangeToggle} numResults={numResultsToggle} />
    </div>

  );
}


function App() {

  const [appTitle, setAppTitle] = useState("Spotify Data");
  const fetchAppTitle = async () => {
    const response = await fetch("/app_title");
    const titleData = await response.json();
    setAppTitle(titleData.title);
  }

  useEffect(() => {
    fetchAppTitle();
  }, "Spotify Data");

  return (
    <div className="app">
      <h1>{appTitle}</h1>
      <ToggleableTopsTable />
    </div>
  )
}



export default App;
