const jwt = require("jsonwebtoken");
const { Provider } = require("../model/eventManagerModel");

exports.authenticateToken = (req, res, next) => {
  "";

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.PROVIDER_REFRESH_SECRET,async (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "acceess token is not vaild ",
      });
    }
    if (user) {
      // req.user = user
      let userExist = await Provider.findOne({ email: user.email });
      if (!userExist)
        return res.status(403).json({
          message: "access token is not valid ",
        });
      next();
    }
  });
};
