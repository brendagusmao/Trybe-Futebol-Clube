import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Teste arquivo /teams', () => {
  let chaiHttpResponse: Response;

  it('Retornar all teams com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams').send();
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
  });

  it('Retornar teams by id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1').send();
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });
});