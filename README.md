# Book Reader

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
