require('../models')
const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/images'


let token
let imageId
let exampleUserId
let exampleCityId
let exampleHotelId

beforeAll(async () => {
    const user = {
        firstName: "Indira",
        lastName: "Pagannoto",
        email: "indiraP@gmail.com",
        password: "12345",
        gender: "femele"
      }
    
    const resUser = await request(app)
      .post('/api/v1/users')
      .send(user)

    exampleUserId = resUser.body.id 

    const login = {
        email: "indiraP@gmail.com",
        password: "12345"
    }

    const resLogin = await request(app)
        .post('/api/v1/users/login')
        .send(login)

    const city = {
        name: 'Guadalajara',
        country: 'Mexico',
        countryId: 'Mx',
    }

    token = resLogin.body.token

    const resCity = await request(app)
        .post('/api/v1/cities')
        .send(city)
        .set('Authorization', `Bearer ${token}`)

    exampleCityId = resCity.body.id 

    const hotel = {
        name: 'Almost fake Hotel',
        description:'it is fake sometimes',
        price:200.99,
        address:'fake avenue #e ',
        lat:32.09738645325,
        lon:32.354235325,
        rating:5,
        cityId:exampleCityId
    }

    const resHotel = await request(app)
        .post('/api/v1/hotels')
        .send(hotel)
        .set('Authorization', `Bearer ${token}`)

    exampleHotelId = resHotel.body.id
})

afterAll(async () => {
    await request(app)
        .delete(`/api/v1/hotels/${exampleHotelId}`)
        .set('Authorization', `Bearer ${token}`)
    
    await request(app)
        .delete(`/api/v1/cities/${exampleCityId}`)
        .set('Authorization', `Bearer ${token}`)

    await request(app)
        .delete(`/api/v1/users/${exampleUserId}`)
        .set('Authorization', `Bearer ${token}`)

        
})

const image = {
    url: 'https://media.admagazine.com/photos/65b16818a35d203a72ec2f1c/16:9/w_1600,c_limit/HKTVT_8438978059%20(1).jpg',
    hotelId: exampleHotelId
}

//Test of Post 
test("POST -> 'BAsE_URL', should return statusCode 201 and res.body has to be defined", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(image)
        .set('Authorization', `Bearer ${token}`)

    console.log(res.body)

    imageId = res.body.id 
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(imageId)
})

//Test of Get 
test("GET -> 'BASE_URL', should return statusCode 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Test of GetOne
test("GET -> 'BASE_URL/:id' should return statusCode 200 and res.body has to be defined", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${imageId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(1)
})

//Test of Update
test("UPDATE 'BASE_URL/:id should return statusCode 200 an res.body has to be defined ", async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${imageId}`)
        .send({url:'https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2020/10/65345792-h1-facb_angular_pool_view_300dpi.jpg?resize=1536%2C1024&ssl=1'})
        .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
})

//Test of Delete 
test("DELETE 'BASE_URL/:id', should return statusCode 204 ", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${imageId}`)
        .set('Authorization', `Bearer ${token}`)
    
    expect(res.status).toBe(204)
})