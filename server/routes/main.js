/**
 * Created by ink on 2018/5/3.
 */
import express from 'express';
import pages from './pages';
import homeController from '../controller/home';

const router = express.Router();

router.use('/p', pages);

router.get('/', homeController.router);

export default router;
