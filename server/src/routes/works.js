import Router from '@koa/router'
import worksCtrl from '../controllers/works.js';
import authCheck from '../lib/authCheck.js';
const works = new Router()

// works.get('/all', worksCtrl.readWorks)
works.post('/add', authCheck, worksCtrl.addWork)

export default works;