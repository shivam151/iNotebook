const jwt = require("jsonwebtoken");
const JWT_SECRET = "shivam is the goos boy ";
const fetchuser = (req, res, next) => {
  // get the user from the jwt token its
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "access denied" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "access denied" });
  }
};

module.exports = fetchuser;
