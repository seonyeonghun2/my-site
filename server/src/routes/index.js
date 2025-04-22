import Router from '@koa/router';
const router = new Router();

router.post('/api/user', ctx => {
    // const {id, name, pwd, phone, email} = ctx.req.request.body
    console.log(ctx.request)
})

export default router