import supertest from "supertest"
import app  from'../src/index.mjs'
import jwt from "jsonwebtoken"
import {server}  from'../src/index.mjs'

const api = supertest(app)

test('login', async ()=>{

  await api
    .post('/login')
    .send({
      "username":"disney",
      "password":"1234"
    })
    .expect(200)
})

test('transfer NOT logged user', async ()=>{

  await api
    .post('/transfer')
    .send({
      "buyerStudioId":"1",
      "movieId":"22"
    })
    .expect(401)
})

test('transfer logged user', async ()=>{
  const secret = "mySecretPassword";
  const token = jwt.sign({
    "username":"disney",
    "password":"1234"
  }, secret ,{
    expiresIn: 60 * 60 * 24
  })

  await api
    .post('/transfer')
    .set('x-access-token', token)
    .send({
      "buyerStudioId":"1",
      "movieId":"22"
    })
    .expect(200)
})

afterAll(()=>{
  server.close()
})