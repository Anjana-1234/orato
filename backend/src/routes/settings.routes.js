import express from 'express';
import {
    getSettings,
    updateSettings,
    deleteAccount,
    downloadUserData,
} from '../controllers/settings.controller.js';

const router = express.Router();

// Download route — /userId/download must be defined.
// Otherwise the word "download" will be caught as a userId.
router.get('/:userId/download', downloadUserData);
router.get('/:userId', getSettings);
router.put('/:userId', updateSettings);
router.delete('/:userId', deleteAccount);

export default router;