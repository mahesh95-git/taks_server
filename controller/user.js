import trycatchWrapper from "../util/trycatch.js";
import { prisma } from "../util/postgresdp.js";
import response from "../util/response.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signupService = trycatchWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return response(res, 400, "All fields are required", null, false);
  }
  const isExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isExist) {
    return response(res, 400, "User already exists", null, false);
  }
  const incryptedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: incryptedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );

  return response(res, 201, "singup  successfully", user, true, token);
});

const signinService = trycatchWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return response(res, 400, "All fields are required", null, false);
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );

  if (!user) {
    return response(res, 400, "User does not exist", null, false);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return response(res, 400, "Invalid credentials", null, false);
  }
  return response(
    res,
    200,
    "Signin successfully",
    { name: user.name, email: user.email, id: user.id },
    true,
    token
  );
});

export { signupService, signinService };
