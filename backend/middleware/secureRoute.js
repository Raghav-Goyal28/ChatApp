

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    // Find the user based on the token's payload (userId)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    // Handle JWT errors (e.g., expired token, invalid signature)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token signature" });
    }

    // Catch any other errors (database issues, etc.)
    console.error("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;
