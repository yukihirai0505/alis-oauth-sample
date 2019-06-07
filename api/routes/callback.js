const app = require("../util/app");
const { getToken, getMyInfo } = require("../util/alis");

app.get("*", async (req, res) => {
  const tokenResponse = await getToken(req);
  const { access_token } = await tokenResponse.json();
  const myInfoResponse = await getMyInfo(access_token);
  const { user_id } = await myInfoResponse.json();
  res
    .status(200)
    .send(`Hi ${user_id}!<br/>Your Access Token is: ${access_token}`);
});

module.exports = app;
