import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { User } from '../../src/database/users/users.model';

describe('UserController (e2e) - Create User', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await User.query().delete();

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

    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email: `testuser_${Date.now()}@example.com`,
        password: 'testpassword',
      })
      .expect(HttpStatus.CREATED);

    userId = createUserResponse.body.id;
  });

  afterAll(async () => {
    await User.query().delete();
    await app.close();
  });

  it('/users (POST) - should create a new user', async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email: uniqueEmail,
        password: 'testpassword',
      })
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
  });

  it('/users (GET) - should return  users with pagination', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .query({ page: 1, pageSize: 10 })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body.docs).toBeDefined();
    expect(Array.isArray(response.body.docs)).toBe(true);
    expect(response.body.docs.length).toBeGreaterThan(0);
    expect(response.body.count).toBeDefined();
  });

  it('/users/:id (GET) - should return a user by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id', userId);
  });

  it('/users/:id (PUT) - should update a user by ID', async () => {
    await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email: 'updateduser@example.com',
        password: 'newpassword',
      })
      .expect(HttpStatus.OK);
  });

  it('/users/:id (DELETE) - should delete a user by ID', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
