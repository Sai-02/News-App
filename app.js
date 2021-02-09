let apiKey = "484fce9988ba44c5ae146336a846dd6d";
let source = "the-times-of-india";
let newsSection = document.getElementById("news-section");
let welcomeSection = document.getElementById("welcome-section");

const fetchNews = document.getElementById("fetch-news");
fetchNews.addEventListener("click", function () {
  welcomeSection.innerHTML = `<h3>Fetching the latest news</h3>
  <img src="./Images/loading.gif" alt="" >`;
  setTimeout(() => {
    showNews();
  }, 2000);
});

function showNews() {
  // $.ajax({
  //   url: `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
  //   type: "GET",
  //   onsuccess: function(r){
  //     console.log(r);
  //   },
  //   failure: function(r){
  //     console.log(r);
  //   }
  // })
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
    true
  );
  // xhr.open(
  //   "GET",
  //   "http://newsapi.org/v2/top-headlines?country=in&apiKey=484fce9988ba44c5ae146336a846dd6d",
  //   true
  // );

  // const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
  // axios.get(url)
  // .then(data=>console.log(data))
  // .catch(err=>console.log(err))

  xhr.onreadystatechange;
  xhr.onload = function () {
    if (this.status == 200) {
      let json = JSON.parse(this.responseText);
      console.log(json);
      let length = json.length;
      let newsSectionHtml = ``;

      console.log("nsnvlsdv");
      let articles = json.articles;

      articles.forEach(function (element) {
        newsSectionHtml += ` <article class="news-article">
        <div class="news-img-container">
          <img
            src="${element.urlToImage}"
            alt="eth4h"
          />
        </div>
        <div class="news-article-content">
          <div class="date-source-container">
            <span class="date color">${element.publishedAt}</span>
            
          </div>
          <h3>
            ${element.title}
          </h3>
          <p>
            ${element.description}
          </p>
          <div class="read-more-btn-container">
            <button class="read-more-btn"><a href=${element.url} target="_blank">Read More</a></button>
          </div>
        </div>
      </article>`;
      });
      newsSection.innerHTML = newsSectionHtml;
      welcomeSection.innerHTML = `
      <h1> Here are your top news!!!</h1>
      <div class="hr-container"><hr></div>
      
      `;
      console.log("welcome changed");
    } else {
      document.getElementById("welcome-section").style.display = "none";
      document.getElementById("error-section").style.display = "block";
    }
  };
  xhr.send();
}
