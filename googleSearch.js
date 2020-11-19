const puppeteer = require('puppeteer')

const getGoogleResultsDomainsPlacesPerPage = async (options) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // options.query - string - query string we are searching for
  // options.start - unsigned integer - the position we start listing google results

  if (!Number.isInteger(Number(options.start)) || Number(options.start) <= 0) {
    options.start = 0
  }
  if (typeof options.query !== 'string') {
    throw new Error('options.query expected to be string')
  }

  // creating url
  const url = 'https://google.ro/search?q=' + options.query + '&start=' + options.start

  await page.goto(url)

  const domenii = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.g'))
      .map((item, index) => ({
        domeniu: new URL(item.querySelector('.r > a').href).host,
        position: index + 1
      }))
  })

  await browser.close()

  return domenii
}

// getGoogleResultsDomainsPlacesPerPage({query:'stivuitor',start: 10}).then(console.log);

const getGoogleTop = async (options) => {
  // options.query - string - query string we are searching for
  let top = []

  for (let page = 0; page < 2; page++) {
    const result = await getGoogleResultsDomainsPlacesPerPage({
      query: options.query,
      start: page * 10
    })

    top = top.concat(result)
      .map((item, index) => ({
        domeniu: item.domeniu,
        position: index + (page - 1) * 10
      }))
  }

  /* function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};

        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
         return newArray;
    }

    var uniqueArray = removeDuplicates(top, "domeniu")

    return uniqueArray; */
  Array.prototype.removeDuplicateDomains = function () {
    return Object.values(Object.fromEntries(
      this
        .sort((a, b) => b.position - a.position)
        .map(object => [object.domeniu, object])
    )).sort((a, b) => a.position - b.position)
  }

  top = top.removeDuplicateDomains()
  return top
}

getGoogleTop({ query: 'stivuitor' }).then(console.log)
