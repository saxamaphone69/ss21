#ss16
a fresh attempt at a 4chan userstyle

![screenshot of ss16 1](browser-2016-02-23a.jpg)
![screenshot of ss16 2](browser-2016-02-23b.jpg)

following the success (or lack of) from curabitr and xl, ss16 provides a fresh and clean userstyle for use with [ccd0's 4chan x](https://ccd0.github.io/4chan-x/) in 2016!

this style is currently being actively developed for use with google chrome. you will require stylish, tampermonkey, and adblock plus.
stylish to apply the style, tampermonkey to add some extra rice, and adblock plus to disable the default 4chan stylesheets.
a proper guide will be created soon(tm).

###adblock plus filters
adblock plus is used to not only hide ads, but also remove some other stuff, saving us some http requests
go to your adblock plus options, and locate where you can add your own filters. add the following:

`||s.4cdn.org/css^$domain=boards.4chan.org` - block all css files, but only when they are on the `boards.4chan.org` subdomain (meaning `4chan.org` is unaffected)

`@@||s.4cdn.org/css/flags.*.css` - adds an exception to the previous rule, so that the flags file is still downloaded.

`*//s.4cdn.org/image/title/*` - i never liked the banner images, so i just block them. technically you could skip this one

`*//s.4cdn.org/js/prettify/prettify.*.css` - code on /g/ is prettified, and we use a custom theme, so don't download the one 4chan uses

if you know a nicer way to write/combine the first two filters, please let me know

##current plans
 - support as many 4chan x features as possible, for a greater "out of the box" experience
 - ~~wait for css variables to be supported in chrome for better customisation~~ (now supported)
 - figure out how to get a css4 colour polyfill for better customisation

##future plans
 - add further rice using userscript
 - stand alone extension, to replace 4chan x
