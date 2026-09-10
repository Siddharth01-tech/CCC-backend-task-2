const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : req.headers.authorization);

    if (!token) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded?.id || decoded?.userId;
        if (!decoded || !userId) {
            return res.status(403).json({
                message: "you don't have access"
            });
        }
        req.user = decoded;
        req.user.id = userId;
        req.user.userId = userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
};

module.exports=authMiddleware