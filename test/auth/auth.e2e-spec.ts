import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { User } from '../../src/database/users/users.model';
import { Finance } from '../../src/database/finances/finances.model';
import { Category } from '../../src/database/categories/categories.model';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await Finance.query().delete();
    await Category.query().delete();
    await User.query().delete();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      })
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      })
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('access_token');
  });

  it('/auth/login (POST) - fail with wrong password', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      })
      .expect(401);
  });
});
