# ss16
a self-centered, fresh attempt at (user)styling 4chan

## late-2019 update
`2.1.0` is still expected to come soon<sup>tm</sup> with a complete rewrite in `.styl` and complete user control

## preview of ss16 applied
![screenshot of ss16 applied](img/preview.png)

following the success (or lack of) from curabitr and xl, ss16 provides a fresh and clean userstyle for use with [ccd0's 4chan X](https://ccd0.github.io/4chan-x/) in 2019!

this style is currently being actively developed for chrome first, with firefox/edge as an after thought. you will require something that applies custom css, such as [stylus](http://add0n.com/stylus.html) (don't use stylish anymore), a userscript manager such as [tampermonkey](https://tampermonkey.net/), and a blocking extension such as [ublock origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en).

## installation
1. install `ss16.user.css`, `ss16font.css`, and `ss16boardbanner.css` with stylus
2. install `sidedish.user.js` with tampermonkey
3. add the blocking filters below
4. cross your fingers and hope it works!

## blocker filters
a blocker is used to not only hide ads, but also block some other stuff to save on network requests.
go to your blocker-of-choice options, and locate where you can add your own filters. add the following:

```
4chan.org##script:inject(abort-current-inline-script.js, String.fromCharCode)
@@||4chan.org^*$csp=default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'

4channel.org##script:inject(abort-current-inline-script.js, String.fromCharCode)
@@||4channel.org^*$csp=default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'

*//s.4cdn.org/js/prettify/prettify.*.css
*//s.4cdn.org/css^$domain=boards.4chan.org
*//s.4cdn.org/css^$domain=boards.4channel.org
*//s.4cdn.org/image/title/*
*//s.4cdn.org/image/contest_banners/*
*//s.4cdn.org/js/core.min.*.js
*//s.4cdn.org/js/extension.min.*.js

@@||s.4cdn.org/css/flags.*.css
@@||s.4cdn.org/css/painter.*.css
@@||s.4cdn.org/css/yui.css
@@||s.4cdn.org/css/global.*.css
@@||s.4cdn.org/css/error.css
@@||4cdn.org$xmlhttprequest,domain=4chan.org
@@||4cdn.org$xmlhttprequest,domain=4channel.org
```

essentially:
 - block those bitcoin mining ads hiroshimoot uses
 - all 4chan css, with a few exceptions listed at the end
 - title and contest banners (technically skippable)
 - 4chan-JS code that isn't needed as we use 4chan x
 