const puppeteer = require('puppeteer');

// screenshot
(async () => {
  const browser = await puppeteer.launch({ headless: false }, { executablePath: 'path/to/Chrome' })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await page.screenshot({ path: 'google_pic.png' })

  page.on('console', msg => console.log('PAGE LOG:', msg.text()))

  await page.evaluate(() => console.log(`url is ${location.href}`))
  // Get the "viewport" of the page, as reported by the page.
  /*  const dimensions = await page.evaluate(() => {
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          deviceScaleFactor: window.devicePixelRatio
        };
      });

      console.log('Dimensions:', dimensions); */

  await browser.close()
})()

/* (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    await page.pdf({path: 'hn.pdf', format: 'A4'});

    await browser.close();
  })(); */
