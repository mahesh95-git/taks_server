import { response } from "express";
import trycatchWrapper from "../util/trycatch";
import jwt from "jsonwebtoken";

const auth=trycatchWrapper(async()=>{

    const authHeader=req.headers.authorization;
    const cookie=req.cookies.token;

    if(!authHeader && !cookie) {
        return response(res, 401, "Unauthorized", false, null);
    }
    const token = authHeader ? authHeader.split(" ")[1] : cookie;


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
        return response(res, 401, "Unauthorized", false, null);
    }
    req.user=decoded;
    req.userId = decoded.userId;
    next();

})
export default auth;