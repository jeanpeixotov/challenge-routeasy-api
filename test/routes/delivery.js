const Delivery = require('../../src/models/delivery')();
const delivery = require('../mocked-data');
describe('Route: Delivery', () => {
  describe('POST /deliveries', () => {
    before(async () => {
      await Delivery.remove({});
    });

    it('should create a new delivery', async (done) => {
      await request.post('/deliveries')
        .send({
          //fields
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('Object')
            .that.has.keys(['success', 'deliveryId']);
          expect(res.body.success).to.be.a('Boolean').to.equal(true);
          expect(res.body.deliveryId).to.be.a('String');
        });
    });

    it('should create a new delivery with error', async (done) => {
      await request.post('/deliveries')
        .send({
          //fields
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('Object')
            .that.has.keys(['error']);
          expect(res.body.error).to.be.a('String');
        });
    });
  });

  describe('GET /deliveries/:deliveryId', () => {
    it('should list deliveries data', (done) => {
      request.get('/deliveries/:deliveryId') //ADD SOMEONE DELIVERY BEFORE
        .expect(200)
        .end((err, res) => {
          expect(res.body)
            .to.include.keys(['_id', 'lang', 'phone', 'email', 'name']);
          return done(err);
        });
    });

    it('should list deliveries data wit error', (done) => {
      request.get('/deliveries/:deliveryId') //ADD SOMEONE DELIVERY BEFORE
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('Object')
            .that.has.keys(['error']);
          expect(res.body.error).to.be.a('String');
        });
    });
  });

  describe('PUT /deliveries', () => {
    it('should update a delivery', async (done) => {
      await request.post('/deliveries')
        .send({
          //fields
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('Object')
            .that.has.keys(['success', 'deliveryId']);
          expect(res.body.success).to.be.a('Boolean').to.equal(true);
          expect(res.body.deliveryId).to.be.a('String');
        });
    });

    it('should update a delivery with error', async (done) => {
      await request.post('/deliveries')
        .send({
          //fields
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('Object')
            .that.has.keys(['error']);
          expect(res.body.error).to.be.a('String');
        });
    });
  });

  describe('GET /deliveries/:deliveryId', () => {
    it('should bring valid basic delivery data', (done) => {
      request.get('/deliveries/:deliveryId') //ADD SOMEONE DELIVERY BEFORE
        .expect(200)
        .end((err, res) => {
          expect(res.body)
            .to.include.keys(['_id', 'lang', 'phone', 'email', 'name']);
          return done(err);
        });
    });
  });
});
