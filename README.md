# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Dashboard Application

This repository contains the code for a health and wellness dashboard application. The dashboard provides users with access to various features, including viewing their profile, setting and tracking nutrition and exercise goals, and more.

## Features

- **Responsive Sidebar**: Toggleable sidebar with links to different sections, including Home, Profile, Nutrition Goal, Exercise Model, and Goal & Tracking.
- **User Information**: Displays basic user information (weight, height, age) retrieved from a database.
- **Goal Tracking**: Shows progress on various goals such as Running, Sleeping, and Weight Loss.
- **Logout Functionality**: Users can securely log out, which clears the authentication token from local storage.

## Project Structure

- **Components**
  - `Dashboard.js`: Main file for the dashboard, handling routing and UI for different sections.
  - `home.js`, `profile.js`, `nutritiongoal.js`, `exerciseModel.js`, `goal.js`: Components that render the content for each section.

- **Assets**
  - Icons and images such as `hamburger.png`, `home.png`, `profile.png`, etc., located in `assets/`.
  - External CSS (`index.css`) for styling.

## Getting Started

### Prerequisites

- **Node.js** and **npm** are required.
- **Backend server**: An API server should be running locally at `https://health-and-wellness-app-back-end.onrender.com` to handle user and goal data requests.
- **Authentication**: The app expects a valid token stored in `localStorage` under the key `token`.

- **Backend API**: Ensure a compatible backend server is running. The app sends requests to:

    - **GET /dashboard**: For fetching user data.
    - **GET /goaltrackers/view**: For retrieving goal tracking data.
    - ect.

**Authentication**

- This application uses token-based authentication. On successful login, a token should be stored in localStorage under the key token. The app verifies the token on each page load and redirects to login if the token is invalid or expired.

**Code Structure and Key Functions**

- **Toggle Sidebar**: toggleSidebar toggles the sidebar's visibility.
- **Section Navigation**: handleSectionClick sets the active section in the state, determining which component to render in the main content area.
- **Data Fetching**:
    - useEffect with an Axios GET request retrieves user data and goal tracking information on component mount.
- **Logout**: handleLogout clears the token from localStorage and redirects to the login page.

**Built With**

- **React** - Frontend framework for building the UI.
- **Axios** - For making HTTP requests to the backend.
- **CSS** - For styling and layout, including responsive design.