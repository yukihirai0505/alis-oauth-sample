"use strict";
const base64url = require("base64url");
const sha256 = require("js-sha256");

const alis_oauth_base_url = "https://alis.to/oauth-authenticate";
const code_verifier = get_code_verifier();
const code_challenge = get_code_challenge(code_verifier);
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

console.log(`code_verifier = ${code_verifier}`);
console.log(`code_challenge = ${code_challenge}`);

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

module.exports = (req, res) => {
  const oauthUrl = `${alis_oauth_base_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=read&code_challenge=${code_challenge}`;
  res.end(oauthUrl);
};
