# Overview

This is a Django-based music player web application that enables users to create playlists, upload songs, and browser-based audio player. To start the test server, navigate to the project directory and run `python manage.py runserver`. Then open your browser to `http://127.0.0.1:8000/` to access the application.

The purpose of writing this software was to gain hands-on experience with Django's model-view-template architecture, learn how to handle file uploads and media storage, and create a functional music player using HTML5 audio APIs and vanilla JavaScript. This project helped me understand the complete lifecycle of web application development from database design to front-end interactions.

[Software Demo Video](http://youtube.link.goes.here)

# Web Pages

**Index Page** (`/player/`)
- Displays all playlists in the database
- Shows playlist titles, descriptions, and creation dates
- Provides links to create new playlists and upload songs
- Dynamically generates a list of playlist cards from the database

**Song List Page** (`/player/songs/`)
- Shows all uploaded songs across all playlists in a table format
- Displays song title, artist, associated playlist, duration, and upload date
- Includes delete buttons for each song
- Dynamically populates the table with all Song objects from the database
- Links to individual playlist pages when clicking on playlist names

**Playlist Detail Page** (`/player/playlists/<id>/`)
- Displays a specific playlist with all its songs
- Features a fully functional audio player with play/pause, previous/next controls, volume slider, and seek bar
- Shows currently playing track information
- Each song in the list has an individual play button
- Dynamically loads songs from the database and creates the playlist queue
- Includes delete playlist button

**Playlist Create Page** (`/player/playlists/create/`)
- Form for creating new playlists
- Users enter playlist title and optional description
- Redirects to the newly created playlist detail page upon submission

**Song Upload Page** (`/player/songs/upload/`)
- Form for uploading audio files
- Users select a playlist, enter song title, artist name, and upload an audio file
- Handles file upload to the media directory
- Redirects to the index page after successful upload

**Delete Confirmation Pages**
- Generic confirmation page for deleting playlists or songs
- Shows the object being deleted and requires POST request confirmation
- Redirects appropriately after deletion (playlists go to index, songs return to their playlist)

# Development Environment

**Tools Used:**
- Visual Studio Code as the primary code editor
- Django's built-in development server for testing
- Chrome DevTools for debugging JavaScript and inspecting network requests
- Git for version control

**Programming Language and Libraries:**
- Python 3.x - Backend server logic
- Django 4.x - Web framework for models, views, and URL routing
- HTML5 - Template structure and audio element
- CSS - Styling (with Bootstrap for responsive design)
- JavaScript (Vanilla) - Audio player functionality and DOM manipulation
- Bootstrap - CSS framework for UI components
- Django's template language - Dynamic content rendering

# Useful Websites

* [Django Documentation](https://docs.djangoproject.com/) - Official Django documentation for models, views, and forms
* [MDN Web Docs - HTML Audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) - Reference for HTML5 audio API
* [Django File Uploads](https://docs.djangoproject.com/en/stable/topics/http/file-uploads/) - Guide for handling file uploads in Django
* [Stack Overflow](https://stackoverflow.com/) - Community solutions for debugging Django issues
* [Real Python](https://realpython.com/) - Tutorials on Django best practices

# Future Work

* Add Visual patterns for when the music is playing
* Add the ability to fast-forward and rewind through songs