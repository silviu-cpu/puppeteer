const puppeteer = require('puppeteer');


let search = async (query) => 
{

    const browser =await puppeteer.launch();
    const page = await browser.newPage();

    if (typeof query !== 'string') {
		throw new Error('options.query expected to be string')
    }
    
    
    url = "https://stackoverflow.com/search?q=" + query;
    
    await page.goto(url)
    await page.waitFor(1000);
    


}