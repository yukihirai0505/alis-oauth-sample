// https://alisproject.github.io/oauth2/oauth-flow/#%E3%82%B5%E3%83%BC%E3%83%90%E3%82%B5%E3%82%A4%E3%83%89%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%90%91%E3%81%91
const request = require("request");
const app = require("../util/app");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const alis_oauth_base_url = "https://alis.to/oauth2";

app.get("*", (req, res) => {
  const { code_verifier } = req.session;
  const { code } = req.query;

  const token = new Buffer(`${client_id}:${client_secret}`).toString("base64");
  var clientServerOptions = {
    uri: `${alis_oauth_base_url}/token`,
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&code_verifier=${code_verifier}`,
    method: "POST",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  request.post(clientServerOptions, function(error, response, body) {
    console.log(body);
    const { access_token } = JSON.parse(body);
    request.get(
      {
        uri: "https://alis.to/oauth2api/me/info",
        method: "GET",
        headers: {
          Authorization: `${access_token}`,
          "Content-Type": "application/json"
        }
      },
      function(error, response, body) {
        const { user_id } = JSON.parse(body);
        res
          .status(200)
          .send(`Hi ${user_id}!<br/>Your Access Token is: ${access_token}`);
      }
    );

    async function get_sig_key(kid) {
      const response = await fetch(jwk_url);
      const response_json = await response.json();
      for (const k of response_json.keys) {
        if (k.kid === kid) {
          return jwkToPem(k);
        }
      }
    }
  });
});

module.exports = app;
