const puppeteer = require('puppeteer')

const process = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitFor(1000)

  const obiecte = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.Products-item'))
      .map(x => ({
        name_product: x.querySelector('.Product-photoWrapper > a').title.toString().substr(0, 40),
        url_product: x.querySelector('.Product-photoWrapper > a').href,
        price_product: Number(x.querySelector('.Price-int').innerText),
        source: 'altex'
      }))
  }
  )

  // console.log(obiecte)

  await browser.close()

  return obiecte
}

// process('https://altex.ro/cauta/?q=mouse%2520gaming');

const process2 = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitFor(1000)

  const obiecte = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product_box'))
      .map(x => ({
        nume_product: x.querySelector('.product_box_name > div > a').title.toString().substr(0, 40),
        url_product: x.querySelector('.product_box_name > div > a').href,
        price_product: x.querySelector('.price').innerText,
        source: 'pcgaraje'
      }))
  }
  )

  await browser.close()

  return obiecte
}

const process3 = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitFor(1000)

  const obiecte = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.nice_product_container'))
      .map(x => ({
        name_product: x.querySelector('.npi_image > a').title.toString().substr(0, 40),
        url_product: x.querySelector('.npi_image > a').href,
        price_product: x.querySelector('.real_price').innerText,
        source: 'evomag'
      }))
  }
  )

  // console.log(obiecte)

  await browser.close()

  return obiecte
}

// results merged
(async () => {
  const arr1 = await process('https://altex.ro/cauta/?q=mouse%2520gaming')
  const arr2 = await process2('https://www.pcgarage.ro/mouse/')
  const arr3 = await process3('https://www.evomag.ro/?sn.q=mouse')

  let arr4 = []
  arr4 = arr1.concat(arr2, arr3)
  console.log(arr4)
})()

module.exports = { process }
