import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import App from "./App";

// TODO: perhaps go on to use `nock` to mock API call, and then - along with mocked Date.now - can look for more specific things in the DOM (e.g. specific data in table)

// TODO: can mock 500/404 errors to test handling of that

afterEach(cleanup);

test("Displays title of app", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/healthcare buddy/i);

  expect(linkElement).toBeInTheDocument();
});

test("Displays a loading message before data fetched (initial render)", () => {
  const { getByText } = render(<App />);

  expect(getByText(/Loading/)).toBeInTheDocument();
});

test("Displays a table with expected headings", async () => {
  const { getByText } = render(<App />);

  const tableCaption = await waitForElement(() =>
    getByText("List of available shifts")
  );

  const firstTableHeading = await waitForElement(() =>
    getByText("Practice Name")
  );

  expect(tableCaption).toBeInTheDocument();
  expect(firstTableHeading).toBeInTheDocument();
});
