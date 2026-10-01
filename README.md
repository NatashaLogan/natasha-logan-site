# Natasha Logan

Personal website for author Natasha Logan. Plain HTML, CSS, and JavaScript with no build step.

## Structure

```
.
├── index.html      Home: hero, feature cards, social links
├── about.html      Bio page
├── books.html      Content page (cards from js/data.js)
├── skoolie.html    Content page (cards from js/data.js)
├── cycling.html    Content page (cards from js/data.js)
├── css/
│   └── styles.css  All styles, tokens at the top
├── js/
│   ├── data.js     Card content for books, skoolie, cycling
│   └── main.js     Nav state, card rendering, scroll reveal
└── images/         Photos and book covers
```

## Editing content

- Page text lives in each HTML file.
- Cards on the Books, Skoolie, and Cycling pages come from `js/data.js`. Add `image: "images/name.jpg"` to an item to replace its placeholder with a photo.
- Colors and fonts are CSS variables at the top of `css/styles.css`.

## Running locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

Works on GitHub Pages as is.
