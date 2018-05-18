var apikey = '15a643a8648743008357dc404ef77d82';
const main = document.querySelector("#div");
const selector = document.querySelector("#selector");
const defineDefault = "the-washington-post"
window.addEventListener('load', async e => {
    updatedNews();
    await updatedSources();
    selector.value = defineDefault;
    selector.addEventListener('change', e => {
        updatedNews(e.target.value)
    })

})

async function updatedSources() {
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json()
    console.log(json);
    selector.innerHTML = json.sources
        .map(src => `<option value="${src.id}">${src.name}</option>`).join('\n')
}
async function updatedNews(source = defineDefault) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`);
    const json = await res.json();
    console.log(json);
    main.innerHTML = json.articles.map(createArticles).join('\n')

}

function createArticles(article) {
    return `
    <div class="col-md-8 col-md-offset-2">
    <h2 class='h2'>${article.title}</h2>
    <img class="img-rounded" width='100%' src="${article.urlToImage}" />
    <p class='h4'>${article.description}</p>
</div>
`

}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./script/sw.js')
        .then(function () {
            console.log('Service Worker Registered');
        });
    }