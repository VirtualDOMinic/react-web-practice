# react-web-practice

See how my React web skills are with a ~2 hour challenge!

## Task

- [x] Use the selected staff type (`"gp"`) to show a list of available positions
  - [x] Use this source for the data: `https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions`
  - [x] Only show future shifts
  - [x] Only show shifts with status of `"POSTED"`
  - [x] Only show shifts with locum of `null` on session object

## Completed goals

### Minimum

- [x] Functionality listed under "Task" heading
- [x] Add instructions for running (and testing) to this readme
- [x] Ensure a11y fundamentals are present (where applicable: contrast, semantic html, labels, tabbing, alt text)
  - **Note**: I have used semantic HTML, and contrast is definitely accessible, so the basics are done. If I decide to move away from a table (e.g. to an `ol` with styled `divs` to display the content instead) for the data, more a11y considerations will be required
  - Page passes the Lighthouse "Accessibility" and "Best Practices" checks with 100%. This cannot account for everything, though.
- [x] Add util function unit test(s)
- [x] Add component unit/integration tests

### Extra

- [x] Add basic error handling
- [x] Add basic loading state handling
- [x] Confirm functionality and a11y on Chrome, FF and Safari (desktop)

## Nice to have (future plans)

Assuming this project continued to grow, the following changes would be useful:

### Developer QoL enhancements and improved app robustness

- More organised file structure in repo
- Move to `styled-components` or `css modules` for scoped - and therefore more scalable - styling
- Type safety with TS or Flow
- More tests, including API mocks and e2e tests e.g. via Cypress (overkill for this MVP though)

### Feature, UX and/or UI enhancements

- Responsive / mobile-first layout
- Perhaps a move away from using a table to display the data: would require more work to ensure it's accessible, but makes it easier to introduce nicer layout/styling
- Show user a page where they can select what staff type they are, or update all their details
- More logic for shift startTime:
  - Add a warning if shift imminent
  - Add sorting (e.g. chronological)
- Add user-selected filter options (e.g. filter for date range or by other `staffType`)
- Persisted data (e.g. save staff type / user object to localstorage and use that to rehydrate state on pageload)

## When reading the code

Look out for comments containing `TODO: ` for plans for this code in future, in addition to the "Nice to have" section above.

Other comments are in the code to make some parts of my reasoning clearer.

### Files of interest (all in `src/`)

- `App.js`
- `App.css`
- `App.test.js`
- `utils.js`
- `utils.test.js`

## How to run this project

1) Clone the repo, then `cd react-web-practice/healthcare-buddy`
2) If you'd like to **run the app locally**, run `yarn start` or `npm start` in the `healthcare-buddy` directory
   1) This should open a tab in your default browser with the project running on `localhost:3000`
   2) Ensure you don't have something else running on this port
3) If you'd like to **run the unit tests**, run `yarn test` or `npm run test` in the `healthcare-buddy` directory

For more details, you can read the `README.md` in the `healthcare-buddy` directory
