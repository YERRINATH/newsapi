# News Fetcher

This is a simple web application that fetches and displays news articles using the [NewsAPI](https://newsapi.org/). The application dynamically loads more articles as the user scrolls down.

## Setup

1. Obtain an API key from [NewsAPI](https://newsapi.org/).
2. Replace the placeholder `apiKey` in the `js` file with your obtained API key.

    ```javascript
    const apiKey = 'YOUR_API_KEY';
    ```

3. Open the `api.html` file in a web browser to view the news articles.

## Features

- Fetches top headlines from the NewsAPI.
- Infinite scrolling: Loads more articles as the user scrolls down.
- Responsive design: Displays news articles in a responsive grid layout.

## Code Structure

- `api.html`: HTML file containing the structure of the web page.
- `style.css`: CSS file for styling the web page.
- `api.js`: JavaScript file for fetching news, rendering articles, and handling infinite scrolling.

## Usage

1. Open the `api.html` file in a web browser.
2. Scroll down to load more news articles dynamically.
3. Click on "Read more" to view the full article on a new tab.

