# ss21
a self-centered, fresh attempt at (user)styling 4chan

![screenshot of ss21 applied](img/ss21-preview.png)

following the success (or lack of) from curabitr and xl, ss21 provides a fresh and clean userstyle for use with [ccd0's 4chan x](https://ccd0.github.io/4chan-x/) in ~~2019, 2020~~, 2021!

created by **saxamaphone** "sax" `!3.saxN0DHY`, who has been making userstyles for 4chan since 2009 with styles such as 3 Shades of 4chan (which only exists as Midnight Caek in App/OneeChan now), curabitr, and xl

ss21 is a fresh attempt to make a userstyle that looks radically different from the typical App/OneeChan aesthetic of today, utilising modern web standards and bleeding edge CSS technologies

## about
| feature | detail |
| --- | --- |
| **documented** | looking through the original `ss21` file contains comments that explain what things do and why they are there |
| **variables** | thankfully, we now use the preprocessor `.styl` within stylus for built in functions not previously possible |
| **sidedish** |  unlike most userstyles, `ss21` requires a companion userscript for additonal rice and features not found in 4chan X |
| **filters** | through the use of 4chan X's filtering system, additional classes are added to certain posts for further enhancements |
| **web fonts** | using `@import`, we can load fonts from the web, not longer requiring downloaded and locally installed fonts |
| **rebase** | utilising code from well-established web projects such as bootstrap, carbon, and the material design guidelines, elements are rendered consistently and correctly across browsers |

it should be noted that `ss21` **does not** function with the default 4chan extension or App/OneeChan

## installation
this userstyle is currently being actively developed for chrome first, with firefox as an after thought. you will require [stylus](http://add0n.com/stylus.html) ([don't use stylish anymore](https://robertheaton.com/2018/08/16/stylish-is-back-and-you-still-shouldnt-use-it/)), a userscript manager such as [tampermonkey](https://tampermonkey.net/), and a blocking extension such as [ublock origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en).

1. install `ss21.user.css`, `ss21font.css`, and `ss21boardbanner.css` (stylus should prompt you when viewing the raw file)
2. install `sidedish.user.js`
3. add the blocking filters (to your blocking extension) and 4chan x filters (to 4chan x) below
4. cross your fingers and hope it works!

### blocker filters
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
 - 4chan-JS code that isn't needed, as we use 4chan x
 
### 4chan x filters
ss21 makes use of the highlighting feature in 4chan x to give certain posts extra styling. if you'd like to experience ss21 as intended, add these filters:

| section | filter |
| --- | --- |
| **post numbers** | `/(\d)\1$/;highlight:post--dubs;top:no;boards:s4s` |
| **capcodes** | `/Founder$/;highlight:poster--founder;op:yes`<br>`/Admin$/;highlight:poster--admin;op:yes`<br>`/Mod$/;highlight:poster--mod;op:yes`<br>`/Manager$/;highlight:poster--manager;op:yes`<br>`/Developer$/;highlight:poster--developer;op:yes`<br>`/Verified$/;highlight:poster--verified;op:yes` |
| **pass dates** | `/./;highlight:poster--pass;top:no;` |
| **subject** | `/./;op:only;top:no;highlight:thread--subject` |
| **comment** | `/^\W*(\w+\b\W*){50,90}$/;op:only;top:no;highlight:thread--long`<br>`/^\W*(\w+\b\W*){91,149}$/;op:only;top:no;highlight:thread--extra-long`<br>`/^\W*(\w+\b\W*){150,}$/;op:only;top:no;highlight:thread--silly-long`<br>`/(?:[^\n]*(\n+)){5,}/;op:only;top:no;highlight:thread--new-lines` |
| **filenames** | `/.webm$/;highlight:file--video;top:no;`<br>`/.gif$/;highlight:file--gif;top:no;` |
| **image dimensions** | `/\d{4}x/;highlight:file--wide;top:no;`<br>`/x\d{4}/;highlight:file--high;top:no;` |
| **filesize** | `/MB/;op:yes;highlight:file--huge;top:no;` |

## reporting bugs and feature requests
feel free to open an issue for any bugs or requests here on the issue tracker

## licensing
code released under CC-BY-SA-4.0
contains code from https://github.com/ryanmorr/ready
icons provided by https://www.material.io/resources/icons/
