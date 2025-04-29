import Router from '@koa/router'
import blogCtrl from '../controllers/blog.js';
const blog = new Router()

blog.post('/create', blogCtrl.create)
blog.get('/read', blogCtrl.read)
blog.get('/post/:postId', blogCtrl.singlePost)
blog.put('/update', blogCtrl.update)
blog.delete('/delete/:postId', blogCtrl.delete)

export default blog;