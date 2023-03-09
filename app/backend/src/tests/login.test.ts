import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Teste arquivo /login', () => {
  let chaiHttpResponse: Response;

  const login = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }

  const loginIncorrect = {
    email: "erro@admin.com",
    password: "1234567"
  }

  it('Login incorreto - retornar error 401 e message "invalid email or password"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginIncorrect);
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.eql('Invalid email or password');
  });

  it('Login sem e-mail - retornar error 400 e message "All fields must be filled"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ password: '123456' });
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.eql('All fields must be filled');
  });

  it('Login com sucesso"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(login);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

//   it('Um objeto user onde tem "id, username, role e email""', async () => {
//     chaiHttpResponse = await chai.request(app).post('/login').send(login);
    // expect(chaiHttpResponse).to.have.status(200);
    // expect(chaiHttpResponse.body).to.have.property('id');
    // expect(chaiHttpResponse.body).to.have.property('username');
    // expect(chaiHttpResponse.body).to.have.property('role');
    // expect(chaiHttpResponse.body.user).to.have.property('email');
//   });
  it('Token é uma string"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(login);
    expect(chaiHttpResponse.body.token).to.be.a('string');
  });

  it('Recupere a função do usuário com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: login.email, password: login.password });
    const validate = await chai
      .request(app)
      .get('/login/role')
      .send()
      .set('Authorization', chaiHttpResponse.body.token);
    expect(validate).to.have.status(200);
    expect(validate.body).to.have.property('role');
  });

});