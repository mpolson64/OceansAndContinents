# Oceans and Continents - Know More about Mozambique
This repository houses the entirety of the source for Oceans and Continents, a site exploring the slave trade in and around Portugese Mozambique in the second half of the 18th century.
The site is home to an interactive database of around 14,000 enslaved Africans.

## Structure
This project's stack has two major pieces, the static site generation (using `jekyll`) and the database's Javascript bundling (using `npm` and `webpack`).
With this in mind the repository is structured more or less how one would expect for a standard `jekyll` source (`_includes`, `_layouts`, `assets`, `.md` files, etc.).
However, there are also a number of requisite `npm` and `webpack` configuration files at project root as well.
When run, it will compile the Javascript rooted at `src/index.js` and output the bundle to `assets/js/bundle.js` where it can be picked up by `jekyll`.

### Making Baisc Edits
1. Edit the `.md` file corresponding to the page you want to change; you can use this [Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/) if you need.
2. Open terminal and navigate to the site folder using `cd your/path/to/OceansAndContinents` (you can use **TAB** to autocomplete).
3. Once in the root directory (the one with `Gemfile` in it) run the command `npm run-script start-all`. This will pop up a web browser open to the site with your edits applied. If your browser does not open, keep your terminal running, open your browser manually, and go to `localhost:4000/`.
4. Check to make sure the test site looks exactly how you want it. Once you are satisfied you may close your browser and press `^C` on your terminal to shut down the test.
5. In your terminal run the following commands (do not include the preceding `$ `). Afterwards you may be asked to enter your Github.com username and password:
```
$ git add -A
$ git commit -m "A short message/note detailing whatever changes you made"
$ git push
```

### Adding to the Gallery
1. Copy the image to `assets/images/gallery/`, taking note of the file name.
2. Create a new `.md` file in `assets/images/gallery` in the same format as the existing files (i.e. include **title**, **description**, **image_path**, **index**). Note: there can be no duplicate indicies; you may need to increment many indicies if you are adding an image to the middle of the gallery.
3. Once in the root directory (the one with `Gemfile` in it) run the command `npm run-script start-all`. This will pop up a web browser open to the site with your edits applied. If your browser does not open, keep your terminal running, open your browser manually, and go to `localhost:4000/`.
4. Check to make sure the test site looks exactly how you want it. Once you are satisfied you may close your browser and press `^C` on your terminal to shut down the test.
5. In your terminal run the following commands (do not include the preceding `$ `). Afterwards you may be asked to enter your Github.com username and password:
```
$ git add -A
$ git commit -m "A short message/note detailing whatever changes you made"
$ git push
```

### Updating the Database
Updating the database is fairly simple so long as it has not changed shape: simply replace `assets/js/boc.csv` with the new file.
It is important the file is **not** renamed.
As with basic edits, commit and push the change.

## Running Locally
To run locally first bundle the Javascript then generate the static site.
For ease of use I have created macro to allow this to be done in a single step.
With `npm` and Ruby's `bundle` installed run the following:
```
$ bundle install
$ npm install
$ npm run-script start-all
```
This will build the site to the `_site` directoy and serve it at `localhost:4000`.

If you would like to instead only build the site replace the final command with `npm run-script build-all`.

## Hosting
 [![Netlify Status](https://api.netlify.com/api/v1/badges/eb3842ff-bdb6-48c2-a208-bd5f9b50405c/deploy-status)](https://app.netlify.com/sites/priceless-allen-285e5f/deploys)
 
Hosted on Netlify for testing purposes.
