# Natasha Logan

Personal website for author Natasha Logan. A Jekyll site that GitHub Pages builds automatically, with content editable in [Pages CMS](https://app.pagescms.org).

## Structure

```
.
├── index.md        Home: hero, feature cards, social links
├── about.md        Bio page
├── family.md       Family story and photos
├── books.md        Books page intro (book list comes from _data/books.yml)
├── skoolie.md      Skoolie story and photo gallery
├── cycling.md      Cycling story and Bicycle Bae photo gallery
├── envime.md       Envi Me Athletic Wear brand story and photo gallery
├── contact.md      Closing note and contact details
├── _data/
│   ├── books.yml   Books: title, type, year, cover, Amazon link, blurb
│   └── contact.yml Email, phone, social links
├── _layouts/       Page templates (default.html holds the <head>, header, footer and SEO tags)
├── _includes/      Small reusable pieces (photo, social links)
├── .pages.yml      Pages CMS editor configuration
├── css/styles.css  All styles, tokens at the top
├── js/main.js      Nav state and scroll reveal
├── images/         Photos and book covers (Pages CMS uploads land here)
├── sitemap.xml     Generated from every page with a `key` in its front matter
└── robots.txt
```

## Editing content

- **In Pages CMS** (recommended): sign in at app.pagescms.org, open this repository, and edit pages, books and contact links through forms. Each save is a commit, and GitHub Pages republishes within a minute or two.
- **By hand**: page text is in each `.md` file. Fields at the top (between `---` lines) hold headings, photos and captions, and the Markdown below holds the main story text.
- Colors and fonts are CSS variables at the top of `css/styles.css`.

## Running locally

Needs Ruby and Jekyll:

```
gem install jekyll
jekyll serve
```

Then open http://localhost:4000.
