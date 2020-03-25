# Oceans and Continents - Know More about Mozambique
This repository houses the entirety of the source for Oceans and Continents, a site exploring the slave trade in and around Portugese Mozambique in the second half of the 18th century.
The site is home to an interactive database of around 14,000 enslaved Africans.

## Structure
This project's stack has two major pieces, the static site generation (using `jekyll`) and the database's Javascript bundling (using `npm` and `webpack`).
With this in mind the repository is structured more or less how one would expect for a standard `jekyll` source (`_includes`, `_layouts`, `assets`, `.md` files, etc.).
However, there are also a number of requisite `npm` and `webpack` configuration files at project root as well.
When run, it will compile the Javascript rooted at `src/index.js` and output the bundle to `assets/js/bundle.js` where it can be picked up by `jekyll`.

### Updating the Database
Updating the database is fairly simplye so long as it has not changed shape: simply replace `assets/js/boc.csv` with the new file.
It is important the file is **not** renamed.

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
