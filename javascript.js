let json = "https://www.luizpicolo.com.br/api.json";
let XHR = new XMLHttpRequest();
XHR.open("GET", json);
XHR.responseType = "json";
XHR.send();

XHR.onload = function() {

  let noticia_nova = XHR.response;

  class Noticia {
    constructor(autor, data_publicacao, link, titulo, name) {
      this.name = name;
      this.link = link;
      this.titulo = titulo;
      this.data_publicacao = data_publicacao;
      this.autor = autor;
    }

    MostrarNo() {
      return `<div class="noticia">
            <div class="nova_noticia">
            <h4>${this.name}</h4>
            <h5>${this.data_publicacao}</h5>
            <a href="${this.link}"><h2>${this.titulo} 
            </h2></a> 
            </div>
            </div>
`;
    }

  }

  class NoticiaDestaque extends Noticia {
    constructor(imagem, autor, data_publicacao, titulo, name, resumo) {
      super(imagem, autor, data_publicacao, titulo, name, resumo)

      this.imagem = imagem;
      this.resumo = resumo
    }
    mostrarDestaque() {
      return `<div class="geralDestaque">
        <div class="noticiaDestaque">
        <h1> Notícias <h1>
        <img src="${this.imagem}"/>
        <h4 class="Data">${this.data_publicacao} </h4>
        </div>
        <a  href="${this.link}">
        <h2 class="Titulo" >${this.titulo}</h2></a>
        <p> ${this.resumo} </p>
        </div>
`;
    }
  }
  const nova = document.getElementById('noticia');

  let noticiaDestaque = new NoticiaDestaque(
    noticia_nova.articles[0].urlToImage,
    noticia_nova.articles[0].publishedAt,
    noticia_nova.articles[0].url,
    noticia_nova.articles[0].title,
    noticia_nova.articles[0].author,
    noticia_nova.articles[0].description);


  
  nova.insertAdjacentHTML('afterbegin', 
  noticiaDestaque.mostrarDestaque());

  console.log(noticiaDestaque);

   noticia_nova.articles.forEach(noticia => {
    let noticia_nova = new Noticia(noticia.source.name, 
    noticia.publishedAt, noticia.url, noticia.title, 
    noticia.author);
    nova.insertAdjacentHTML('beforeend', 
    noticia_nova.MostrarNo());
    console.log(noticia)
  })
};
