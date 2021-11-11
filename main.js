const API_KEY = "XGtguBOOaRPYsGvo9lKKmMgUlmHxcMLX";
const news_api = "b1fe516cb2ff4032b010ec5773f3a973";
let articles = [];
const getapi = async () => {
  let url = `https://newsapi.org/v2/everything?q=tesla&from=2021-10-11&sortBy=publishedAt&apiKey=${news_api}`;
  let response = await fetch(url);
  let data = await response.json();
  articles = data.articles;
  console.log(articles);
  render();
};

const render = () => {
  let resultHTML = articles
    .map((news) => {
      return `<h1>${news.title}</h1>`;
    })
    .join("");
  document.getElementById("show").innerHTML = resultHTML;
};
getapi();
