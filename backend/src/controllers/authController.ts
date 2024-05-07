import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from 'path';

import User from "../models/User";
import {
  secretKey,
  appname,
  frontendBaseUrl,
  frontendBaseVerificationUrl,
} from "../config";
import { sendEmail } from "../utils/sendEmail";
import Token from "../models/token";
import uploadFile from '../middleware/uploadMiddleware';
import { UserGroup } from "../models";
import { UserGroupRepository } from "../repositories";
import { Roles } from "../enums/role.enums";

const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone, street, city, zipcode} = req.body;
    await uploadFile(req, res);

    const userExists = await User.findOne({ email });

    // return res.status(200).json(userExists).send();
    if (userExists) res.status(StatusCodes.BAD_REQUEST).send();
    const totCount = await User.countDocuments().lean();
    const roles = totCount < 1 ? [Roles.SUPERADMIN] : [Roles.USER];
    const user = new User({
      name: firstName + ' ' + lastName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      zipcode:zipcode,
      street:street,
      city:city,
      roles: roles,
      profileStatus: (totCount < 1),
      password: bcrypt.hashSync(password, 8),
    });
    await user.save();

    res.status(202).send();
    sendEmail({
      email,
      subject: "Verification",
      template: "verificationEmailTemplate.ejs",
      compiledTemplateData: {
        appname: appname,
        verificationType: "signup",
        buttonName: "Verify",
        verifyurl: `${frontendBaseVerificationUrl}?id=${user.id}`,
        actiontype: "verification",
        appbaseurl: frontendBaseUrl,
      },
    });
    return;
  } catch (err) {
    console.log(err);

    res.status(500).send();
  }
};


const login = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send();
    }

    const isPwdValid = bcrypt.compareSync(password, user.password);
    if (!isPwdValid) {
      return res.status(400).send();
    }
    if (!user.isEmailVerified) {
      res.status(202).send({status:"Pending. Verify by email."});
      await sendEmail({
        email,
        subject: "Verification",
        template: "verificationEmailTemplate.ejs",
        compiledTemplateData: {
          appname: appname,
          verificationType: "login",
          buttonName: "Verify",
          verifyurl: `${frontendBaseVerificationUrl}?id=${user.id}`,
          actiontype: "verification",
          appbaseurl: frontendBaseUrl,
        },
      });
      return;
    }
    if (!user.profileStatus) {
      return res.status(202).send({status:"not active or suspended"});
    }

    const token = jwt.sign(
      { id: user.id, },
      secretKey,
      { algorithm: "HS256", expiresIn: "7d" }
    );

    return res.status(200).json({ accessToken: token, data: user });
  } catch (err) {
    return res.status(500).send();
  }
};


const fetchMe = async (req: Request, res: Response) => {
  // const email = req.body?.decoded?.email;
  const { user_id } = req.body;
  try {
    const user = await User.findOne({ _id: user_id }).lean();
    if (!user) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
    const group = await UserGroupRepository.findOneWithGroupByUser(user?._id);
    return res.status(StatusCodes.OK).json({...user, groupInfo: group});
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).send("User with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: jwt.sign(
          {
            email: email,
          },
          secretKey,
          { algorithm: "HS256" }
        ),
      }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;

    await sendEmail({
      email,
      subject: "Password reset",
      template: "verificationEmailTemplate.ejs",
      compiledTemplateData: {
        appname: appname,
        verificationType: "password-reset",
        buttonName: "Reset Password",
        verifyurl: link,
        actiontype: "password-reset",
        appbaseurl: frontendBaseUrl,
      },
    });

    res.send("Password reset link sent to your email account");
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const verifyUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    await User.findOneAndUpdate(
      { _id: id },
      { isEmailVerified: true },
      { new: true }
    );
    return res.status(StatusCodes.OK).sendFile(path.join(__dirname, '../templates/verificationWebTemplate.html'));
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { user_id, currentpassword, password, confirmpassword} = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send();
    }
    const isPwdValid = bcrypt.compareSync(currentpassword, user.password);
    if (!isPwdValid) {
      return res.status(400).send("Current Password not matches.");
    }
    await User.findByIdAndUpdate(user_id, {password: bcrypt.hashSync(password, 8)}, { new: true });
    return res.status(200).send();
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const authController = {
  signup,
  login,
  forgotPassword,
  fetchMe,
  verifyUserById,
  resetPassword,
};

export default authController;
