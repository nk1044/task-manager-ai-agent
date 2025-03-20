import Router from 'express';
import {generateText} from '../Controllers/agent.controller.js';


const router = Router();

router.route('/generateText').post(generateText);

export default router;