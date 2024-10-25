require('../models')
const app = require('../app')
const request = require('supertest')

const BASE_URL = '/api/v1/users'
let token
let userId

const user = {
    firstName: "Indira",
    lastName: "Pagannoto",
    email: "indira@gmail.com",
    password: "12345",
    gender: "femele"
  }

  // Test of POST 
  test("POST -> 'BASE_UR', should return status code 201 and res.body.email === user.email", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(user)
        
    userId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(userId)
  })

  // Test of Login
  test("POST 'BASE_URL/login', should return status code 200, res.body.user and res.body.token to be denifed", async () => {
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send({
            email: "indira@gmail.com",
            password: "12345"
        })

  token = res.body.token

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.user).toBeDefined()
  expect(res.body.token).toBeDefined()
 
  })

//Test wrong Login
test("POST 'BASE_URL/login', should return statusCode 401 ", async () => {
    const wrongCredentials = {
      email:'wrongemail@gmail.com',
      password:'322324'
    }
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(wrongCredentials)
  
    expect(res.status).toBe(401)
  })
  

  // Test of Get(private endpoint)
test("GET 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {
  
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

// Test of GetOne
test("GET 'BASE_URL/:id', should return status code 200, and res.body.email === user.email", async () => {
  
  const res = await request(app)
      .get(`${BASE_URL}/${userId}`)
      .set('Authorization', `Bearer ${token}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
})

// Test of Logged
test("GET -> 'BASE_URL/:me', should return statusCode 200 and res.body has to be defined", async () => {
  const res = await request(app)
      .get(`${BASE_URL}/me`)
      .set('Authorization', `Bearer ${token}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
})

 // Test of Update
 test("PUT 'BASE_URL/:id', should return status code 200, and res.body.firstName === Charlie", async () => {
  
  const res = await request(app)
      .put(`${BASE_URL}/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({firstName: "Charlie"})

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe("Charlie")
})

 // Test of Delete
 test("DELETE 'BASE_URL/:id', should return status code 204", async () => {
  
  const res = await request(app)
      .delete(`${BASE_URL}/${userId}`)
      .set('Authorization', `Bearer ${token}`)

  expect(res.status).toBe(204)
  
}) 