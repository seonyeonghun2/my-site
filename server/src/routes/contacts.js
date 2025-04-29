import Router from '@koa/router'
import contactCtrl from '../controllers/contact.js'
import authCheck from '../lib/authCheck.js'
const contacts = new Router()
// express.js vs koa.js 차이, ? (optional, 옵션 - 있을수도 있고! 없을수도 있고!)
contacts.get('/all', contactCtrl.readContacts)
contacts.get('/read/:contactId', contactCtrl.readContact)
contacts.post('/create', authCheck, contactCtrl.createContacts)
contacts.delete('/delete/:contactId', authCheck, contactCtrl.removeContact)

export default contacts