#ss16
a fresh attempt at a 4chan userstyle

##mid-2016 update
ss16 has been updated with several stylistic changes and code improvements
 - roboto mono is now the monospace font. i never said this, but circular is also used for board titles
 - far more variables, aligning with the material colours. once `#rrggbbaa` is supported in chrome, that will be used
  - you only need to change `primary` and `accent` and it will sort itself out
  - i am thinking of applying `primary` and `accent` to `body`, meaning per-board colours
 - far greater support for a variety of 4chan x features, while still enforcing things such as using the qr and menus
 - introducing `sidedish.user.js`, which includes:
  - removing `<style>` tags from the document
  - (poorly) adds the material icon version of stickied/closed icons
  - (sub-optimally) creates a text shadow effect when scrolling on the board title
  - adds a background to the header only when scrolled past the board banner
  - makes the full board list at the bottom of the page toggleable
  - (sub-optimally) adds a scroll progress indicator to the header
  - (sub-optimally & poorly) adds a shortcut toggler for smaller screen sizes
  - (sub-optimally & poorly) adds a custom index sorter, as opposed to the dropdown

there is still much i would like to do, which you'll find in issue #2

##(outdated) screenshots of style applied
![screenshot of ss16 1](browser-2016-02-23a.jpg)
![screenshot of ss16 2](browser-2016-02-23b.jpg)

following the success (or lack of) from curabitr and xl, ss16 provides a fresh and clean userstyle for use with [ccd0's 4chan x](https://ccd0.github.io/4chan-x/) in 2016!

this style is currently being actively developed for use with google chrome. you will require stylish, tampermonkey, and adblock plus.
stylish to apply the style, tampermonkey to add some extra rice, and adblock plus to disable the default 4chan stylesheets.
a proper guide will be created soon(tm).

###adblock plus filters
adblock plus is used to not only hide ads, but also remove some other stuff, saving us some http requests
go to your adblock plus options, and locate where you can add your own filters. add the following:

| filter | description |
|--------|-------------|
| `||s.4cdn.org/css^$domain=boards.4chan.org` | block all css files, but only when they are on the `boards.4chan.org` subdomain (meaning `4chan.org` is unaffected) |
| `*//s.4cdn.org/image/title/*` | i never liked the banner images, so block them instead of loading them. technically, you can skip this one as i support it in ss16 |
| `*//s.4cdn.org/js/prettify/prettify.*.css` | code on /g/ is prettified, and we use a custom theme, so don't download the one 4chan uses |
| `@@||s.4cdn.org/css/flags.*.css` | adds an exception to the earlier rule, so that the flags file is still downloaded |
| `@@||s.4cdn.org/css/painter.*.css` | adds an exception to the earlier rule, so that the painter file is still downloaded |

if you know a nicer/cleaner way to write these filters, please let me know

##current plans
 - support as many 4chan x features as possible, for a greater "out of the box" experience
 - ~~wait for css variables to be supported in chrome for better customisation~~ (now supported)
 - figure out how to get a css4 colour polyfill for better customisation

##future plans
 - add further rice using userscript
 - stand alone extension, to replace 4chan x
