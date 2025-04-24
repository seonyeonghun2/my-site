import knex from "../config/knexfile.js"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
const worksCtrl = {
    addWork: async (ctx) => {
    
        const authHeader = ctx.request.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            ctx.status = 401
            ctx.body = {
                msg: "토큰이 유효하지 않거나 인증되지 않았습니다."
            }
            return
        }

        const authToken = authHeader.split(" ")[1]
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
        
        // 1.컨트롤러에서 권한을 확인 
        // 2.미들웨어를 통해서 권한을 체크 ex>checkAuth.js ==> 필요한 요청에서 처리
        if(decoded.user_id !== 'user2' || decoded.user_role !== 'admin') {
            ctx.status = 401
            ctx.body = {
                msg: "권한이 없거나 관리자가 아닙니다"
            }
        }

        // await knex('works').insert(ctx.request.body)
    }
}
// },
// viewWork: async (ctx) => {

// } ,
// editWork: async (ctx) => {

// },
// removeWork: async (ctx) => {

// }

export default worksCtrl