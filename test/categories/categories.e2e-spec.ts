import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Category } from '../../src/database/categories/categories.model';

describe('CategoryController (e2e) - Categories', () => {
  let app: INestApplication;
  let accessToken: string;
  let categoryId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await Category.query().delete();

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword',
      })
      .expect(HttpStatus.CREATED);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword',
      })
      .expect(HttpStatus.OK);

    accessToken = loginResponse.body.accessToken;

    const createCategoryResponse = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Test Category',
      })
      .expect(HttpStatus.CREATED);

    categoryId = createCategoryResponse.body.id;
  });

  afterAll(async () => {
    await Category.query().delete();
    await app.close();
  });

  it('/categories (POST) - should create a new category', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Food',
      })
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
  });

  it('/categories (GET) - should return  categories with pagination', async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .query({ page: 1, pageSize: 10 })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body.docs).toBeDefined();
    expect(Array.isArray(response.body.docs)).toBe(true);
    expect(response.body.docs.length).toBeGreaterThan(0);

    expect(response.body.count).toBeDefined();
  });

  it('/categories/:id (GET) - should return a category by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id', categoryId);
  });

  it('/categories/:id (PUT) - should update a category by ID', async () => {
    const response = await request(app.getHttpServer())
      .put(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Updated Category',
      })
      .expect(HttpStatus.OK);
  });

  it('/categories/:id (DELETE) - should delete a category by ID', async () => {
    await request(app.getHttpServer())
      .delete(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
