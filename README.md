# Fisher Partners theme

This is the WordPress theme folder for the Frederick Fisher and Partners website.

The site was built using Local by Flywheel, and requires a few WordPress plugins:

- [Admin Columns](https://wordpress.org/plugins/codepress-admin-columns/)
- [Admin Menu Editor](https://wordpress.org/plugins/admin-menu-editor/)
- [Advanced Custom Fields Pro](https://wordpress.org/plugins/advanced-custom-fields/) (this links to the free version)
- [Classic Editor](https://wordpress.org/plugins/classic-editor/)
- [Custom Post Type Cleanup](https://wordpress.org/plugins/custom-post-type-cleanup/)
- [Disable Comments](https://wordpress.org/plugins/disable-comments/)
- [Show Current Template](https://wordpress.org/plugins/show-current-template/)
- [Timber](https://wordpress.org/plugins/timber-library/)

## First things first

1. Within the theme, run `npm install` to install all relevant node packages
2. Install [Composer](https://getcomposer.org/download/) if you do not have it installed already.
3. Run `composer require timber/timber` to install Timber.
4. Change the theme information in [style.css](./style.css) and replace [screenshot.png](./screenshot.png).
5. Activate the theme in the CMS.
6. Change the proxy URL in [gulpfile.js](./gulpfile.js) to match the locally served URL.
7. Run `gulp` and make changes to a `scss`, `js`, `php` and `twig` file to make sure the site is being served at a BrowserSync URL and is reloading correctly.

## What's here?

`src/` is where you can keep your static front-end scripts, styles, or images. In other words, your Sass files, JS files, fonts, and SVGs would live here. The `gulp` process compiles these files to the `dist/` folder. Running `gulp --prod` will build production ready files to the folder instead.

`src/scss/` is organized using the [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern) and is using the newer [`@use` Sass rule](https://sass-lang.com/documentation/at-rules/use).

`templates/` contains all of your Twig templates. These pretty much correspond 1 to 1 with the PHP files that respond to the WordPress template hierarchy.

`lib/` contains custom post type, menu, taxonomy and widget definition files

`bin/` and `tests/` ... basically don't worry about (or remove) these unless you know what they are and want to.

## Resources

- [Timber documentation](https://timber.github.io/docs/)
- [Twig for Timber Cheatsheet](http://notlaura.com/the-twig-for-timber-cheatsheet/)
- [Twig documentation](https://twig.symfony.com/doc/3.x/)
- [WordPress Template Hierarchy](https://wphierarchy.com/)
