const { usersSchema } = require("../../model/users.schema")
const { sendEmail } = require("../../utils/nodeMailer.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const emailServiceId = process.env.TWILIO_EMAIL_SERVICE_ID;
const twilio = require("twilio")(accountSid, authToken, {
    lazyLoading: true,
});
//register function

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        //checking if username is teaken
        const existingUserName = await usersSchema.findOne({ userName: userName })
        if (existingUserName) {
            res.json({
                status: 400,
                existingUserName: true,
                message: "user with a given Username already exists"
            })
        }
        else {
            const existingEmail = await usersSchema.findOne({ email: email });
            if (existingEmail) {
                res.json({
                    status: 400,
                    existingEmail: true,
                    message: "user with a given email already exists"
                })
            }
            else {
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) {
                        throw err;
                    } else {

                        const user = new usersSchema({
                            userName: userName,
                            email: email,
                            password: hash
                        })

                        let userToSign = {
                            userName: userName,
                            email: email
                        }

                        const accessToken = jwt.sign(userToSign, process.env.ACCESS_KEY_SECRET)

                        if (user) {
                            twilio.verify
                                .services(emailServiceId)
                                .verifications.create({
                                    to: email,
                                    channel: "email"
                                }).then(() => {
                                    user.save((err, user) => {
                                        console.log(err)
                                        console.log(user)
                                        if (err) {
                                            console.log(err)
                                            res.status(500).json({ message: err })
                                        } else {
                                            res.status(201).json({
                                                success: true,
                                                message: "user created, profile saved and verification code is sent to email",
                                                accessToken: accessToken,
                                                user: user
                                            })
                                        }
                                    })
                                }).catch(err => {
                                    res.status(500).json({
                                        success: false,
                                        message: err.message
                                    })
                                })

                        }
                    }
                })
            }

        }
    } catch (err) {
        console.log(err)
    }
}
//register function

module.exports.register = register;