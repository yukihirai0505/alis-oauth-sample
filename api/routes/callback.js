// https://alisproject.github.io/oauth2/oauth-flow/#%E3%82%B5%E3%83%BC%E3%83%90%E3%82%B5%E3%82%A4%E3%83%89%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%90%91%E3%81%91
const request = require("request");
const app = require("../util/app");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

app.get("*", (req, res) => {
  const { code_verifier } = req.session;
  const { code } = req.query;
  const alis_oauth_base_url = "https://alis.to/oauth2/token";
  const token = new Buffer(`${client_id}:${client_secret}`).toString("base64");
  var clientServerOptions = {
    uri: alis_oauth_base_url,
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&code_verifier=${code_verifier}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${token}`
    }
  };

  request.post(clientServerOptions, function(error, response, body) {
    console.log(body);
    res.status(200).send(body);
  });
});

module.exports = app;
