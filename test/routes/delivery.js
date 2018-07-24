const Delivery = app.models.delivery;
const validate = require('../../src/utils/validator');
const {deliveryInsert, deliveryInserted, deliveryUpdate} = require('../mocked-data');
describe('Route: Delivery', () => {
  describe('POST /deliveries', () => {
    before(async () => {
      await Delivery.remove({});
    });

    it('should create a new delivery', async () => {
      const res = await request.post('/deliveries').send(deliveryInsert);
      expect(res.statusCode).to.eql(200);
      expect(res.body).to.be.an('Object')
      expect(res.body).that.has.keys(['success', 'deliveryId', 'message']);
      expect(res.body.success).to.be.a('Boolean').to.equal(true);
      expect(res.body.deliveryId).to.be.a('String');
      expect(res.body.message).to.be.a('String').to.equal('Delivery added');
    });

    it('should create a new delivery with error', async () => {
      const res = await request.post('/deliveries').send({});
      expect(res.statusCode).to.eql(500);
      expect(res.body.error).to.be.an('Object')
      expect(res.body.error).that.has.keys(['title', 'name', 'message']);
      expect(res.body.error.title).to.be.a('String').to.equal('Internal Server Error');
      expect(res.body.error.name).to.be.a('String').to.equal('ValidationError');
      expect(res.body.error.message).to.be.a('String').to.equal('child "name" fails because ["name" is required]');
    });
  });
  describe('GET /deliveries/:deliveryId', () => {
    before(async () => {
      await Delivery.remove({});
      await Delivery.insertMany(deliveryInserted);
    });
    it('should list deliveries data ', async () => {
      const res = await request.get('/deliveries/5b57853c51e9410020bba941');
      await validate(res.body);
      expect(res.statusCode).to.eql(200);
    });

    it('should list deliveries data with wrong delivery id ', async () => {
      const res = await request.get('/deliveries/1b57853c51e9410020bba941');
      expect(res.statusCode).to.eql(404);
      expect(res.body.error).to.be.an('Object')
      expect(res.body.error).that.has.keys(['title', 'name', 'message']);
      expect(res.body.error.title).to.be.a('String').to.equal('Not Found');
      expect(res.body.error.name).to.be.a('String').to.equal('NotFoundError');
      expect(res.body.error.message).to.be.a('String').to.equal('DELIVERY ID NOT FOUND');
    });
  });
  describe('PUT /deliveries', () => {
    before(async () => {
      await Delivery.remove({});
      await Delivery.insertMany(deliveryInserted);
    });

    it('should update a delivery', async () => {
      const res = await request.put('/deliveries').send(deliveryUpdate);
      expect(res.statusCode).to.eql(200);
      expect(res.body).to.be.an('Object')
      expect(res.body).that.has.keys(['success', 'deliveryId', 'message']);
      expect(res.body.success).to.be.a('Boolean').to.equal(true);
      expect(res.body.deliveryId).to.be.a('String');
      expect(res.body.message).to.be.a('String').to.equal('Delivery updated');
    });

    it('should update a delivery without body', async () => {
      const res = await request.put('/deliveries').send({});
      expect(res.statusCode).to.eql(404);
      expect(res.body.error).to.be.an('Object')
      expect(res.body.error).that.has.keys(['title', 'name', 'message']);
      expect(res.body.error.title).to.be.a('String').to.equal('Not Found');
      expect(res.body.error.name).to.be.a('String').to.equal('NotFoundError');
      expect(res.body.error.message).to.be.a('String').to.equal('DELIVERY ID NOT FOUND');
    });
  });

  describe('DELETE /deliveries/:deliveryId', () => {
    before(async () => {
      await Delivery.remove({});
      await Delivery.insertMany(deliveryInserted);
    });

    it('should delete a delivery', async () => {
      const res = await request.delete('/deliveries/5b57853c51e9410020bba941');
      expect(res.statusCode).to.eql(200);
      expect(res.body).to.be.an('Object')
      expect(res.body).that.has.keys(['success', 'deliveryId', 'message']);
      expect(res.body.success).to.be.a('Boolean').to.equal(true);
      expect(res.body.deliveryId).to.be.a('String');
      expect(res.body.message).to.be.a('String').to.equal('Delivery deleted');
    });

    it('should delete a delivery without id', async () => {
      const res = await request.delete('/deliveries/1b57853c51e9410020bba941');
      expect(res.statusCode).to.eql(404);
      expect(res.body.error).to.be.an('Object')
      expect(res.body.error).that.has.keys(['title', 'name', 'message']);
      expect(res.body.error.title).to.be.a('String').to.equal('Not Found');
      expect(res.body.error.name).to.be.a('String').to.equal('NotFoundError');
      expect(res.body.error.message).to.be.a('String').to.equal('DELIVERY ID NOT FOUND');
    });
  });
});