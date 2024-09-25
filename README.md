# Overview

This app uses the Spotify API to display a user's top tracks and artists.

![user_view](/screenshots/user_view.png)

The user can choose the type of data to display (top tracks or top artists), the time range for the
data (e.g. within the last month, within the last 6 months), and the number of results to be
displayed. [Read more about the API calls being used.](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks)

This app currently requires the user to provide their own Spotify API credentials (more on that
below). If the user does not provide them, the app displays global top tracks and artists based
on static sample data.

![global_view](/screenshots/global_view.png)

# Running the app

This is a React app with a Flask backend. To run the app, you will need to run the React app
in one terminal and the Flask app in another.

## Running Flask

Ensure python is installed. Then, create and activate a virtual environment.
```
python -m venv spotify-venv
source spotify-venv/bin/activate
```

Install the dependencies, stored in `requirements.txt`
```
pip install -r requirements.txt
```

Save your Spotify API credentials in a `.env` file, which should look like this:
```
SPOTIPY_CLIENT_ID=your_client_id
SPOTIPY_CLIENT_SECRET=your_client_secret
SPOTIPY_REDIRECT_URI=your_redirect_uri
```

If you have already set up your developer account, you can find your credentials in 
your [Dashboard.](https://developer.spotify.com/dashboard)

If you haven't used the Spotify Web API before and would like to, [start here.](https://developer.spotify.com/documentation/web-api)

Finally, run the app
```
python app.py
```

## Running React

Simply run `npm start`. Keep reading for more details on React and how this app was built.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
