const PasteBinPage = require('../pageobjects/pastebin.page');

describe('PasteBin Page Tests', () => {

    it('Test "I Can Win"', async () => {
        await PasteBinPage.open();
        await PasteBinPage.addPasteText('Hello from WebDriver');
        await PasteBinPage.setExpiration('10 Minutes');
        await PasteBinPage.addPasteTitle('helloweb');
        await PasteBinPage.savePaste();
    })

    it('Test "Bring It On"', async () => {
        const pasteText = 'git config --global user.name "New Sheriff in Town"\n\n' +
        'git reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")\n\n' +
        'git push origin master --force';
        const pasteTitle = 'how to gain dominance among developers';
        const pasteHighlighting = 'Bash';
        await PasteBinPage.open();
        await PasteBinPage.addPasteText(pasteText);
        await PasteBinPage.setSynaxHighlighting(pasteHighlighting);
        await PasteBinPage.setExpiration('10 Minutes');
        await PasteBinPage.addPasteTitle(pasteTitle);
        await PasteBinPage.savePaste();

        const pageURL = await PasteBinPage.getURL();
        const pasteCode = pageURL.split('/').at(-1);
        PasteBinPage.open(`/${pasteCode}`);
        
        const pageTitle = await PasteBinPage.getPasteName();
        expect(pageTitle).toEqual(pasteTitle);
        const hilighting = await PasteBinPage.getHighliting();
        expect(hilighting).toEqual(pasteHighlighting);
        const textData = await PasteBinPage.getTextArea();
        expect(textData.replaceAll('\n  ', '\n')).toEqual(pasteText.replaceAll('\n\n', '\n'));
    })

})
