import { Router } from 'express'
import { getVersions, saveVersion } from '../controllers/auditController.js'

const router = Router()

// Route for GET '/versions'
router.get('/versions', getVersions)

// Route for POST '/save-version'
router.post('/save-version', saveVersion)

export default router
