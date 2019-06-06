const cookieSession = require("cookie-session");

module.exports = cookieSession({
  name: "sample",
  keys: [process.env.COOK_KEY],
  // domain: "https://alis-oauth-sample.yukihirai0505.now.sh",

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
