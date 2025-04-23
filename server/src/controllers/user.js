import knex from '../config/knexfile.js'
import bcrypt from 'bcrypt'
const userCtrl = {
    addUser: async (ctx) => {    
        try {
            // 사용자 정보를 누락한 채, 회원가입을 시도한다면?!
            const {id} = ctx.request.body
            if(!id) {
                ctx.status = 400; 
                ctx.body = {
                    msg : "입력정보를 다시 확인하세요",
                }
                return
            }

            const foundUser = await knex('users').where({id: ctx.request.body.id})[0]
            console.log(foundUser)
            if (foundUser) {
                ctx.status = 400
                ctx.body = {
                    message: '회원정보가 존재합니다'
                }
                return
            }

            // 비밀번호 해시처리
            const hashedPassword = bcrypt.hashSync(ctx.request.body.pwd, 10)
            await knex('users').insert({
                id: ctx.request.body.id,
                pwd: hashedPassword,
                name: ctx.request.body.name,
                phone: ctx.request.body.phone,
                email: ctx.request.body.email
            })

            ctx.status = 200
            ctx.body = {
                msg: "회원 등록 성공!"
            }
            
        } catch (err) {
            console.error(err)           
        }
    },
    updateUser: async (ctx) => {
        // id값 기준으로 user 존재하는지!! 확인하고,
        const existUser = await knex('users').where({id: ctx.request.body.id})
        console.log(existUser, typeof existUser)
        if(existUser.length < 1) {
            ctx.status = 401
            ctx.body = {
                msg: "회원정보가 존재하지 않습니다."
            }
            return
        }
        
        // 새로운 정보로 업데이트! (id를 제외하고)
        // 비밀번호를 수정하더라도, 암호 해싱처리 후에 변경
        const hashedPassword = bcrypt.hashSync(ctx.request.body.pwd, 10)
        await knex('users').where({id: ctx.request.body.id}).update({            
            pwd: hashedPassword,
            name: ctx.request.body.name,
            phone: ctx.request.body.phone,
            email: ctx.request.body.email
        })

        ctx.status = 200
        ctx.body = {
            msg: "회원정보가 수정되었습니다."
        }
    }
    
}

export default userCtrl