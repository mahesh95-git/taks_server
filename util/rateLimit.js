import rateLimit from "express-rate-limit";
const signinLimiter=rateLimit({
   windowMs:10*60*1000, // 10 minutes
   limit:5, // limit each IP to 5 requests per windowMs
   message:"Too many login attempts from this IP, please try again after 10 minutes"

})
const signupLimiter=rateLimit({
   windowMs:10*60*1000, // 10 minutes
   limit:5, // limit each IP to 5 requests per windowMs
   message:"Too many signup attempts from this IP, please try again after 10 minutes"

})

export {
    signinLimiter,
    signupLimiter
}


