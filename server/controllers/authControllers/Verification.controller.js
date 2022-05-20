const { usersSchema } = require("../../model/users.schema")
const jwt = require("jsonwebtoken")
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const emailServiceId = process.env.TWILIO_EMAIL_SERVICE_ID;
const twilio = require("twilio")(accountSid, authToken, {
    lazyLoading: true,
});
//email verification 
const verifyEmail = async (req, res) => {
    try {
        console.log(req.body)
        const { email, verificationCode } = req.body;
        if (!verificationCode)
            return res.status(400).json({
                success: false,
                message: "Verification code is required",
            });
        twilio.verify
            .services(emailServiceId)
            .verificationChecks.create({
                to: email,
                code: verificationCode,
            })
            .then((data) => {
                if (data.status == "approved") {
                    usersSchema.updateOne({ email: email }, { verified: true }, { new: true }, (err, update) => {
                        err ? res.json({
                            status: 500,
                            success: false,
                            message: err,
                        }) : res.status(201).json({
                            success: true,
                            message: "user account verification successful",
                        });
                    })
                } else if (data.status == "pending") {
                    res.status(400).json({
                        //invalid Code
                        success: false,
                        isInvalid: true,
                        message: "Verification code is invalid"
                    })
                }
            })
            .catch((err) => {
                if (err.status == 404) {
                    //exipired Code
                    res.status(404).json({
                        success: false,
                        isExpired: true,
                        message: "the verification code has exipired"
                    })
                }
                else if (err.errno === -3008) {
                    return res.status(500).json({
                        success: false,
                        message: "Connect to internet",
                    });
                }
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
//email verification

// access token verification

let verifyToken = async (req, res) => {
    try {
        let accessToken = req.params.accessToken
        jwt.verify(accessToken, process.env.ACCESS_KEY_SECRET, (err, account) => {
            err ? res.json({
                status: 403,
                authorized: false,
                message: "invalid access token"
            }) : usersSchema.findOne({ email: account.email }, (err, user) => {
                err ? res.json({
                    status: 500,
                    authorized: false,
                    message: "internal server error"
                }) : user ?
                res.json({
                    status: 200,
                    authorized: true,
                    user: user
                }) : res.json({
                    status: 404,
                    authorized: false,
                    message: "user not found"
                })
            })
        })
    } catch (error) {
        return console.error(error)
    }
}

// access token verification

//resend verification code
const resendEmailVerificationCode = async(req, res) => {
    try {
      const email = req.body.email;
      twilio.verify
        .services(emailServiceId)
        .verifications.create({ to: email, channel: "email" })
        .then(() => {
          res
            .status(200)
            .json({
              success: true,
              message: `verification code resent to ${email}`,
            });
        })
        .catch((error) =>
          res.status(500).json({ success: false, message: error.message })
        );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }; 
//resend verification code 


module.exports.verifyEmail = verifyEmail;
module.exports.verifyToken = verifyToken;
module.exports.resendEmailVerificationCode=resendEmailVerificationCode;