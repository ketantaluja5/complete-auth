const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - token verification failed",
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error verifying token", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal serer error" });
  }
};

module.exports = { verifyToken };
