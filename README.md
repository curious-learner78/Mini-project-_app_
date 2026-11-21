# Pocket Study & Task Hub (Mobile Mini Project)

A responsive, mobile-first mini web application built with HTML5, CSS3, and vanilla JavaScript for the VINIX Mobile App Development capstone task.

## Features
- **Mobile-First UI:** Compact mobile frame (`max-width: 414px`) with clear visual hierarchy, summary metrics, and touch-friendly controls.
- **Profile & Workspace State:** Toggleable user profile bar to save a display name alongside live Total, Pending, and Done counters.
- **Task & Study Management:** Add tasks with category tags (`Study`, `Project`, `Personal`), mark items complete, search by keyword, filter by status, delete items, and clear completed tasks.
- **Persistent Local Storage:** Automatically saves user profile and task data in browser `localStorage`.

## Project Structure
- `index.html` — Application layout, profile panel, metric cards, form, search/filters, and task list
- `style.css` — Responsive mobile styling, status indicators, and component layout
- `app.js` — State management, search/filter logic, CRUD operations, and `localStorage` persistence
- 
