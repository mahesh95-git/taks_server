
function response(res,status,message,data=null,success=true,token=null) {
   if(token){
     res.cookie("loginToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge:process.env.COOKIE_AGE // 2 day
    });
   }

    return res.status(status).json({
        success: success,
        message: message,
        data: data
    });
}
export default response;


