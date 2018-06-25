/**
 * Created by ink on 2018/5/3.
 */
import express from 'express'
import extractMapping from '../middleware/extractMapping'

import integrationController from '../controller/integration'
import componentsController from '../controller/components'
const router = express.Router()

router.get('/', (req, res) => {
  res.status(301).set('Location', '/').end()
})

router.use('/integration', extractMapping, integrationController.router)

router.use('/components', extractMapping, componentsController.router)

export default router
