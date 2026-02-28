import jwt from "jsonwebtoken";

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No Token Provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Invalid Token" });

    req.admin = decoded;
    next();
  });
};