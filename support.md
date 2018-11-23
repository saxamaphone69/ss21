# 4chan X settings support
this is a list of what affect 4chan X's settings have on ss16's appearance

---

## main
### misc
- [x] __json index is required__
- [ ] index and reply navigation are supported
- [ ] keybinds are not supported (elements gain no obvious focus)
- [ ] remove and/or reveal spoilers are supported

### linkification
- [x] fully supported

### filtering
- [x] anonymize is supported
- [x] refer to filter section for beneficial filters
- [ ] thread and reply hiding buttons __are not supported__; use the menu instead
- [x] despite the buttons not being supported, stubs are

### images and videos
- [x] image expansion and hovering are supported
- [x] gallery is supported
- [ ] __please don't enable image prefetching, you leech__
- [x] fappe and werk time are supported

### menu
- [x] __menu is required__

### monitoring
- [x] thread updater is supported
- [x] thread stats are supported
- [x] thread watcher is supported

### posting and captchas
- [x] __qr is required__
- [ ] pass link login is not supported, navigate to login page manually

### quote links
- [x] quote backlinking, inlining, and previewing are all supported

---

## advanced
### quote backlinks formatting
use `#%id`

### custom css
__this must be disabled__, or there will be adverse side effects

## filters
### post numbers
`/(\d)\1$/;highlight:post--dubs;top:no;boards:s4s` - posts with dubs vibrate and are checked

### capcodes
`/Founder$/;highlight:poster--founder;op:yes`

`/Admin$/;highlight:poster--admin;op:yes`

`/Mod$/;highlight:poster--mod;op:yes`

`/Manager$/;highlight:poster--manager;op:yes`

`/Developer$/;highlight:poster--developer;op:yes`

`/Verified$/;highlight:poster--verified;op:yes`

### pass dates
`/./;highlight:poster--pass;top:no;` - pass users are green

### subject
`/./;op:only;top:no;highlight:thread--subject` - threads that have a subject are given a class

### comment
`/^\W*(\w+\b\W*){50,90}$/;op:only;top:no;highlight:thread--long` - threads with a lot of characters given a special class

`/^\W*(\w+\b\W*){91,}$/;op:only;top:no;highlight:thread--extra-long` - threads with anything more than that, given another whole class

### filenames
`/.webm$/;highlight:file--video;top:no;` - webm thumbnails have a play button

`/.gif$/;highlight:file--gif;top:no;` - gif thumbnails display `GIF`

### image dimensions
`/\d{4}x/;highlight:file--wide;top:no;` - files that are at least 1000px wide, take up the whole screen

`/x\d{4}/;highlight:file--high;top:no;` - files that are at least 1000px high are given a class

### filesize
`/MB/;op:yes;highlight:file--huge;top:no;` - files that are over a MB are given a discerning class (thanks, australia)
