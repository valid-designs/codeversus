import jwt from 'jsonwebtoken.js';

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header)
      return res.status(401).json({ success: false, error: "No token" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ success: false, error: "Invalid token" });
  }
};
