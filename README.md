## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### `npm run lint`

Checks your code with eslint. Use `npm run lint --fix` to fix errors automatically.

### `npm run format`

Formats your code according to prettier config.

### `npm run test-all`

Runs all tests, shows progress for each covered component.

### `npm run test-coverage`

Just like "npm run test-all" runs all tests, but also generates coverage report.

#
## Environment variables

### `REACT_APP_SERVER_API_URL`
Is an environment variable that specifies the URL of the backend server API

### `REACT_APP_LINK_TO_APPSTORE`
Contains a URL that points to the app store page for a mobile application

### `REACT_APP_LINK_TO_GOOGLEPLAY`
Contains a URL that points to the Google Play Store page for an Android application

### `REACT_APP_FACEBOOK_APP_ID`
Environment variable is used for Facebook-related integrations, in our case for social login

### `REACT_APP_GOOGLE_MAPS_API_KEY`
Contains a unique API key provided by Google for the Google Maps API

###  `REACT_APP_MAP_ITEM_LEARN_MORE_LINK`
URL pointing to a resource that provides additional information for the location on the map

### `REACT_APP_GOOGLE_MAPS_SEARCH_LINK`
Contains a URL that points to a Google Maps search page

### `REACT_APP_CREATE_NOW_CARREFOUR`
URL pointing to 'Create now' page for user to create their Carrefour(Retailer) loyalty ID

### `REACT_APP_MAP_ITEM_LEARN_MORE_CARREFOUR_LINK`
URL with additional information for Carrefour locations

### `REACT_APP_ONE_RETAILER`
Is needed ONLY if you want to use only one retailer. In that case it should be an ID of the retailer needed on the database.

#
## Dependencies  used

### `React`
Library for building user interfaces. It allows developers to create reusable UI components and manage the state of those components in a more efficient and effective way.

### `React Router DOM`
Library for implementing client-side routing in React applications. Needs to be inside overrides to avoid conflicts with 'React admin', which also uses it under hood

### `React-admin`
Framework for building administration panels and back-office applications. It provides a set of pre-built UI components and APIs

### `Jest`
Testing framework and test runner for building automated tests in web applications or Node.js projects

### `React Testing Library`
Library for testing React components. It provides a set of APIs for rendering React components in a test environment, and provides utilities for querying and interacting with the rendered components

### `Redux`
State management library for JavaScript applications

### `Swiper`
Library for creating touch-enabled, responsive sliders and carousels for web applications

### `React Transition Group`
Library for creating animated transitions and effects in React applications. It provides a set of components and utilities for managing the lifecycle of components as they enter and leave the DOM, and for animating changes in their style or content.

### `react-intl`
Library for internationalizing React applications. It provides a set of APIs and components for formatting and displaying text, dates, numbers, and other types of data in a way that is appropriate for the user's locale and language.

### `SASS`
Preprocessor scripting language that is compiled into CSS, which extends the capabilities of CSS

### `Axios`
Library for making HTTP requests from web browsers or Node.js applications
