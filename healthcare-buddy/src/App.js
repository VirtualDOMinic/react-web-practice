import React, { useState, useEffect } from "react";
import logo from "./NHS-Logo.svg";
import "./App.css";
import { filterDataToShowAvailableJobs } from "./utils";

const STAFF_DATA_API_URL =
  "https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions";

const locum = {
  // TODO: Use this to initialise state, then allow user to update?
  id: "1234",
  firstName: "John",
  lastName: "Doe",
  staffType: "gp",
  staffTypeId: "1",
};

const ShiftDataRow = ({ data }) => {
  const {
    practice,
    startDatetime,
    endDatetime,
    hourlyRate,
    applicationIds,
  } = data;

  // Probably not the most robust way to show dates and times, but works well for time constraint
  // TODO: Probably makes sense to show timezone of times being displayed
  const shiftDate = new Date(startDatetime).toString().slice(0, 15);
  const startTime = new Date(startDatetime).toTimeString().slice(0, 5);
  const endTime = new Date(endDatetime).toTimeString().slice(0, 5);

  return (
    <tr>
      <td>{practice.name}</td>
      <td>{shiftDate}</td>
      <td>{startTime}</td>
      <td>{endTime}</td>
      <td>£{hourlyRate}</td>
      <td>{applicationIds.length}</td>
    </tr>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // TODO: Make an `isMounted` check before any state setting to avoid "Can't perform a React state update on an unmounted component" warnings in test suite
    fetch(STAFF_DATA_API_URL)
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
        }
        return res.json();
      })
      .then((json) => {
        setIsLoading(false);
        setData(filterDataToShowAvailableJobs(json.data));
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  if (isError) {
    // TODO: Better-integrated error handling and error state UI
    // TODO: Button to re-fetch (e.g. re-trigger the `useEffect`)
    return (
      <main>
        <h1>Error loading data</h1>
        <p>
          Unfortunately, an error occurred when loading your data. Please
          refresh the page to try again
        </p>
      </main>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Healthcare Buddy</h1>
        <p>
          Finding the best {locum.staffType} jobs for {locum.firstName}{" "}
          {locum.lastName}{" "}
        </p>
      </header>
      {isLoading ? (
        "Loading..."
      ) : (
        <main className="results-container">
          {/* TODO: Entire table _could_ be its own component, rather than just using the `<ShiftDataRow />` */}
          <div className="responsive-table">
            <table>
              <caption>
                <h2>List of available shifts</h2>
              </caption>
              <thead>
                <tr>
                  <th>Practice Name</th>
                  <th>Shift Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Hourly Rate (GBP)</th>
                  <th>Number of Applicants</th>
                </tr>
              </thead>
              <tbody>
                {data.map((x) => (
                  <ShiftDataRow key={x.id} data={x} />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
