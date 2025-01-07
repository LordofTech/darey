// Validation to check if the bid meets required OpenRTB parameters
pbjs.onEvent('bidResponse', function (bid) {
    if (!bid.cpm || bid.cpm <= 0) {
      console.warn('Invalid Bid Detected (CPM <= 0):', bid);
    } else if (!bid.advertiserDomain || bid.advertiserDomain === '') {
      console.warn('Missing advertiserDomain:', bid);
    } else if (!bid.creative || !bid.creative.width || !bid.creative.height) {
      console.warn('Missing or Invalid Creative:', bid);
    } else {
      console.log('Valid Bid:', bid);
    }
  });
  