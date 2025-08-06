import express from 'express';
import {
  addSample,
  markCollected,
  getSamplesForAgent,
  reportDelay,
  updateSampleStatus,
  getSampleTracking
} from '../controllers/sample.controller';

import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.post('/', authenticate, addSample);
router.patch('/:id/collect', authenticate, markCollected);
router.get('/my', authenticate, getSamplesForAgent);
router.patch('/:id/delay', authenticate, reportDelay);
router.patch('/:id/status', authenticate, updateSampleStatus);
router.get('/:id/tracking', authenticate, getSampleTracking);

export default router;
