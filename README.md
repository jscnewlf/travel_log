# My Travel Logs - IPG Health

Desenvolver a Landing Page prototipada com o Front-End apartado do Back-End ou utilizar WP


## Requisitos:
**Front-End**: Utilizar as tecnologias que preferir para desenvolver o teste, mas é necessário que sejam utilizadas HTML5, CSS3 (SASS é melhor ainda), JavaScript e/ou frameworks.

**Back-End**: Crie um endpoint no mockapi e cadastre até 6 depoimentos para consumir no front-end e criar o carousel.
## Tecnologias
- NextJS
- Axios
- Express
- Tailwind
- React Slick
- Multer

## Resumo do Projeto
O projeto consiste em duas partes: **Landing Page** *http://localhost:3000/* e **Tela Admin** *http://localhost:3000/admin*

Os blocos de artigos no header e o bloco de depoimentos foram alimentados usando o *MockAPI*. Já os blocos do menu, *inspirational* (bloco miolo) e footer são alimentados por arquivos *JSON* dentro da pasta backend.

A ideia da tela admin é poder trocar livremente os conteúdos de texto e imagens. Sendo assim é possível *LER* e *EDITAR* os conteúdos dos objetos criados tanto via MockAPI quanto JSON. Segue as rotas e sua estruturação:

- MockAPI:
**Articles**:
```
//https://64e6b6a009e64530d1802db5.mockapi.io/api/articles
{
    title: string;
    subtitle: string;
    image: string;
    isPrincipal: boolean; //Responsável por decidir qual dos artigos será disposto em destaque no front
}
```
**Depoiments**:
```
//https://64e6b6a009e64530d1802db5.mockapi.io/api/depoiments
{
    name: string;
    avatar: string;
    comment: string;
}
```
- JSON:
**Menu**:
```
/api/menu/getData && /api/menu/updateData
{
    pageName: string;
    pageLink: string;
}
```

**Inspirational**:
```
/api/inspirational/getData && /api/inspirational/updateData
{
    mainTitle: string,
    secondaryTitle: string,
    secondaryParagraph: string,
    tertiaryTitle: string,
    tertiaryParagraph: string,
    image: string,
    imageAlt: string
}
```

**Footer**:
```
/api/footer/getData && /api/footer/updateData
{
    "footerLink": [
        {
            pageName: string,
            pageLink: string
        }
    ]
}
```
---

Breakpoints utilizado para telas pequenas:

max-[999px] //
max-[790px] //
max-[650px] //
max-[480px] //
max-[375px] //
## Demonstração
- LP - Desktop
<img src="demonstration\desktop-lp.gif">

- LP - Tablet
<img src="demonstration\tablet-lp.gif">

- LP - Mobile
<img src="demonstration\mobile-lp.gif">

- Admin Page
<img src="demonstration\admin.gif">

## Instalação

Front *(pasta /app)*:

```bash
    npm i
    npm run dev
```

 Back *(pasta /api)*:

```bash
    npm i
    npm start
```   
