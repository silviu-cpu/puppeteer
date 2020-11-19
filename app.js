const puppeteer = require('puppeteer');




let process = async (url) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);


   
    const obiecte = await page.evaluate(() => 

        {
            return Array.from(document.querySelectorAll('.answer'))
                        .map( x => ({
                            votes: (x.querySelector('.js-vote-count')) ? Number(x.querySelector('.js-vote-count').innerText) : 0,
                            comments: x.querySelector('.post-text').innerText.toString().substring(0,140),
                            winn: !x.querySelector('.js-accepted-answer-indicator').classList.contains("d-none")                          
                        }))
        }
    )
     
    console.log(obiecte)


    await browser.close();
}


process('https://stackoverflow.com/questions/39754435/nginx-proxy-to-remote-node-js-express-app-in-subdirectory/54696122?noredirect=1#comment104251493_54696122');