import knex from '../config/knexfile.js';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const blogCtrl = {
    create: async (ctx) => {
        const authHeader = ctx.request.headers.authorization.split(' ')[1]
        if (!authHeader || !ctx.request.headers.authorization.startsWith('Bearer ')) {
            ctx.status = 401; // Not Authorization
            ctx.body = {
                msg: '유효하지 않는 토큰입니다.'
            }
        }
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET)
        const author = decoded.user_id
        const {title, content} = ctx.request.body
        try {
            await knex('posts').insert({
               wr_id : author,
               title: title,
               content: content 
            }).then(() => {
              ctx.status = 200
              ctx.body = {
                msg: '글 등록 성공!'
              }  
            })
        } catch (err) {
            console.error(err)
            ctx.status = 500
            ctx.body = {
                msg : '글 등록 실패!'
            }
        }
    },
    update: async (ctx) => {
        // 요청바디에서 값의 누락이 없는지 검사!
        // 요청바디를 해석해서 posts 테이블에 .insert()
        // 글 등록후에 특정 경로로 리다이렉트 or 메세지 전송
    },
    delete: async (ctx) => {
        // 요청바디에서 값의 누락이 없는지 검사!
        // 요청바디를 해석해서 posts 테이블에 .insert()
        // 글 등록후에 특정 경로로 리다이렉트 or 메세지 전송
    },
    read: async (ctx) => {
        try {
            const posts = await knex('posts')
            ctx.status = 200
            ctx.body = {
                msg: '데이터를 조회 성공!',
                data: posts
            }
        } catch (err) {
            ctx.status = 500
            ctx.body = {
                msg: '데이터를 조회할수 없습니다.'
            }
        }
    },
    singlePost: async (ctx) => {
        const post = await knex('posts').where({id: ctx.params.postId}).first()
        if (!post) {
            ctx.status = 500
            ctx.body = {
                msg: '일치하는 포스트가 없습니다'
            }
        }        
        ctx.status = 201
        ctx.body = post
    }
}

export default blogCtrl