<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prebid.js Example</title>
  <script src="./prebid/Prebid.js"></script> <!-- Update the path if needed -->
</head>
<body>
  <div id="banner-div"></div>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      // Ensure Prebid.js is loaded correctly
      if (typeof pbjs === 'undefined') {
        console.error('Prebid.js failed to load.');
        return;
      }

      // Define Ad Units
      var adUnits = [
        {
          code: 'banner-div',
          mediaTypes: {
            banner: {
              sizes: [[300, 250], [728, 90]], // Mobile and Desktop sizes
            },
          },
          bids: [
            { bidder: 'appnexus', params: { placementId: 12345678 } },
            { bidder: 'rubicon', params: { accountId: '14062', siteId: '70608', zoneId: '335918' } },
          ],
        },
      ];

      // Initialize Prebid.js
      var pbjs = pbjs || {};
      pbjs.que = pbjs.que || [];

      // Dynamic Floor Pricing Function
      function getDynamicFloor(adSize, deviceType) {
        if (deviceType === 'mobile') {
          return adSize[0] === 300 ? 0.5 : 1.0;
        }
        return adSize[0] === 728 ? 2.0 : 1.5;
      }

      // Apply Dynamic Floor Pricing to Bids
      adUnits.forEach((unit) => {
        unit.bids.forEach((bid) => {
          unit.mediaTypes.banner.sizes.forEach((size) => {
            bid.params.floorPrice = getDynamicFloor(size, 'desktop');
          });
        });
      });

      // Configure Prebid.js
      pbjs.que.push(function () {
        pbjs.addAdUnits(adUnits);
        pbjs.requestBids({
          bidsBackHandler: function () {
            if (!pbjs.getHighestCpmBids().length) {
              document.getElementById('banner-div').innerHTML = '<img src="fallback.jpg" alt="Fallback Ad">';
            }
            pbjs.setTargetingForGPTAsync();
          },
        });
      });

      // Analytics Tracking
      pbjs.onEvent('bidWon', function (bid) {
        console.log('Winning Bid:', bid);
        window.ga && window.ga('send', 'event', 'Prebid.js', 'Bid Won', { bidPrice: bid.cpm });
      });

      // Error Handling
      pbjs.onEvent('bidTimeout', function (bidders) {
        console.error('Bidders Timeout:', bidders);
      });

      pbjs.onEvent('bidResponse', function (bid) {
        if (!bid.cpm || bid.cpm <= 0) {
          console.warn('Invalid Bid:', bid);
        }
      });

      // Lazy Loading with IntersectionObserver
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            pbjs.que.push(function () {
              pbjs.requestBids({ adUnitCodes: ['banner-div'] });
            });
            observer.unobserve(entry.target); // Unobserve after triggering
          }
        });
      });

      observer.observe(document.getElementById('banner-div'));

      // Confirm Prebid.js is loaded and ready
      pbjs.que.push(() => {
        console.log('Prebid.js is loaded and ready.');
      });
    });
  </script>
</body>
</html>
