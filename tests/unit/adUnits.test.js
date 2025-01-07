describe('Ad Units Configuration', () => {
  it('should define the ad units with the correct size', () => {
    const adUnits = getAdUnits(); // Assume this is a function in your code
    expect(adUnits).toHaveLength(2);
    expect(adUnits[0].size).toEqual([300, 250]);
    expect(adUnits[1].size).toEqual([728, 90]);
  });

  it('should adapt to mobile and desktop sizes', () => {
    const device = 'mobile'; // You can mock this based on your test scenario
    const adUnits = getAdUnits(device);
    expect(adUnits[0].size).toEqual([300, 250]);
  });
});
