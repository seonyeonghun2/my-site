import 'dotenv/config'
import knex from '../config/knexfile.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
        console.log(ctx.request.body)
        // id값 기준으로 user 존재하는지!! 확인하고,
        const existUser = await knex('users').where({id: ctx.request.body.id})
        // console.log(existUser, typeof existUser)
        if(existUser.length < 1) {
            ctx.status = 401
            ctx.body = {
                msg: "회원정보가 존재하지 않습니다."
            }
            return
        }
        
        // 새로운 정보로 업데이트! (id를 제외하고)
        await knex('users').where({id: ctx.request.body.id}).update({            
            name: ctx.request.body.name,
            phone: ctx.request.body.phone,
            email: ctx.request.body.email
        })

        ctx.status = 200
        ctx.body = {
            msg: "회원정보가 수정되었습니다."
        }
    },
    signIn: async (ctx) => {
        // id 또는 pwd 유무 체크
        const {id, pwd} = ctx.request.body

        if(!id || !pwd) {
            ctx.status = 400
            ctx.body = {
                msg: "아이디 또는 비밀번호가 누락되었습니다."
            }
            return
        }

        // id와 일치하는 유저를 찾고,
        const existUser = await knex('users').where({id: id})
        // console.log(existUser)
        if(existUser.length < 1) {
            ctx.status = 400
            ctx.body = {
                msg: "회원정보가 존재하지 않습니다."
            }
            return
        }
        
        // 찾은 유저의 해시된 비밀번호와, body로 전달된 비밀번호를 비교
        const isMatch = await bcrypt.compare(pwd, existUser[0].pwd)

        if(!isMatch) {
            ctx.status = 400
            ctx.body = {
                msg: "비밀번호가 일치하지 않습니다."
            }
            return
        }
        
        // console.log("환경변수 : ", process.env.JWT_SECRET)
        // jwt : 토큰 발급
        const token = jwt.sign({
            user_id: existUser[0].id,
            user_name: existUser[0].name,
            user_email: existUser[0].email,
            user_phone: existUser[0].phone
        }, process.env.JWT_SECRET, {
            expiresIn: '1d',            
        })

        // cookie를 생성 --> 응답 : 응답헤더에 기록되어 전송
        // console.log(token);
        ctx.cookies.set("auth_token", token, {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
            path: '/'
        })
        console.log(ctx.response.headers)
        ctx.status = 200
        ctx.body = {
            msg: "로그인 성공!"
        }
    }
    
}

export default userCtrl