import { Router } from "express";
import {
    getUserInfo,
    postLoginUser,
    postRegisterUser,
    putChangeUserRole,
    getVerifyUserEmail
} from "../controllers/users";
import { userValidateBody, userValidateResult } from "../middleware/validator";
import verifyToken from "../middleware/verify-token";

const router = Router();

router.route('/register').post(userValidateBody, userValidateResult, postRegisterUser)
router.route('/login').post(postLoginUser)
router.route('/me').get(verifyToken, getUserInfo)
router.route('/:id/role').put(verifyToken, putChangeUserRole)
router.route('/verify/:token').get(getVerifyUserEmail)

export default router