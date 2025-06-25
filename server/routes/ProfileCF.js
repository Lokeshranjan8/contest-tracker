import express from 'express';
import ProfileController from '../controller/ProfileController.js';
const router = express.Router();

router.get("/profile/:username", ProfileController);

export default router;