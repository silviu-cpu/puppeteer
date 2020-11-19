const puppeteer = require('puppeteer')

const process2 = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitFor(1000)

  const obiecte = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product_box'))
      .map(x => ({
        name_product: x.querySelector('.product_box_name > div > a').title.toString().substr(0, 40),
        url_product: x.querySelector('.product_box_name > div > a').href,
        price_product: x.querySelector('.price').innerText,
        source: 'pcgaraje'
      }))
  }
  )

  console.log(obiecte)

  await browser.close()
}

process2('https://www.pcgarage.ro/mouse/')
