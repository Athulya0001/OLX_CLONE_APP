import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next)=>{

try {
    const token = req.cookies.auth_token; 
    if (!token) {
        req.user = null; 
        return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, name: decoded.name }; 
    console.log("Authenticated User:", req.user);
    next();
} catch (error) {
    console.error("Auth Middleware Error:", error);
    req.user = null;
    next();
}
}