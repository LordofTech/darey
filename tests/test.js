console.log('Running Ad Unit Tests...');

// Test Ad Unit Configuration
adUnits.forEach((unit) => {
  if (!unit.code || !unit.mediaTypes || !unit.bids) {
    console.error('Ad Unit Configuration Error:', unit);
  }
});

// Test Bids
pbjs.onEvent('bidResponse', function (bid) {
  if (!bid.cpm || bid.cpm <= 0) {
    console.warn('Invalid Bid Detected:', bid);
  } else {
    console.log('Valid Bid:', bid);
  }
});

console.log('Tests Completed');
