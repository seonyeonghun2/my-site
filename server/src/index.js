import Koa from 'koa'
const app = new Koa()
import cors from '@koa/cors'
import logger from 'koa-morgan'
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser'
const router = new Router()
import api from './routes/index.js'
import blog from './routes/blog.js'
import works from './routes/works.js'
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(logger('dev'))
app.use(bodyParser())

router.use("/api", api.routes());
router.use("/blog", blog.routes());
router.use("/works", works.routes());
app.use(router.routes()).use(router.allowedMethods())


app.listen(4000, () => {
    console.log('server is listening on port 4000!')
})