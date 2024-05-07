import {Router} from "express";
import {Request, Response} from "express";


import { 
    signinSchema, 
    signupSchema, 
    verifyItemByIdSchema, 
    verifyItemByEmailSchema 
} from "../validators";
import { validatePayload } from "../middleware/payloadvalidatorMiddleware";
import authController from "../controllers/authController";
import {verifyToken} from "../middleware/authMiddleware";

const authRoute: Router = Router();

authRoute.post("/login", validatePayload(signinSchema), authController.login);//complete
authRoute.post("/signup", validatePayload(signupSchema), authController.signup);//complete
authRoute.get("/verifyuserbyid", validatePayload(verifyItemByIdSchema), authController.verifyUserById);//complete
// authRoute.post("/forgot-password", validatePayload(verifyItemByEmailSchema), authController.forgotPassword);//complete
authRoute.post("/password-reset", verifyToken, authController.resetPassword);
authRoute.get("/me", verifyToken, async (req : Request, res : Response) => {
    await authController.fetchMe(req, res);
});

export default authRoute;
