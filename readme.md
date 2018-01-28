# ss16
a self-centered, fresh attempt at (user)styling 4chan

## early-2018 update
ss16 is now `2.0.0`, the ss18 release. install instructions are slightly different this time around, but there is a lot of work to still be done, so perhaps wait for a `2.1.0` release until things work themselves out

## preview of userstyle applied
![screenshot of ss16 applied](img/preview.png)

following the success (or lack of) from curabitr and xl, ss16 provides a fresh and clean userstyle for use with [ccd0's 4chan X](https://ccd0.github.io/4chan-x/) in 2018!

this style is currently being actively developed for chrome first, with firefox as an after thought. you will require something that applies custom css, such as [stylus](http://add0n.com/stylus.html) (don't use stylish anymore), a userscript manager such as [tampermonkey](https://tampermonkey.net/), and an adblocking extension such as [adblock plus](https://chrome.google.com/webstore/detail/adblock-plus/cfhdojbkjhnklbpkdaibdccddilifddb?hl=en).

## installation
__please note:__ only the most recent version of each browser is properly supported.

__1.__

the easiest way to do this is to have one tab open on 4chan, and the raw version of `ss16.user.css` (found on this github repo)

__2.__

create a new userstyle (named ss16) that applies to URLs on the domain `boards.4chan.org`
![applying style](img/new-style.png)

__3.__

 __chrome users:__ copy everything from `ss16.user.css` and paste into the blank textarea and click save

__firefox users:__ you should be staring at something that looks like:
```css
@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("boards.4chan.org") {

}
```
you will need to copy everything from `ss16.user.css` and paste it into the `@document` query
```css
@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("boards.4chan.org") {
  /**
   *
   * ss16 - a self-centered, fresh attempt at (user)styling 4chan
   *
   */
   ...
}
```
you are then going to cut line 31:
```css
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500|Roboto+Mono|Material+Icons');
```
and paste it over
```css
@namespace url(http://www.w3.org/1999/xhtml);
```
which should leave ss16 looking like (while you're at it change the double quotes to single quotes):
```css
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500|Roboto+Mono|Material+Icons');

@-moz-document domain('boards.4chan.org') {
  /**
   *
   * ss16 - a self-centered, fresh attempt at (user)styling 4chan
   *
   */
   ...
}
```
and then click save
__note:__ sadly, there is no auto updating on styles that are not installed from userstyles.org, so you'll have to check manually (honestly, the style is updated once every 2 months at most)

__4.__

install 4chan X (you should already have it) and then navigate to the raw version of `sidedish.user.js` (found on this github repo). you should be automatically prompted to install with tampermonkey

__5.__

speaking of 4chan X, have a read over [what is supported](support.md) and what you'll need to enable or disable

## adblock filters
an adblocker is used to not only hide ads, but also block some other stuff to save on http requests.
go to your adblock-of-choice options, and locate where you can add your own filters. add the following:

| filter | description |
|---|---|
| `\|\|s.4cdn.org/css^$domain=boards.4chan.org` | block all css files, but only when they are on the `boards.4chan.org` subdomain (meaning `4chan.org` is unaffected) |
| `*//s.4cdn.org/image/title/*` | i never liked the banner images, so block them instead of loading them. technically, you can skip this one as i support it in ss16 |
| `*//s.4cdn.org/js/prettify/prettify.*.css` | code on /g/ is prettified, and we use a custom theme, so don't download the one 4chan uses |
| `@@\|\|s.4cdn.org/css/flags.*.css` | adds an exception to the earlier rule, so that the flags file is still downloaded |
| `@@\|\|s.4cdn.org/css/painter.*.css` | adds an exception to the earlier rule, so that the painter file is still downloaded |

in firefox, this should look something like this:
![preview of adblock filters](img/adblock-options.png)

if you know a nicer/cleaner way to write these filters, please let me know

## plans
 - [a standalone, es6-based 4chan chrome extension](standalone.md)
 - i'll make a roadmap thing in the issue tracker for future plans
