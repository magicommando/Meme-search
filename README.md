# Meme-search
--------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------
 __  __                         _____                     _     
|  \/  |                       / ____|                   | |    
| \  / | ___  _ __ ___   ___  | (___   ___  ___ _   _ _ _| |__  
| |\/| |/ _ \| '_ ` _ \ / _ \  \___ \ / _ \/ ___ |  | '__| '_  \ 
| |  | | |__/ | | | | | ||__/  ____) | |__/ (__| |_ | |  | | | |
|_|  |_|\___/|_| |_| |_|\___| |_____/ \___|\___|\__||_|  |_| |_|
                                                                 
                         Meme Search Engine
                         ------------------

Overview:
---------
Meme Search Engine is a simple web application that allows users to search for memes
using the Imgflip API. It displays meme results in a grid layout and includes options
to view top memes, create memes, and read an About section. The design uses a retro
pixel aesthetic inspired by early web pages and arcade interfaces.

User stories:
-------------
- As a gangsta user, I want to be impressed when the page loads and see something retro.
- as a gangsta user, I want to look up memes like a modern search engine with functional icons.
- as a gangsta user, I want to laugh, be inspired to create memes to make others laugh.

Features:
---------
- Search memes by keyword
- View top memes from the Imgflip API
- Create memes via Imgflip Meme Generator link
- Responsive layout for desktop and mobile
- Pagination and infinite scroll support
- “No Results Found” message with sad monkey image
- About section describing project purpose
- Footer showing API source and copyright

Technologies Used:
------------------
HTML
CSS / SCSS
JavaScript
Imgflip API

File Structure:
---------------
index.html
css/
  style.css
  style.scss
js/
  main.js
Assets/
  Logo.png
  sad-monkey.png

How It Works:
-------------
1. User enters a search term in the search bar.
2. JavaScript sends a request to the Imgflip API.
3. The API returns meme data in JSON format.
4. The app filters and displays memes in a grid.
5. If no memes match, a “No Results Found” message with a sad monkey appears.
6. The Home button clears results and restores the footer text.

API Reference:
--------------
Imgflip API: https://api.imgflip.com/get_memes

Responsive Design:
------------------
- Uses CSS Grid and Flexbox.
- Media queries for 480px and 320px screen widths.
- Layout adjusts for mobile devices.

Fonts:
------
Google Fonts: Orbitron and Press Start 2P.

Future Improvements:
--------------------
- Add user login and favorites list.
- Implement meme category filters.
- Add light mode toggle.
- Include meme upload feature.
- Add animated transitions between sections.

Author:
-------
Created by Corbin (Ultra Gangsta)

License:
--------
Open source for educational use.
