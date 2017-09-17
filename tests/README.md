## Click Jacking
#### This test demonstrates the effects of click jacking and the use of the *helmet* framework to prevent it from happening.

1. Comment out the line of code on `server.js` which prevents this website being displayed on an Iframe.

```js
app.use(helmet.frameguard({ action: 'sameorigin' }));
`

2. Restart the server, make sure it's running on port 3000.

3. Open the file clickjack_test.html file. Observe that it will show the same login screen from the website with a visible link called "bad button" on covering the "login" button, this link redirects you to another page. Ideally this "bad button" would be invisible to trick users.
![Image of Yaktocat](https://imgur.com/a/DqzX8)



The line `app.use(helmet.frameguard({ action: 'sameorigin' }));` prevents the website from being shown an in frame.
