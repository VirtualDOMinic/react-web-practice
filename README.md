# react-web-practice

See how my React web skills are with a ~2 hour challenge!

## Task

- [ ] Use the selected staff type (`"gp"`) to show a list of available positions
  - [ ] Use this source for the data: `https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions`
  - [ ] Only show future shifts
  - [ ] Only show shifts with status of `"POSTED"`
  - [ ] Only show shifts with locum of `null` on session object

## Goals (minimum)

- [ ] Functionality listed under "Task" heading
- [x] Add instructions for running (and testing) to this readme
- [ ] Ensure a11y fundamentals are present (where applicable: contrast, semantic html, labels, tabbing, alt text)
- [ ] Add unit tests (Jest)
- [ ] Add component/integration tests (react testing library?)
- [ ] Add basic error handling
- [ ] Add basic loading state handling

## Nice to have

- [ ] More organised repo (files/directories) and code structure
- [ ] Confirm functionality and a11y on FF and Safari
- [ ] Type safety! Ideally TS but could give flow a go
  - [Adding flow to CRA](https://create-react-app.dev/docs/adding-flow/)
- [ ] e2e (cypress) tests - more time consuming
- [ ] Show user a page where they can select what staff type they are, or update all their details
- [ ] Nicer styling
  - [ ] Responsive layout / mobile-first
- [ ] More logic for shift startTime:
  - [ ] Add a warning if shift imminent
  - [ ] Add sorting (e.g. by shift time)
- [ ] Add user-selected filter options (e.g. filter for date range or by other `staffType`)
- [ ] Persisted data (e.g. save staff type to localstorage and use that to rehydrate state on pageload)

## How to run this project

1) Clone the repo, then `cd react-web-practice/healthcare-buddy`
2) If you'd like to **run the app locally**, run `yarn start` or `npm start` in the `healthcare-buddy` directory
   1) This should open a tab in your default browser with the project running on `localhost:3000`
   2) Ensure you don't have something else running on this port
3) If you'd like to **run the unit tests**, run `yarn test` or `npm run test` in the `healthcare-buddy` directory
