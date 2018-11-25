// Create instance
const newsService = new NewsService(new CustomHttp());
const newsUI = new NewsUI();

// UI elements
const countrySelect = document.querySelector(".country");
const categorySelect = document.querySelector(".category");
const form = document.forms["form-search"];
const inpit_search = form["search-value"];
const reset_form = document.querySelector(".reset");

const getCountryTechnolodyHandler = () => {
    const country = countrySelect.value;
    const category = categorySelect.value;

    newsService.fetchTopHeadlines((res) => {
        const { articles, totalResults } = res;

        newsUI.clearContainer();
        articles.forEach(news => newsUI.addNews(news));
    }, country, category);
};

countrySelect.addEventListener("change", getCountryTechnolodyHandler);
categorySelect.addEventListener("change", getCountryTechnolodyHandler);
window.addEventListener("load", getCountryTechnolodyHandler);

form.addEventListener("submit", e => {
    e.preventDefault();
    const search = inpit_search.value;

    newsService.fetchSearchTopHeadlines((res) => {
        const { articles } = res;

        newsUI.clearContainer();

        if (articles.length) {
            articles.forEach(news => newsUI.addNews(news));
        } else {
            newsUI.ifNotFoundNews();
        }
    }, search);

    form.reset();
});

reset_form.addEventListener("click", e => {
    e.preventDefault();
    form.reset();
});