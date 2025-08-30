

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    
    console.log("=== SECURE ROUTE DEBUG ===");
    console.log("Token:", token);
    console.log("JWT_TOKEN env:", process.env.JWT_TOKEN);

    // Check if the token exists
    if (!token) {
      console.log("No token found");
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("Decoded token:", decoded);
    if (!decoded) {
      console.log("Invalid token");
      return res.status(401).json({ error: "Invalid Token" });
    }

    // Find the user based on the token's payload (userId)
    const user = await User.findById(decoded.userId).select("-password");
    console.log("Found user:", user);
    if (!user) {
      console.log("No user found");
      return res.status(401).json({ error: "No user found" });
    }

    // Attach user to the request object
    req.user = user;
    console.log("User attached to request:", req.user);
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
