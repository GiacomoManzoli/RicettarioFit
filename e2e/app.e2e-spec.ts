import { RicettarioFitClientPage } from './app.po';

describe('ricettario-fit-client App', function() {
  let page: RicettarioFitClientPage;

  beforeEach(() => {
    page = new RicettarioFitClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
