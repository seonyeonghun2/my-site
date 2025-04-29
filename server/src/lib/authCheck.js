const authCheck = async (ctx, next) => {
    // 미들웨어간 공유되는 정보(ex.로그인된 사용자 정보)
    const {id, name} = ctx.state.user    
    console.log("================ 접속자 정보 ===============")
    console.log(id, name)
    if(id !== 'user3' || name !== '유저3') {
        ctx.status = 401
        ctx.body = {
            msg: "권한이 없습니다."
        }
        return next();
    }
    return next()
}
export default authCheck