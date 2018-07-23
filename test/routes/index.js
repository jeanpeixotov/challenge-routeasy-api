describe('Route: Index', () => {
  describe('GET /', () => {
    it('Should return Api Status', async () => {
      const response = await request.get('/');
      const expected = { status: 'Alive'};
      expect(response.body).to.eql(expected);
    });
  });
});
