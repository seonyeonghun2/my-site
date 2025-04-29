import knex from "../config/knexfile.js"
const contactCtrl = {
    readContact: async (ctx) => {
        const {contactId} = ctx.params
        try {
            const contact = await knex('contacts').where({id: contactId})
            ctx.status = 200
                ctx.body = {
                    msg: '데이터 조회 성공!',
                    data: contact
                }
        } catch(err) {
            ctx.status = 500
            ctx.body = {
                msg: "contact 데이터를 조회할 수없습니다."
            }
        }
    },
    readContacts: async (ctx) => {
        try {
            // const contacts = await knex('contacts').innerJoin('users', 'contacts.wr_id','users.id').orderBy("wr_date", "desc")
            const contacts = await knex('contacts').orderBy("wr_date", "desc")
            ctx.status = 200
            ctx.body = {
                msg: '데이터를 조회 성공!',
                data: contacts
            }
        } catch (err) {
            ctx.status = 500
            ctx.body = {
                msg: '데이터를 조회할수 없습니다.'
            }
        }
    },
    removeContact: async (ctx) => {
        const { contactId } = ctx.params
        console.log(contactId, typeof contactId)
        try {
            await knex('contacts').where("id", contactId).delete();
            ctx.status = 200
            ctx.body = {
                msg: "Contact 삭제",
                data: true
            }
        } catch (err) {
            console.error(err)
            ctx.status = 500
            ctx.body = {
                msg: "Contact 삭제 실패"
            }
        }
    },
    updateContacts: async (ctx) => {
        // await knex('contacts').limit().orderBy("created_at", "desc")
        
    },
    createContacts: async (ctx) => {
        const {id, name} = ctx.state.user
        const {title, content, categories} = ctx.request.body
        console.log(id, name, title, content, categories)
        try {
            await knex('contacts').insert({
               wr_id : id,
               title: title,
               content: content,
               categories: categories
            }).then(() => {
              ctx.status = 200
              ctx.body = {
                msg: '문의 등록 성공!'
              }  
            })
        } catch (err) {
            console.error(err)
            ctx.status = 500
            ctx.body = {
                msg : '문의 등록 실패!'
            }
        }
    }
}

export default contactCtrl