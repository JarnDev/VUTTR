const request = require('supertest')
const app = require('../config/custom-express')
const {end} = require('../../__mocks__/redis')
var token;
var userId;
var toolId;
var img = "data:image/png;base64,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"


describe('user-controller', ()=>{

    it('should receive 400 if req is empty', async (done)=>{
        const res = await request(app)
        .post('/user/logar')
        .send({})
        expect(res.statusCode).toBe(400)
        done()
    })

    it('should receive status 401 with wrong credentials', async (done)=>{
        const res = await request(app)
        .post('/user/logar')
        .send({
            login:"jarn4012",
            password:"1234"
        })
        expect(res.statusCode).toBe(401)
        done()
    })


    it('should receive 201', async (done)=>{
        const res = await request(app)
        .post('/user/cadastrar')
        .send(
            {
            firstName: "jarn401",
            lastName: "Neto",
            login :"jarn4012",
            password: "123",
            avatar: img
        })
        userId = res.body._id
        expect(res.status).toBe(201)
        done()
    })

    it('should receive status 202 and token', async (done)=>{
        const res = await request(app)
        .post('/user/logar')
        .send({
            login:"jarn4012",
            password:"123"
        })
        token = res.body.token
        expect(res.statusCode).toBe(202)
        expect(res.body).toHaveProperty('token')
        done()
    })

    it('should receive 403 user already exist', async (done)=>{
        const res = await request(app)
        .post('/user/cadastrar')
        .send(
            {
            firstName: "jarn401",
            lastName: "Neto",
            login :"jarn4012",
            password: "123",
            avatar: "https://avatars1.githubusercontent.com/u/20113585?s=460&v=4"
        })
        expect(res.status).toBe(403)
        expect(res.text).toBe('Usuário jarn4012 já existe.')
        done()
    })

    it('should receive a user with id from param', async (done)=>{
        const res = await request(app)
        .get(`/user/${userId}`)
        .set({ Authorization: token })
        expect(res.status).toBe(200)
        done()
    })
    
    it('should delete a user with id from param', async (done)=>{
        const res = await request(app)
        .delete(`/user/${userId}`)
        .set({ Authorization: token })
        expect(res.status).toBe(200)
        done()
    })

    it('should receive 201', async (done)=>{
        const res = await request(app)
        .post('/user/cadastrar')
        .send(
            {
            firstName: "jarn401",
            lastName: "Neto",
            login :"jarn4012",
            password: "123",
            avatar: "https://avatars1.githubusercontent.com/u/20113585?s=460&v=4"
        })
        userId = res.body._id
        expect(res.status).toBe(201)
        done()
    })
 

    it('should delete a user with id from param', async (done)=>{
        const res = await request(app)
        .delete(`/user/${userId}`)
        .set({ Authorization: token })
        expect(res.status).toBe(200)
        done()
    })

})

describe('tools-controller', ()=>{
    it('should receive all tools', async (done)=>{
        const res = await request(app)
        .get('/tools/')
        .set({ Authorization: token })
        expect(res.status).toBe(200)
        done()
    })

    it('should receive all tools', async (done)=>{
        const res = await request(app)
        .get("/tools/?global=")
        .set({ Authorization: token })
        expect(res.status).toBe(200)
        done()
    })

    it('should receive tool with node in global', async (done)=>{
        const res = await request(app)
        .get("/tools/?global=node")
        .set({ Authorization: token })
        expect(res.status).toBe(200)
        done()
    })

    it('should receive tool with node in tag', async (done)=>{
        const res = await request(app)
        .get("/tools/?tag='node'")
        .set({ Authorization: token })
        expect(res.status).toBe(200)
        done()
    })

    it('should receive status 201 if tools created ', async (done)=>{
        const res = await request(app)
        .post('/tools/')
        .send({
            title: "Figura",
            link: "https://github.com/typicode/hotel",
            description: "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            tags: [
                "node",
                "organizing",
                "webapps",
                "domain",
                "developer",
                "https",
                "proxy"
            ]
        })
        .set({ 'content-Type': 'application/json', Authorization: token  })
        toolId = res.body._id
        expect(res.status).toBe(201)
        done()
    })

    it('should receive status 200 if tools exist ', async (done)=>{
        const res = await request(app)
        .post('/tools/')
        .send({
            title: "Figura",
            link: "https://github.com/typicode/hotel",
            description: "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            tags: [
                "node",
                "organizing",
                "webapps",
                "domain",
                "developer",
                "https",
                "proxy"
            ]
        })
        .set({ 'content-Type': 'application/json', Authorization: token  })
        expect(res.status).toBe(200)
        done()
    })

    it('should receive status 204', async (done)=>{
        console.log(toolId)
        const res = await request(app)
        .delete(`/tools/${toolId}`)
        .set({Authorization: token})
        expect(res.status).toBe(204)
        done()
    })

})