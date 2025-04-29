import knex from '../config/knexfile.js';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const blogCtrl = {
    create: async (ctx) => {        
        const {id, name} = ctx.state.user
        const {title, content, categories} = ctx.request.body
        try {
            await knex('posts').insert({
               wr_id : id,
               title: title,
               content: content,
               categories: categories
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
    
    read: async (ctx) => {
        try {
            const posts = await knex('posts').orderBy("id", "desc").limit(2)
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
        console.log(ctx.params);
        const post = await knex('posts').where({id: ctx.params.postId}).first()
        if (!post) {
            ctx.status = 500
            ctx.body = {
                msg: '일치하는 포스트가 없습니다'
            }
        }        
        ctx.status = 201
        ctx.body = post
    },
    delete: async (ctx) => {
        const { postId } = ctx.params
        try {
            const result = await knex('posts').where("id", postId).delete();
            console.log(result)
            ctx.status = 200
            ctx.body = {
                msg: "포스트 삭제",
                data: true
            }
        } catch (err) {
            console.error(err)
            ctx.status = 500
            ctx.body = {
                msg: "포스트 삭제 실패"
            }
        }
    }
}

export default blogCtrl