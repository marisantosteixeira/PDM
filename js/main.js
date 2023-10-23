//registrando a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
      postNews();
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}
let param = 'Apple';
const apiKey ='29a59e79b2714f908df4447340860f13';
let url = `https://newsapi.org/v2/everything?q=${param}&apiKey=${apiKey}`;
const main = document.querySelector('main');
const botao = document.getElementById('buscar');
const texto_busca = document.getElementById('texto_busca');

botao.addEventListener('click', () => {

 param= document.getElementById('texto_busca').value;
 url = `https://newsapi.org/v2/everything?q=${param}&apiKey=${apiKey}`;
 postNews()

});

async function postNews(){
  const res = await fetch(url);
  const data = await res.json();
  main.innerHTML = data.articles.map(createArticle).join('\n');
}

function createArticle(article){
  console.log(article);
  return `
  <div class="article">
  <a href="${article.url}" target="_blank">
  <img src"${article.urlToImage}" class="image" alt="${article.content}"/>
  <h2>${article.title}</h2>
  <p>${article.description}</p>
  </a>
  </div>
  `
}