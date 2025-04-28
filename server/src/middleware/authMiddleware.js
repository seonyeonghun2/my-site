import 'dotenv/config'
import jwt from 'jsonwebtoken'
// const JWT_SECRET = process.env.JWT_SECRET || 'randomizedYourUniqueText'
const authMiddleware = async (ctx, next) => {
    // 토큰 존재여부 확인
    const authHeader = ctx.request.headers.authorization    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ctx.status = 401 // Not Allowed Error
        ctx.body = {
            msg: '토큰이 만료되었거나 인증정보가 존재하지 않습니다.'
        }
        return next()
    }
    // 토큰 내부의 정보 확인
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
 
    // 토큰에 있는 사용자 정보 확인

    // 미들웨어간에 사용자 정보를 공유
    ctx.state.user = {
        id: decoded.user_id,
        name: decoded.user_name
    }    
    return next()
}

export default authMiddleware;