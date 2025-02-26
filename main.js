const API_KEY = `3ab184f8ae2e43c3a3c4f717a579bb1a`;
let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await (await fetch(url)).json();
    news = response.articles;
    console.log(response);
}

getLatestNews();