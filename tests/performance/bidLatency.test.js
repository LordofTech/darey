describe('Bid Latency Tests', () => {
  it('should measure bid response time', (done) => {
    const startTime = performance.now();
    
    pbjs.requestBids({
      adUnits: [{ code: 'ad1', sizes: [[300, 250]] }],
      bidsBackHandler: function () {
        const endTime = performance.now();
        const latency = endTime - startTime;
        console.log(`Bid Latency: ${latency} ms`);
        expect(latency).toBeLessThan(1000); // Assert latency < 1 second
        done();
      }
    });
  });
});
