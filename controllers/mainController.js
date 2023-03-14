const { BadRequest } = require("../errors")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new BadRequest("PLease provide email and password")
    }

    const id = new Date().getDate()
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" })

    res.status(200).json({ mssg: 'user createed', token })
}
const dashboard = async (req, res) => {
    // console.log(req.headers) resend request dashboard 

    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     throw new CustomAPIError("No token provided", 401)

    // }
    // const token = authHeader.split(" ")[1]
    // console.log(token)

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     console.log(decoded)

    //     const luckyNumber = Math.floor(Math.random() * 100)

    //     res.status(200).json({
    //         msg: `Hello, ${decoded.username}`,
    //         secret: `Here i s your authorized data, your lucky number is ${luckyNumber}`,
    //     })
    // } catch (errr) {
    //     throw new CustomAPIError("Not authorized to access this route", 401)

    // }
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here i s your authorized data, your lucky number is ${luckyNumber}`
    })



}

module.exports = { login, dashboard }