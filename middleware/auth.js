const jwt = require("jsonwebtoken")
const { Unauthenticated } = require("../errors")


const authenticationMiddleware = async (req, res, next) => {
    console.log(req.headers.authorization)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthenticated("No token provided")

    }
    const token = authHeader.split(" ")[1]
    console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const { id, username } = decoded
        req.user = { id, username }
        next()



    } catch (errr) {
        throw new Unauthenticated("Not authorized to access this route")

    }
    next()

}

module.exports = authenticationMiddleware