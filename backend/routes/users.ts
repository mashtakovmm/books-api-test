import { Router } from "express";
import { getUserInfo, postLoginUser, postRegisterUser } from "../controllers/users";
import { userValidateBody, userValidateResult } from "../middleware/validator";
import verifyToken from "../middleware/verify-token";

const router = Router();

router.route('/register').post(userValidateBody, userValidateResult, postRegisterUser)
router.route('/login').post(postLoginUser)
router.route('/me').get(verifyToken, getUserInfo)
// router.route('/:id/role').put(putChangeUserRole)

export default router