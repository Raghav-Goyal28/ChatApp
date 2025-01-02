import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  // Create JWT token
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });

  // Set cookie expiration to match JWT expiration (10 days)
  const cookieOptions = {
    httpOnly: true, // Prevent XSS
    secure: process.env.NODE_ENV === "production", // Use secure cookie in production
    sameSite: "strict", // Prevent CSRF
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
  };

  // Set cookie with the JWT token
  res.cookie("jwt", token, cookieOptions);
};

export default createTokenAndSaveCookie;
