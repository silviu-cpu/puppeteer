const puppeteer = require('puppeteer');

let process3 = async (url) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    
    await page.goto(url);
    await page.waitFor(1000);

    const obiecte = await page.evaluate(() => 

        {
            return Array.from(document.querySelectorAll('.nice_product_container'))
                        .map( x => ({
                            name_product: x.querySelector('.npi_image > a').title.toString().substr(0,40),
                            url_product: x.querySelector('.npi_image > a').href,
                            price_product: x.querySelector('.real_price').innerText,
                            source: "evomag"                          
                        }))
        }
    )
     
    console.log(obiecte)

    await browser.close();
}

process3('https://www.evomag.ro/?sn.q=mouse');

