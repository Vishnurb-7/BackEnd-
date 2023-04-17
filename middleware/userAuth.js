const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.USER_REFRESH_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "access token is not valid ",
    });
}
if (user) {
    // req.user = user
    let userExist = await User.findOne({ email: user.email });
      if (!userExist)
        return res.status(403).json({
          message: "access token is not valid ",
        });
      next();
    }
  });
};
