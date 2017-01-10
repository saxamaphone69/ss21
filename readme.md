# ss16
a fresh attempt at a 4chan userstyle

## early-2017 update
ss16, even in 2017, is mainly the same as it was last year. a few minor changes to accommodate for 4chan x updates, support for more settings, additional rice added via `sidedish` - and that's about it, sadly

## preview of userstyle applied
![screenshot of ss16](browser-2017-01-10a.png)

following the success (or lack of) from curabitr and xl, ss16 provides a fresh and clean userstyle for use with [ccd0's 4chan x](https://ccd0.github.io/4chan-x/) in 2017!

this style is currently being actively developed for use with google chrome. you will require [stylish](https://chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en), [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en), and [adblock plus](https://chrome.google.com/webstore/detail/adblock-plus/cfhdojbkjhnklbpkdaibdccddilifddb?hl=en).
stylish to apply the style, tampermonkey to add some extra rice, and adblock plus to disable the default 4chan stylesheets

## adblock plus filters
adblock plus is used to not only hide ads, but also block some other stuff, saving us some http requests
go to your adblock plus options, and locate where you can add your own filters. add the following:

| filter | description |
|--------|-------------|
| `||s.4cdn.org/css^$domain=boards.4chan.org` | block all css files, but only when they are on the `boards.4chan.org` subdomain (meaning `4chan.org` is unaffected) |
| `*//s.4cdn.org/image/title/*` | i never liked the banner images, so block them instead of loading them. technically, you can skip this one as i support it in ss16 |
| `*//s.4cdn.org/js/prettify/prettify.*.css` | code on /g/ is prettified, and we use a custom theme, so don't download the one 4chan uses |
| `@@||s.4cdn.org/css/flags.*.css` | adds an exception to the earlier rule, so that the flags file is still downloaded |
| `@@||s.4cdn.org/css/painter.*.css` | adds an exception to the earlier rule, so that the painter file is still downloaded |

if you know a nicer/cleaner way to write these filters, please let me know

## plans
 - a standalone, es6-based 4chan chrome extension
