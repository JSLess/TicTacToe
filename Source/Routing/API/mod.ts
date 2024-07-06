
export { router as api }

import { handleSparks } from './Spark/mod.ts'
import { onlySessions } from '../Middlewares/mod.ts'
import { Router } from 'Oak'


const router = new Router

router.get('/Spark',onlySessions,handleSparks)

