const API_KEY = `3ab184f8ae2e43c3a3c4f717a579bb1a`;
let newsList = [];
let buttonNames = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];

const getLatestNews = async () => {
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await (await fetch(url)).json();
    newsList = response.articles;
    render();
}

const renderButton = () => {
    const buttonHTML = buttonNames.map(button =>
        `<button class="menu-button">${button}</button>`
    ).join('');
    console.log(buttonHTML)
    document.getElementById('menus').innerHTML = buttonHTML;
}

const render = () => {
    const newsHTML = newsList.map(news =>
        `<div class="row news">
                <div class="col-lg-5">
                    <img class="news-img-size"
                        src="${news.urlToImage}" />
                </div>
                <div class="col-lg-7">
                    <h2>${news.title}</h2>
                    <p>${news.description}</p>
                    <div>
                        ${news.source.name} * ${news.publishedAt}
                    </div>
                </div>
            </div>`
    ).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
}

const addEventListenersToButtons = () => {
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log(event.target.innerText.toLowerCase());
            const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${event.target.innerText.toLowerCase()}&apiKey=${API_KEY}`);
            try {
                const response = await fetch(url);
                const data = await response.json();
                newsList = data.articles;
                render();
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        });
    });
};


getLatestNews();
renderButton();
addEventListenersToButtons();