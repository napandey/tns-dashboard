import { TnsDashboardPage } from './app.po';

describe('tns-dashboard App', () => {
  let page: TnsDashboardPage;

  beforeEach(() => {
    page = new TnsDashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
