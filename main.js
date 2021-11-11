//https://app.newscatcherapi.com/dashboard/
// this api will be expired in 30 days
const API_KEY = "HAb-VwD8jA1lFdszL-lwITEkRTIlYrTwPo-eSBa-IQk";
let articles = [];
let page = 1;
let totalPage = 1;
let menus = document.querySelectorAll("#menu-list button");
menus.forEach((menu) =>
  menu.addEventListener("click", (e) => getNewsByTopic(e))
);

const getNews = async (url) => {
  try {
    let header = new Headers();
    header.append("x-api-key", API_KEY);
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    articles = data.articles;
    totalPage = data.total_pages;
    console.log(articles);
    render();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error(data.status);
      }
      articles = data.articles;
      totalPage = data.total_pages;
      console.log(url);
      console.log(articles);
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (e) {
    errorRender(e.message);
  }
};
const getLatestNews = () => {
  let url = `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10`;
  getNews(url);
};

const getNewsByTopic = (event) => {
  let topic = event.target.textContent.toLowerCase();
  let url = `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`;
  getNews(url);
};
const render = () => {
  let resultHTML = articles
    .map((news) => {
      return `<div class="news row">
        <div class="col-lg-4">
            <img class="news-img"
                src="${news.media}" />
        </div>
        <div class="col-lg-8">
            <a class="title" target="_blank" href="${news.link}">${news.title}</a>
            <p>${news.summary}</p>
            <div>${news.rights} * ${news.published_date}</div>
        </div>
    </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = resultHTML;
};

const errorRender = (message) => {
  document.getElementById(
    "news-board"
  ).innerHTML = `<h3 class="text-center alert alert-danger mt-1">${message}</h3>`;
};
getLatestNews();

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
