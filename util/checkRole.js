const checkRole = async (allowedRoles) => {
  return async (req, res, next) => {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You do not have permission to access this resource.",
      });
    }
    next();
  };
};
export default checkRole;
