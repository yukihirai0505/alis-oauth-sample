const app = require("../util/app");
const { getOAuthUrl } = require("../util/alis");

app.get("*", (req, res) => {
  res.status(200).send(getOAuthUrl(req));
});

module.exports = app;
