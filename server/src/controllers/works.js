import knex from "../config/knexfile.js"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
const worksCtrl = {
    addWork: async (ctx) => {
        console.log(ctx.request.headers.authorization)
        console.log(ctx.request.body)

        // multer , @koa/multer를 이용해서~! 파일/work 데이터를 업로드!
        // await knex('works').insert(ctx.request.body)
    },
    viewWork: async (ctx) => {
    },
    editWork: async (ctx) => {    
    },
    removeWork: async (ctx) => {    
    }
}

// } ,

export default worksCtrl