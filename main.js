//https://app.newscatcherapi.com/dashboard/
// this api will be expired in 30 days
const API_KEY = "HAb-VwD8jA1lFdszL-lwITEkRTIlYrTwPo-eSBa-IQk";
let articles = [];
let page = 1;
let totalPage = 1;
let url = new URL(
  "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10"
);
let menus = document.querySelectorAll("#menu-list button");
menus.forEach((menu) =>
  menu.addEventListener("click", (e) => getNewsByTopic(e))
);

const getNews = async () => {
  try {
    let header = new Headers();
    header.append("x-api-key", API_KEY);
    url.searchParams.set("page", page);
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    articles = data.articles;
    totalPage = data.total_pages;
    console.log("dd", data, "url", url);
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
      renderPagenation();
    } else {
      throw new Error(data.message);
    }
  } catch (e) {
    errorRender(e.message);
  }
};
const getLatestNews = () => {
  page = 1;
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10`
  );
  getNews();
};

const getNewsByTopic = (event) => {
  let topic = event.target.textContent.toLowerCase();
  page = 1;
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews();
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const searchNews = () => {
  let keyword = document.getElementById("search-input").value;
  page = 1;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();
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
            <a class="title" target="_blank" href="${news.link}">${
        news.title
      }</a>
            <p>${news.summary}</p>
            <div>${news.rights || "no source"} * ${news.published_date}</div>
        </div>
    </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = resultHTML;
};
const renderPagenation = () => {
  let pagenationHTML = ``;
  let pageGroup = Math.ceil(page / 10);
  let last = pageGroup * 10;
  if (last > totalPage) {
    last = totalPage;
  }
  let first = last - 9 <= 0 ? 1 : last - 9;
  if (first >= 11) {
    pagenationHTML = `<li class="page-item" onclick="pageClick(1)">
                        <a class="page-link" href='#js-bottom' id='allprev'>&lt;&lt;</a>
                      </li>
                      <li class="page-item" onclick="pageClick(${page - 1})">
                        <a class="page-link" href='#js-bottom' id='allprev'>&lt;</a>
                      </li>`;
  }
  for (let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item ${i == page ? "active" : ""}" >
                        <a class="page-link" href='#js-bottom' id='page-${i}' onclick="pageClick(${i})" >${i}</a>
                       </li>`;
  }

  if (last < totalPage) {
    pagenationHTML += `<li class="page-item" onclick="pageClick(${page + 1})">
                        <a  class="page-link" href='#js-program-detail-bottom'  id='next'>&gt;</a>
                       </li>
                       <li class="page-item" onclick="pageClick(${totalPage})">
                        <a class="page-link" id='allnext'>&gt;&gt;</a>
                       </li>`;
  }

  document.querySelector(".pagination").innerHTML = pagenationHTML;
};

const pageClick = (pageNum) => {
  page = pageNum;
  window.scrollTo({ top: 0, behavior: "smooth" });
  getNews();
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
