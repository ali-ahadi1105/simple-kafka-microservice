import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import catalogRoute from '../catalog.route';

const app = express();
app.use(express.json());
app.use('/', catalogRoute);

const mockRequest = () => {
  return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      stock: faker.number.int({ min: 1, max: 100 }),
      price: +faker.commerce.price()
  }
}

describe('Catalog Routes', () => {
  describe('POST /products', () => {
    test('should create product successfully', async () => {
      const requestData = mockRequest();
      const response = await request(app)
      .post('/products')
      .send(requestData)
      .set('accept', 'application/json');
      expect(response.status).toBe(201);
    });
  })

});

