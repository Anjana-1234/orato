import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    try {
        // 1️⃣ Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token provided",
            });
        }

        // 2️⃣ Extract token
        const token = authHeader.split(" ")[1];

        // 3️⃣ Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "your-default-secret-key-change-this"
        );

        // 4️⃣ Attach user info to request
        req.user = decoded;

        // 5️⃣ Continue
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token invalid",
        });
    }
};

export default protect;