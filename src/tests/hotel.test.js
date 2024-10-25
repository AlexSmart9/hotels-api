require('../models')
const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/hotels'

let hotelId
let token
let userId
let cityId

beforeAll(async () => {
    const user = {
        firstName: "Indira",
        lastName: "Pagannoto",
        email: "indira@gmail.com",
        password: "12345",
        gender: "femele"
      }

    const resUser = await request(app)
        .post('/api/v1/users')
        .send(user)

    userId = resUser.body.id

    const login = {
        email: "indira@gmail.com",
        password: "12345"
    }

    const resLogin = await request(app)
        .post('/api/v1/users/login')
        .send(login)

    token = resLogin.body.token

    const city = {
        name: 'zacatecas',
        country:'Mexico',
        countryId:'Mx'
    }

    const resCity = await request(app)
        .post('/api/v1/cities')
        .send(city)
        .set('Authorization', `Bearer ${token}`)

    cityId = resCity.body.id
})

afterAll(async() => {  
    await request(app)
        .delete(`/api/v1/cities/${cityId}`)
        .set('Authorization', `Bearer ${token}`)
        
    await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
})

const hotel = {
    name: 'FakeHotel',
    description:'it is fake',
    price:200.99,
    address:'fake avenue #e ',
    lat:32.09738645325,
    lon:32.354235325,
    rating:5,
    cityId:cityId
}

//Test of Post
test("POST -> 'BASE_URL', should return statusCode 201 and res.body has to be defined", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(hotel)
        .set('Authorization', `Bearer ${token}`)

    hotelId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(hotelId)
})

///Test of Get 
test("GET -> 'BASE_URL', should return statusCode 200, res.body has to be defined and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)  
})

//Test of Get One
test("GET -> 'BASE_URL/:id', shold rreturn statusCode 200, res.body has to be defined and res.body.id === hotelId", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${hotelId}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(hotelId)
})

//Test of Update
test("PUT 'BASE_URL/:id', should return status code 200, and res.body.name === realHotel", async () => {
  
    const res = await request(app)
        .put(`${BASE_URL}/${hotelId}`)
        .send({name: "realHotel"})
        .set('Authorization', `Bearer ${token}`)
        
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("realHotel")
})

//Test of Delete 
test("DELETE 'BASE_URL/:id', should return statusCode 204 ", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${hotelId}`)
        .set('Authorization', `Bearer ${token}`)
        
    expect(res.status).toBe(204)
})