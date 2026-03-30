# Clean Notes - A Minimal Note-Taking Web App

A clean, modern, and minimal note-taking web application built with React and Vite.

## Features

- ✨ **Clean Design** - Modern, minimalist UI with smooth animations
- 📝 **Create Notes** - Add new notes with title and content
- ✏️ **Edit Notes** - Update existing notes easily
- 🗑️ **Delete Notes** - Remove notes you no longer need
- 🔍 **Search** - Find notes quickly by title or content
- 💾 **Local Storage** - Your notes persist in the browser
- 📱 **Responsive** - Works great on desktop and mobile devices

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with CSS variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/workspace
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main application component
│   └── index.css       # Global styles
└── dist/               # Production build output
```

## Usage

1. Click the **"New Note"** button to create a note
2. Enter a title and content for your note
3. Click **"Create Note"** to save
4. Click on any note card to edit it
5. Use the search bar to find specific notes
6. Hover over a note and click the 🗑️ icon to delete it

## Notes

- All notes are stored in your browser's local storage
- Data persists between sessions
- No account or server required

## License

MIT
