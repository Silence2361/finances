import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { User } from '../../src/users/users.model';

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

    accessToken = loginResponse.body.access_token;

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
    expect(response.body).toHaveProperty('email', uniqueEmail);
  });

  it('/users (GET) - should return all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/users/:id (GET) - should return a user by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id', userId);
  });

  it('/users/:id (PUT) - should update a user by ID', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email: 'updateduser@example.com',
        password: 'newpassword',
      })
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('email', 'updateduser@example.com');
  });

  it('/users/:id (DELETE) - should delete a user by ID', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
