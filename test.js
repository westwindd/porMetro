import * as chai from 'chai';
import chaiHttp from 'chai-http';
import server from './server.js'; // Adjust the path

chai.use(chaiHttp);
const expect = chai.expect;

describe('Texture Items API', () => {
  it('should GET all the texture items', (done) => {
    chai.request(server)
      .get('/texture-items')
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('array');
        done();
      });
  });
});
