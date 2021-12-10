//https://app.newscatcherapi.com/dashboard/
// this api will be expired in 30 days 0109
const API_KEY = "HJlSbT4q0e1faiWW-smEmD8BozoxFYqDdxIgldSKJyc";
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
    url.searchParams.set("page", page); // 8.page를 달아준다
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error(data.status);
      }

      articles = data.articles;
      console.log("articles", articles);
      totalPage = data.total_pages;
      render();
      renderPagenation();
    } else {
      throw new Error(data.message);
    }
  } catch (e) {
    console.log("에러객체", e.name);
    errorRender(e.message);
  }
};
const getLatestNews = () => {
  page = 1; // 9. 새로운거 search마다 1로 리셋
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
                src="${
                  news.media ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }" />
        </div>
        <div class="col-lg-8">
            <a class="title" target="_blank" href="${news.link}">${
        news.title
      }</a>
            <p>${
              news.summary == null || news.summary == ""
                ? "내용없음"
                : news.summary.length > 200
                ? news.summary.substring(0, 200) + "..."
                : news.summary
            }</p>
            <div>${news.rights || "no source"}  ${moment(
        news.published_date
      ).fromNow()}</div>
        </div>
    </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = resultHTML;
};
const renderPagenation = () => {
  // 1.1~5까지를 보여준다
  // 2.6~10을 보여준다 => last, first 가필요
  // 3.만약에 first가 6 이상이면 prev 버튼을 단다
  // 4.만약에 last가 마지막이 아니라면 next버튼을 단다
  // 5.마지막이 5개이하이면 last=totalpage이다
  // 6.페이지가 5개 이하라면 first = 1이다
  let pagenationHTML = ``;
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  if (last > totalPage) {
    // 마지막 그룹이 5개 이하이면
    last = totalPage;
  }
  let first = last - 4 <= 0 ? 1 : last - 4; // 첫그룹이 5이하이면
  if (first >= 6) {
    pagenationHTML = `<li class="page-item" onclick="pageClick(1)">
                        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                      </li>
                      <li class="page-item" onclick="pageClick(${page - 1})">
                        <a class="page-link" href='#js-bottom'>&lt;</a>
                      </li>`;
  }
  for (let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item ${i == page ? "active" : ""}" >
                        <a class="page-link" href='#js-bottom' onclick="pageClick(${i})" >${i}</a>
                       </li>`;
  }

  if (last < totalPage) {
    pagenationHTML += `<li class="page-item" onclick="pageClick(${page + 1})">
                        <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
                       </li>
                       <li class="page-item" onclick="pageClick(${totalPage})">
                        <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
                       </li>`;
  }

  document.querySelector(".pagination").innerHTML = pagenationHTML;
};

const pageClick = (pageNum) => {
  //7.클릭이벤트 세팅
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

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
