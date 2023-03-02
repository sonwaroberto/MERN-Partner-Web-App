import express from 'express'
import * as PartnersController from '../controllers/partners'

const router = express.Router()

router.get('/', PartnersController.getPartners)
router.get('/:partnerId', PartnersController.getPartner)

router.post('/', PartnersController.createPartner)

router.patch('/:partnerId', PartnersController.updatePartner)

router.delete('/:partnerId', PartnersController.deletePartner)

export default router
