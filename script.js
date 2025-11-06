const API_KEY = "b5661d21d1f9407eb4d8dc975e2f0535"
const Url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchNews("india"));


function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${Url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data)

    bindData(data.articles);

}

function bindData(articles) {

    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);


    });

}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name}. ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", (() => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}))

const usernameDisplays = document.querySelectorAll(".username");

const authButtons = document.querySelectorAll('.auth-button');

window.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true" && storedUser) {

        usernameDisplays.forEach(el => el.textContent = storedUser);

        authButtons.forEach(authButton => {
            authButton.textContent = "Logout"
        })
    }
    else {
        usernameDisplays.textContent = "Guest";
        authButtons.forEach(authButton => {
             authButton.textContent = "Login"

        })
       
    }

});

authButtons.forEach(authButton => {
    authButton.addEventListener("click", () => {

        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            localStorage.removeItem("username");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();

        } else {
            window.location.href = "login.html";
        }
    });
});

const menu = document.querySelector(".hamburger-menu");

const overlay = document.querySelector(".menu-overlay");

const icon = document.querySelector(".fa-bars");

icon.addEventListener("click", () => {
    menu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"
});

overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto"
})


function onNavItemClick(id) {
 
  fetchNews(id);

 
  const allNavItems = document.querySelectorAll('.nav-item');
  allNavItems.forEach(item => item.classList.remove('active'));

 
  const matchingItems = document.querySelectorAll(`#${id}`);
  matchingItems.forEach(item => item.classList.add('active'));


  const menu = document.querySelector(".hamburger-menu");
  const overlay = document.querySelector(".menu-overlay");
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

const mobileSearchIconTop = document.querySelector('.mobile-nav-top .fa-magnifying-glass');
const mobileNavBottom     = document.querySelector('.mobile-nav-bottom');
const mobileSearchInput   = document.getElementById('mobile-search-text');
const mobileSearchButton  = document.querySelector('.mobile-search-bar .search-icon-btn');

if (mobileSearchIconTop && mobileNavBottom && mobileSearchInput && mobileSearchButton) {

 
  mobileSearchIconTop.addEventListener('click', () => {
    mobileNavBottom.classList.toggle('show-search');  

    if (mobileNavBottom.classList.contains('show-search')) {
      mobileSearchInput.focus();                      
    }
  });

 
  mobileSearchButton.addEventListener('click', () => {
    const query = mobileSearchInput.value.trim();
    if (!query) return;

    fetchNews(query);                              
    mobileNavBottom.classList.remove('show-search');  
    mobileSearchInput.value = '';
  });

  
  mobileSearchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') mobileSearchButton.click();
  });
}


window.addEventListener("scroll", () => {
  const mobileNavBottom = document.querySelector(".mobile-nav-bottom");
  const mobileSearchInput = document.getElementById("mobile-search-text");

  
  if (mobileNavBottom.classList.contains("show-search") &&
      mobileSearchInput.value.trim() === "") {

    
    mobileNavBottom.classList.remove("show-search");
  }
});

