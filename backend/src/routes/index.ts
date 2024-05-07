import { Router } from "express";
import grouprouter from "./GroupRoutes";
import meetingrouter from "./MeetingRoutes";
import ownerrouter from "./OwnerRoutes";
import referralrouter from "./ReferralRoutes";
import taskrouter from "./TaskRoutes";
import userrouter from "./UserRoutes";
import authRoute from "./authRoutes";
import filerouter from "./FileRoutes";
import perkrouter from "./PerkRoutes";

const router = Router();

router.use('/api/tasks', taskrouter);
router.use('/api/users', userrouter);
router.use('/api/owners', ownerrouter);
router.use('/api/referrals', referralrouter);
router.use('/api/groups', grouprouter);
router.use('/api/meetings', meetingrouter);
router.use('/api/files', filerouter);
router.use('/api/perks', perkrouter);

router.use('/account', authRoute);

export default router;