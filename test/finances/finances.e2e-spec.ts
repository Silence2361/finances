import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Finance } from '../../src/database/finances/finances.model';
import { Category } from '../../src/database/categories/categories.model';
import { User } from '../../src/database/users/users.model';

describe('FinancesController (e2e) - Finances', () => {
  let app: INestApplication;
  let accessToken: string;
  let financeId: number;
  let categoryId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await Finance.query().delete();
    await Category.query().delete();
    await User.query().delete();

    const uniqueEmail = `admin_${Date.now()}@example.com`;

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: uniqueEmail,
        password: 'adminpassword',
      })
      .expect(HttpStatus.CREATED);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: uniqueEmail,
        password: 'adminpassword',
      })
      .expect(HttpStatus.OK);

    accessToken = loginResponse.body.access_token;

    if (!accessToken) {
      throw new Error('Failed to obtain access token');
    }

    const createCategoryResponse = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Test Category',
      })
      .expect(HttpStatus.CREATED);

    categoryId = createCategoryResponse.body.id;

    const createFinanceResponse = await request(app.getHttpServer())
      .post('/finances')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: categoryId,
        amount: 1000,
        type: 'income',
        description: 'Test Finance',
        date: new Date().toISOString(),
      })
      .expect(HttpStatus.CREATED);

    financeId = createFinanceResponse.body.id;

    const financeRecord = await Finance.query().findById(financeId);

    if (!financeRecord) {
      throw new Error(
        `Finance record with ID ${financeId} was not found in the database.`,
      );
    }
  });

  afterAll(async () => {
    await Finance.query().delete();
    await app.close();
  });

  it('/finances (POST) - should create a new finance record', async () => {
    const response = await request(app.getHttpServer())
      .post('/finances')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: categoryId,
        amount: 500,
        type: 'expense',
        description: 'Another Finance',
        date: new Date().toISOString(),
      })
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
  });

  it('/finances (GET) - should return all finance records', async () => {
    const response = await request(app.getHttpServer())
      .get('/finances')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body.finances)).toBe(true);
    expect(response.body.finances.length).toBeGreaterThan(0);
  });

  it('/finances/:id (PUT) - should update a finance record by ID', async () => {
    const response = await request(app.getHttpServer())
      .put(`/finances/${financeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        amount: 1200,
        type: 'expense',
        description: 'Updated Finance',
        date: new Date().toISOString(),
      })
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('amount', '1200.00');
  });

  it('/finances/:id (DELETE) - should delete a finance record by ID', async () => {
    await request(app.getHttpServer())
      .delete(`/finances/${financeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
