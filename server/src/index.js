import Koa from 'koa'
const app = new Koa()
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser'
const router = new Router()
import config from './config/knexfile.js'
import userRouter from './routes/index.js'
app.use(bodyParser())

// router.use("/api", userRouter);
router.post('/api/user', async (ctx) => {    
    try {
        await config.insert(ctx.request.body).into('users')
    } catch (err) {
        console.error(err)           
    }

})
app.use(router.routes()).use(router.allowedMethods())


app.listen(4000, () => {
    console.log('server is listening on port 4000!')
})