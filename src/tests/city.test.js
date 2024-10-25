require('../models')
const app = require('../app')
const request = require('supertest')

const BASE_URL = '/api/v1/cities'

let cityId
let token 
let userId

const city = {
    name: 'Zacatecas',
    country: 'Mexico',
    countryId: 'MX'
}

beforeAll(async() => {
    const user = {
        firstName: "Indira",
        lastName: "Pagannoto",
        email: "indira@gmail.com",
        password: "12345",
        gender: "femele"
      }

    const res = await request(app)
        .post('/api/v1/users')
        .send(user)
    
    userId = res.body.id

    const login = {
        email: "indira@gmail.com",
        password: "12345"
    }

    const resLogin = await request(app)
        .post('/api/v1/users/login')
        .send(login)

    token = resLogin.body.token
})

afterAll(async() => {
    await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
})

//Test of Post 
test("POST -> ;BASE_URL', should return statusCode 201, res.body has to be defined and res.body.name === city.name ", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(city)
        .set('Authorization', `Bearer ${token}`)
    
    cityId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(city.name)
})

//Test of Get
test("GET -> 'BASE_URL', should return statusCode 200, res.body has to be defined and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Test of Get One
test("GET -> 'BASE_URL/:id', shold rreturn statusCode 200, res.body has to be defined and res.body.id === cityId", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${cityId}`)
        .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(cityId)
})

//Test of Update
test("PUT 'BASE_URL/:id', should return status code 200, and res.body.name === Puebla", async () => {
  
    const res = await request(app)
        .put(`${BASE_URL}/${cityId}`)
        .send({name: "Puebla"})
        .set('Authorization', `Bearer ${token}`)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Puebla")
})

//Test of Delete 
test("DELETE 'BASE_URL/:id', should return statusCode 204 ", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${cityId}`)
        .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(204)
})