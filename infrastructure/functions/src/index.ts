// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as randomstring from 'randomstring';
import * as simpleOauth from 'simple-oauth2';

const oauth = functions.config().oauth || {};

const getScript = (mess: string, content: any) => {
  return `<!doctype html><html><body><script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e)
      window.opener.postMessage(
        'authorization:github:${mess}:${JSON.stringify(content)}',
        e.origin
      )
      window.removeEventListener("message",receiveMessage,false);
    }
    window.addEventListener("message", receiveMessage, false)
    console.log("Sending message: %o", "github")
    window.opener.postMessage("authorizing:github", "*")
    })()
  </script></body></html>`;
};

const oauth2 = simpleOauth.create({
  auth: {
    authorizePath: oauth.authorize_path || '/login/oauth/authorize',
    tokenHost: oauth.git_hostname || 'https://github.com',
    tokenPath: oauth.token_path || '/login/oauth/access_token',
  },
  client: {
    id: oauth.client_id,
    secret: oauth.client_secret,
  },
});

const oauthApp = express();

oauthApp.get('/auth', (req, res) => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: oauth.redirect_url,
    scope: oauth.scopes || 'repo,user',
    state: randomstring.generate(32),
  });

  res.redirect(authorizationUri);
});

oauthApp.get('/callback', (req, res) => {
  const options: any = {
    code: req.query.code,
  };

  return oauth2.authorizationCode.getToken(options).then((result) => {
    const token = oauth2.accessToken.create(result);

    return res.send(getScript('success', {
      token: token.token.access_token,
      provider: 'github',
    }));
  }).catch((error: any) => {
    console.error('Access Token Error', error.message);
    res.send(getScript('error', error));
  })
});

oauthApp.get('/success', (req, res) => {
  res.send('');
});

oauthApp.get('/', (req, res) => {
  res.redirect(301, `/oauth/auth`);
});

exports.oauth = functions.https.onRequest(oauthApp);
