JOY & Sree Garments Website
===========================

Folder structure
----------------
index.html        Main website page and content
css/style.css     Website styling, responsive layout, animations and backgrounds
js/main.js        Navigation, interactions, estimator, FAQ and inquiry form
assets/images/    joy-mark.svg (header/footer emblem), joy-logo.svg (full logo), joy-watermark.svg (background watermark).
                  Put other local image files here if you want to host images locally

How to run
----------
1. Extract this ZIP file.
2. Open the JOY_Sree_Garments_Website folder.
3. Double-click index.html, or open the folder in VS Code and use Live Server.
4. Internet is required for the external Google Fonts and remote image URLs currently referenced in the page.

Notes
-----
- This is a static front-end website. The inquiry form opens the visitor's email app; it does not save inquiries to a database.
- The original website's text and interactions are retained while CSS and JavaScript are separated into their own files.
- The assets/images folder is ready for local garment photos. Existing image links in the HTML still point to remote URLs.

Update notes (UI/UX pass)
-------------------------
- Header: Home, About Us, Products, FAQ, Contact (17px, centred). Facility & Specs, OEM/ODM, Quality, Ethics,
  Leadership and Journey & News are in the secondary bar under the header (and in the mobile menu).
- "Get a Quote", "Inquire Bulk Order", every "Request Quotation" button and "Cost Estimator" open the same
  Cost Estimator panel, which contains the inquiry form. The email opens via mailto: to info.joyexports@gmail.com;
  the visitor must press Send in their email app (nothing is stored or delivered by the site).
- Logo: text-based gold + muted-red logo (SVG, letters converted to outlines). Edit colours in assets/images/*.svg
  and the --brand-* variables at the top of css/style.css.
- Watermark: --wm-layer in css/style.css (size/position); opacity is baked into assets/images/joy-watermark.svg.
