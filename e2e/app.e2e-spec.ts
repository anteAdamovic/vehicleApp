import { VehicleAppPage } from './app.po';

describe('vehicle-app App', function() {
  let page: VehicleAppPage;

  beforeEach(() => {
    page = new VehicleAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
