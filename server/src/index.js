import {fileURLToPath} from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import Koa from 'koa'
import websockify from 'koa-websocket'
const app = websockify(new Koa())
import cors from '@koa/cors'
import logger from 'koa-morgan'
import bodyParser from '@koa/bodyparser'
import authMiddleware from './middleware/authMiddleware.js'
import serve from 'koa-static'
import Router from '@koa/router'
const router = new Router()
const wsRouter = new Router();
import api from './routes/index.js'
import blog from './routes/blog.js'
import works from './routes/works.js'
import contacts from './routes/contacts.js'

app.use(cors({
    origin: '*',
    credentials: true,
}))
// console.log(path.join(__dirname, '/uploads'))
app.use(serve(path.join(__dirname, '../public')));
app.use(logger('dev'))
app.use(bodyParser())
app.use(authMiddleware)
app.ws.use(function(ctx, next) {
    // return `next` to pass the context (ctx) on to the next ws middleware
    return next(ctx);
  });


// api, blog, works 라우트 미들웨어보다 앞서서 authMiddleware 사용 (=미들웨어 장착)
router.use("/api", api.routes());
router.use("/blog", blog.routes());
router.use("/works", works.routes());
router.use("/contacts", contacts.routes());
// Using routes
wsRouter.get('/', async (ctx, next) => {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Hello World :p');
    ctx.websocket.on('message', (message) => {
        console.log(message.toString())      
    });
    return next;
  });
app.ws.use(wsRouter.routes()).use(wsRouter.allowedMethods());
app.use(router.routes()).use(router.allowedMethods())


app.listen(4000, () => {
    console.log('server is listening on port 4000!')
})