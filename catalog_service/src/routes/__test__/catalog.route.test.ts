import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import catalogRoute, { catalogService } from '../catalog.route';
import { ProductFactory } from '../../utils/mock';

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
      const product = ProductFactory.build();
      jest.spyOn(catalogService, "createProduct").mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
      .post('/products')
      .send(requestData)
      .set('accept', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });

    test('should response with validation error 400', async () => {
      const requestData = mockRequest();
      const response = await request(app)
      .post('/products')
      .send({...requestData, name: ""})
      .set('accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    test('should response with an internal error with 500 code', async () => {
      const requestData = mockRequest();
      const product = ProductFactory.build();
      jest.spyOn(catalogService, "createProduct").mockImplementationOnce(() => Promise.reject(new Error("unable to create product")));
      const response = await request(app)
      .post('/products')
      .send(requestData)
      .set('accept', 'application/json');
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  })

});

