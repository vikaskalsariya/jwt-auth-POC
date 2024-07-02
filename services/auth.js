const jwt = require("jsonwebtoken");
exports.setUser = async (user) => {
  try {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (err) {
    next(err);
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.uid;
    if (!token) return res.status(401).json({ message: "UNAUTHORIZED" });

    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." + error.message });
  }
};
