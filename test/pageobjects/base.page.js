class BasePage {
    async open(path) {
        await browser.url(path);
    }

    async getURL() {
        return await browser.getUrl();
    }

    async scrollIntoView(locator) {
        const displayed = await locator.isDisplayedInViewport();
        if (!displayed) {
            await locator.scrollIntoView({ block: 'center', inline: 'center' });
        }
    }
  }
  
  module.exports = BasePage;  
  