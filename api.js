const apiKey = '85c93406342a47caae7d0280d2f01e8d';
const apiUrl = 'https://newsapi.org/v2/top-headlines';
let page = 1; // Initial page number
const pageSize = 30;

// Function to fetch news based on page number
const fetchNews = () => {
  const params = {
    apiKey: apiKey,
    country: 'in',
    pageSize: pageSize,
    page: page,
  };

  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const url = `${apiUrl}?${queryString}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Increment page for the next request
      page++;
      return data;
    });
};

// Function to render news articles
const renderNews = articles => {
  const newsContainer = document.getElementById('newsContainer');

  articles.forEach(article => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('col-md-4', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('card');

    if (article.urlToImage) {
      const img = document.createElement('img');
      img.src = article.urlToImage;
      img.alt = article.title;
      img.classList.add('card-img-top');
      card.appendChild(img);
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = article.title;
    cardBody.appendChild(title);

    const author = document.createElement('p');
    author.classList.add('card-text');
    author.textContent = 'Author: ' + (article.author || 'Unknown');
    cardBody.appendChild(author);

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = 'Description: ' + article.description;
    cardBody.appendChild(description);

    const urlLink = document.createElement('p');
    const url = document.createElement('a');
    url.href = article.url;
    url.target = '_blank';
    url.textContent = 'Read more';
    urlLink.classList.add('card-text');
    urlLink.appendChild(url);
    cardBody.appendChild(urlLink);

    const publishedAt = document.createElement('p');
    publishedAt.classList.add('card-text');
    publishedAt.textContent = 'Published At: ' + article.publishedAt;
    cardBody.appendChild(publishedAt);

    card.appendChild(cardBody);
    articleDiv.appendChild(card);
    newsContainer.appendChild(articleDiv);
  });
};

// Function to handle scroll events and trigger fetching more news
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const clientHeight = window.innerHeight;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchNews()
      .then((data) => {
        if (data.status === "ok") {
          if (data.articles.length > 0) {
            renderNews(data.articles);
          } else {
            // No more articles to fetch, remove the scroll event listener
            window.removeEventListener("scroll", handleScroll);
          }
        } else {
          console.error("Error fetching news:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching news:", error.message);
      });
  }
};


// Initial load of news
fetchNews()
  .then(data => {
    if (data.status === 'ok') {
      renderNews(data.articles);
    } else {
      console.error('Error fetching news:', data.message);
    }
  })
  .catch(error => {
    console.error('Error fetching news:', error.message);
  });

// Attach the scroll event listener// Attach the scroll event listener to the document
document.addEventListener('scroll', handleScroll);

