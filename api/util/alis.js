const base64url = require("base64url");
const sha256 = require("js-sha256");
const fetch = require("node-fetch");
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const alis_oauth_base_url = "https://alis.to/oauth2";
const alis_api_base_url = "https://alis.to/oauth2api";

// https://alisproject.github.io/oauth2/authorization-url/#%E6%A6%82%E8%A6%81
export const getOAuthUrl = req => {
  const code_verifier = get_code_verifier();
  const code_challenge = get_code_challenge(code_verifier);
  req.session.code_verifier = code_verifier;
  return `https://alis.to/oauth-authenticate?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=read&code_challenge=${code_challenge}`;
};

export const getToken = req => {
  const { code_verifier } = req.session;
  const { code } = req.query;
  const token = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const options = {
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&code_verifier=${code_verifier}`,
    method: "POST",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  return fetch(`${alis_oauth_base_url}/token`, options);
};

export const getMyInfo = access_token => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `${access_token}`,
      "Content-Type": "application/json"
    }
  };
  return fetch(`${alis_api_base_url}/me/info`, options);
};

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
