# Swipe Book

A PDF book reader for a Telegram Mini App. One page per screen, swipe up and down, double-tap to zoom.

## Add a new book

1. Upload the PDF into the `books` folder. Use a short file name with English letters, numbers and dashes, for example `history-of-armenia.pdf`.
2. Open `books.json`, click the pencil icon, and add an entry at the top of the list:

```json
{
  "id": "history-of-armenia",
  "title": "History of Armenia",
  "author": "Author Name",
  "file": "books/history-of-armenia.pdf"
},
```

3. Commit. After 1–2 minutes the book opens with:
   - Browser test: `https://YOUR-NAME.github.io/book-reader/?book=history-of-armenia`
   - Telegram: `https://t.me/YOUR_BOT/read?startapp=history-of-armenia`

The `id` may only use English letters, numbers, `-` and `_` (max 64 characters).

## Reading features

- **Portrait:** one page per swipe, double-tap to zoom, tap to show the top bar.
- **Landscape:** reading mode. Pages fill the width and scroll smoothly. Tap **Auto-scroll** to read hands-free (5 speeds, tap the page to pause).
- **Find a page:** pinch two fingers together (or tap the grid button) to see every page grouped by chapter. Or hold the right edge and slide to preview pages, then let go to jump.
- Chapters come from the PDF's own bookmarks.

## Book covers

Covers are made automatically by `.github/workflows/covers.yml` every time you upload a book or change `books.json`.
They are saved in the `covers` folder. To make them by hand: Actions → Make book covers → Run workflow.
To use your own picture for a book, add `"cover": "covers/my-picture.jpg"` to that book in `books.json`.
