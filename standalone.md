# es6chan

i've had this idea in my head for at least 2 years now - to create a 4chan
extension, based off 4chan x and c4.

4chan x uses a lot of "legacy code" and supports too far of a range of browsers
(where mayhem generally stuck to `current - 2`) and c4 - well queue is a busy
guy but his script uses a lot of new technologies and is super fast

since chrome is my main browser, the idea would be to create an es6-based
extension that (probably with some build process) could be supported in firefox,
given they are switching their add-on engine soon(tm) anyway

i've had emails with queue regarding what would be cool, and what is possible,
but due to my own laziness and perhaps stupidness i've never actually done anything
towards making this any closer to a reality. sure, i've tried making my own
html-replacement userscript, but [i cant even figure out how to properly loop through
the fucking json files and create elements in es5](https://gist.github.com/saxamaphone69/1ff7fe1eacdb28ea5a465476e9a0e816), let alone es6

## features
- much like c4, it would utilise full html replacement
- everything would be created dynamically
 - reads all the `api.json` stuff
 - builds threads and posts from that
 - each post is an object, and updates/pings refer to those objects
- utilise promises, sharedworkers, variables, as per [mayhem's dying wishes](https://github.com/MayhemYDG/4chan-x/wiki/You're-favorite-browser-is-shit)
- if possible, a "mega-board" that is actually several boards combined into one (similar to multi subreddits)

## what to do
- create a quick es6 dom library so that i can easily create elements and make
json requests
- a function that builds posts, updates threads, etc

## what will happen
__nothing__
