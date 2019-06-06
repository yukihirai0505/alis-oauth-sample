// https://alisproject.github.io/oauth2/authorization-url/#%E6%A6%82%E8%A6%81
const base64url = require("base64url");
const sha256 = require("js-sha256");

const app = require("../util/app");

const alis_oauth_base_url = "https://alis.to/oauth-authenticate";
const code_verifier = get_code_verifier();
const code_challenge = get_code_challenge(code_verifier);
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

function get_code_challenge(str) {
  const hash = sha256.arrayBuffer(str);
  return base64url(hash);
}

function get_code_verifier() {
  const buf = Buffer.alloc(32);
  for (let i = 0; i < buf.length; i++) {
    const random_num = Math.floor(Math.random() * 256);
    buf.writeUInt8(random_num, i);
  }
  return base64url(buf);
}

app.get("*", (req, res) => {
  req.session.code_verifier = code_verifier;
  const oauthUrl = `${alis_oauth_base_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=read&code_challenge=${code_challenge}`;
  res.status(200).send(oauthUrl);
});

module.exports = app;
