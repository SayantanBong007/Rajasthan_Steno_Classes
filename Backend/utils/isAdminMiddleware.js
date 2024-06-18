export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};
