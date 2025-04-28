import 'dotenv/config'
import knex from "../config/knexfile.js"
import jwt from 'jsonwebtoken'
import {fileURLToPath} from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import fs from 'fs/promises'
import multer from '@koa/multer'
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    console.log(file)
    const projectFolder = path.join(__dirname, "../../public");
    await fs.mkdir(projectFolder, { recursive: true });
    cb(null, projectFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage, limits: 5 * 1024 * 1024});

const worksCtrl = {
    addWork: async (ctx) => {
        // multer , @koa/multer를 이용해서~! 파일/work 데이터를 업로드!
        try {
            await upload.array('files', 3)(ctx, async () => {
                const {title, description, is_active} = ctx.request.body                
                const files = ctx.request.files                
                //1. works 테이블에 데이터 삽입
                let workId;
                workId = await knex('works').insert({title, description, is_active})

                if(!files) {
                    ctx.status = 401
                    ctx.body = {
                        msg: '첨부 파일을 등록하고 다시 시도하세요'
                    }
                    return;
                }

                if(files && files.length > 0) {
                    // file_id, created_at 컬럼 : auto_increment, now()
                    const fileArr = files.map((file) => ({
                        work_id: workId,
                        file_name: file.filename,
                        file_path: file.path,
                        file_type: file.mimetype,
                        file_size: file.size
                    }))
                    await knex('files').insert(fileArr)
                }
                ctx.status = 200
                ctx.body = {
                    msg: "등록 성공"
                }
                //2. files 테이블에 데이터 삽입
            })
        } catch (err) {
            console.error(err)
        }
        // await knex('works').insert(ctx.request.body)
    },
    readWorks: async (ctx) => {        
        const lists = await knex.from('works').innerJoin('files', 'works.work_id', 'files.work_id').limit(3).orderBy("created_at", "desc");
        console.log(lists)
        ctx.status = 200
        ctx.body = {
            msg: 'work list를 리턴합니다.',
            data: lists
        }
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