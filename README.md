# Usage,
Website is live at this [url](https://meetup-subscribe.surge.sh): https://meetup-subscribe.surge.sh

Rsvp's only work for meetups that have been announced by the organizer. 🧐

# Meetup Oauth2 React Redux Starter Application.

1) Big thanks to [epoch meup](https://github.com/epoch/meup). The oauth stuff was implemented from that project.

2) Upgrade the project to add React Router and React Loadable to make the codebase simpler.
<br/>The results of the requests have also been simplified to remove complexity.

3) If you need to see a post request, checkout "rsvp auto subscribe app".
<br/>Works off of this base application and adds a few goodies. 😉

## Libries Used:
1) [React](https://facebook.github.io/react/)
2) [Redux](https://github.com/reactjs/redux)
3) [Ramda](http://ramdajs.com/)
4) [React-Router]()
5) [React-Loadable]()

## Install Instructions:
```
git clone https://github.com/MichaelDimmitt/React-Oauth2-Meetup-Starter-Kit.git;
cd React-Oauth2-Meetup-Starter-Kit;
npm install;
npm start;
```

## License
Meetup Oauth 2 application based on [meup_by_epoch](https://github.com/epoch/meup/)

MIT © [epoch](https://github.com/epoch)
**Meup** is a lean web client that shows all your upcoming [meetups](https://www.meetup.com/) in a single page.

## Deploy to surge.sh
```bash
npm install -g surge;
yarn build; cp build/index.html build/200.html; echo '*' > build/CORS; surge build meetup-subscribe.surge.sh
# make sure cache is disabled in network tab of dev tools.
```
