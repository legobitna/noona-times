const API_KEY = "XGtguBOOaRPYsGvo9lKKmMgUlmHxcMLX";
const news_api = "b1fe516cb2ff4032b010ec5773f3a973";

//https://app.newscatcherapi.com/dashboard/

let articles = [];
const getapi = async () => {
  let url = `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10`;
  let h = new Headers();
  h.append("x-api-key", `HAb-VwD8jA1lFdszL-lwITEkRTIlYrTwPo-eSBa-IQk`);
  //   let url = `https://newsapi.org/v2/everything?q=tesla&from=2021-10-11&sortBy=publishedAt&apiKey=${news_api}`;
  let response = await fetch(url, { method: "GET", headers: h });
  let data = await response.json();
  articles = data.articles;
  console.log(data);
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
