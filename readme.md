# ss16
a self-centered, fresh attempt at (user)styling 4chan

## early-2018 update
ss16 is now `2.0.0`, the ss18 release. install instructions are slightly different this time around, but there is a lot of work to still be done, so perhaps wait for a `2.1.0` release until things work themselves out

## OUTDATED* preview of userstyle applied
![screenshot of ss16 applied](img/preview.png)

following the success (or lack of) from curabitr and xl, ss16 provides a fresh and clean userstyle for use with [ccd0's 4chan X](https://ccd0.github.io/4chan-x/) in 2018!

this style is currently being actively developed for chrome first, with firefox as an after thought. you will require something that applies custom css, such as [stylus](https://add0n.com/stylus.html) (don't use stylish anymore), a userscript manager such as [tampermonkey](https://tampermonkey.net/), and an adblocking extension such as [ublock origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en).

## installation
__please note:__ only the most recent version of each browser is properly supported (evergreen).

1. install `ss16.user.css`, `ss16font.css`, and `ss16boardbanner.css` with stylus
2. install `sidedish.user.js` with your userscript manager
3. add the filters below to your favourite adblocker
4. cross your fingers and hope it works!

## adblock filters
an adblocker is used to not only hide ads, but also block some other stuff to save on network requests.
go to your adblocker-of-choice options, and locate where you can add your own filters. add the following mess:

```
4chan.org##script:inject(abort-current-inline-script.js, String.fromCharCode)
@@||4chan.org^*$csp=default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'

!4channel.org##script:inject(abort-current-inline-script.js, String.fromCharCode)
!@@||4channel.org^*$csp=default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'

!*//s.4cdn.org/js/core^$domain=boards.4chan.org
!*//s.4cdn.org/js/extension.*.*.js^$domain=boards.4chan.org

*//s.4cdn.org/js/prettify/prettify.*.css
*//s.4cdn.org/css^$domain=boards.4chan.org
*//s.4cdn.org/css^$domain=boards.4channel.org
*//s.4cdn.org/image/title/*
*//s.4cdn.org/image/content_banners/*
*//s.4cdn.org/js/core.min.*.js
*//s.4cdn.org/js/extension.min.*.js

@@||s.4cdn.org/css/flags.*.css
@@||s.4cdn.org/css/painter.*.css
@@||4cdn.org$xmlhttprequest,domain=4chan.org
@@||4cdn.org$xmlhttprequest,domain=4channel.org

!*//s.4cdn.org/css/*
```

if you know a nicer/cleaner way to write these filters, please let me know

essentially this blocks:
 - some of the nasty botnet stuff hiroshimoot has added
 - blocks all css files but only when on `boards.4chan(nel).org`, leaving `4chan(nel).org` unaffected
 - no banner/ad content titles/images (skippable)
 - the prettify code theme for /g/
 - flags and painter css files
 - also blocks the javascript run on 4chan(nel) to improve loading

## plans
 - [a standalone, es6-based 4chan chrome extension](standalone.md)
 - i'll make a roadmap thing in the issue tracker for future plans
