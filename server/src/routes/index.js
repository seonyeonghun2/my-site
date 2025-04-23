import Router from '@koa/router';

const api = new Router();
import userCtrl from '../controllers/user.js';
api.post('/user', userCtrl.addUser)
// api.put('/user/:id', userCtrl.updateUser)
api.put('/user', userCtrl.updateUser)

export default api