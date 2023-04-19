const BasePage = require('./base.page');

class PasteBinPage extends BasePage {
    constructor () {
        super();
        this.path = '/';
        this.expiration = {
            'Never': '-N',
            'Burn after read': '-B',
            '10 Minutes': '-10M',
            '1 Hour': '-1H',
            '1 Day': '-1D'
        }
        this.syntax = {
            'None': '-1',
            'Bash': '-8',
            'C': '-9'
        }
    }
    
    get pasteText () {return $('textarea[id="postform-text"]')}
    get synaxHighlighting () {return $('span[id="select2-postform-format-container"]')}
    get pasteExpiration () {return $('span[id="select2-postform-expiration-container"]')}
    get pasteTitle () {return $('input[id="postform-name"]')}
    get newPasteBtn () {return $('button[class^="btn"]')}
    get savedTitle () {return $('div[class="info-top"]>h1')}
    get savedHighlighting () {return $('div[class="top-buttons"]>div[class="left"]>a[class$="h_800"]')}
    get savedTextArea () {return $('div[class="source bash"]')}

    async open (path = this.path) {
        await super.open(path);
    }

    async pageTitle () {
        return await browser.getTitle();
    }

    async getPasteName () {
        return await this.savedTitle.getText();
    }
    
    async getHighliting () {
        return await this.savedHighlighting.getText();
    }

    async getTextArea () {
        return await this.savedTextArea.getText();
    }

    async addPasteText (textInput) {
        await this.scrollIntoView(this.pasteText);
        await this.pasteText.setValue(textInput);
    }

    async setSynaxHighlighting(value) {
        await this.scrollIntoView(this.synaxHighlighting);
        await this.synaxHighlighting.click();
        const itemId = await $(`li[id$="${this.syntax[value]}"]`);
        await itemId.click();
    }

    async setExpiration(value) {
        await this.scrollIntoView(this.pasteExpiration);
        await this.pasteExpiration.click()
        const itemId = await $(`li[id$="${this.expiration[value]}"]`);
        await itemId.click();
    }

    async addPasteTitle (titleInput) {
        await this.scrollIntoView(this.pasteTitle);
        await this.pasteTitle.setValue(titleInput);
    }

    async savePaste() {
        await this.scrollIntoView(this.newPasteBtn);
        await this.newPasteBtn.click();
    }

}

module.exports = new PasteBinPage();
