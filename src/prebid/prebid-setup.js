// Function to detect device type based on screen width
function getDeviceType() {
    if (window.innerWidth <= 768) {
      return 'mobile';  // Consider device mobile if the width is <= 768px
    }
    return 'desktop';  // Default to desktop if width is greater than 768px
  }
  
  // Update dynamic floor pricing based on device type
  function getDynamicFloor(adSize) {
    const deviceType = getDeviceType();  // Call the device detection function
    
    if (deviceType === 'mobile') {
      return adSize[0] === 300 ? 0.5 : 1.0;
    }
    return adSize[0] === 728 ? 2.0 : 1.5;
  }
  
  // Apply Dynamic Floor Pricing to Bids
  adUnits.forEach((unit) => {
    unit.bids.forEach((bid) => {
      unit.mediaTypes.banner.sizes.forEach((size) => {
        bid.params.floorPrice = getDynamicFloor(size);
      });
    });
  });
  