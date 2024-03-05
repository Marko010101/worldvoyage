# Project WorldVoyage

Project WorldVoyage is a web application providing functionalities for user authentication, marking the location on the map, and adding to the list with text and date. It utilizes React for the frontend, Firebase for user authentication, and localStorage for city data storage. After user logins in the sidebar is listed cities which are empty and can be added on click of the map right side, which is a React-Leaflet library. On click of territory, it automatically opens the form on the sidebar where the first one is city name autofilled depending on the place using "https://www.bigdatacloud.com/" reverse geocoding, also user can fill the form using "DatePicker" library, and last part of form to add note about trip. Routes have cities and countries main but also the route is changing depending on the click latitude and longitude.

## Overview

In this project, users can register and log in using Firebase authentication. React Router is employed for navigating between different pages. Two contexts, `CitiesContext` and `AuthContext`, are implemented for managing city-related state and authentication state, respectively. Both contexts utilize `useReducer` for state management.

## Features

- **User Authentication**: Firebase is used for user registration and login.
- **City Management**: City data is stored in the browser's localStorage. Users can view, add, and delete cities.
- **Geolocation**: Users can obtain their location by clicking the 'Use your location' button.
- **URL Position Handling**: The application adjusts the map position based on latitude and longitude parameters in the URL.
- **Datepicker Integration**: When the form is open, users can select dates using the Datepicker package.
- **localStorage**: Upon clicking 'Add', the city is added to the city list object, which is then saved in localStorage.

## Lazy Loading

Lazy loading is implemented to optimize the loading of components, resulting in decreased initial loading time and improved user experience.

## Project Structure

- **`src`**: Contains the source code for the React application.
  - **`pages`**: Main pages of the application.
  - **`components`**: Reusable components used throughout the application.
  - **`contexts`**: Context providers for managing application state.
  - **`App.jsx`**: Main component setting up routing and context providers.

## Usage

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`

## Dependencies

- `react-router-dom`: For client-side routing.
- `firebase`: For user authentication.
- `uuid`: For generating unique IDs.

## Adding Cities via Form

To add a city to the list, users can click on the map to open a form on the sidebar. The form will automatically fill in the city name based on the clicked location using reverse geocoding from the "https://api.bigdatacloud.net/data/reverse-geocode-client" API. Users can select the date of the trip using the DatePicker library and add any notes about the trip. Upon clicking the 'Add' button, the city will be added to the list and the user will be redirected to the cities page.
