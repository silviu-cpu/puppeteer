const puppeteer = require('puppeteer')
const fetch = require('node-fetch')

const searchProcess = async (options) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // options.query - string - query string we are searching for
  // options.start - unsigned integer - the position we start listing google results

  if (!Number.isInteger(Number(options.offset)) || Number(options.offset) <= 0) {
    options.offset = 1
  }
  if (typeof options.query !== 'string') {
    throw new Error('options.query expected to be string')
  }

  // creating url
  const url = 'https://stackoverflow.com/search?q=' + options.query + '&?tab=Frequent'

  await page.goto(url)
  await page.waitFor(1000)

  // return all questions
  const intrebari = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.question-summary'))
      .map(x => x.querySelector('.result-link a').href)
  })

  // console.log(intrebari);

  await page.goto(intrebari[options.offset])

  const raspunsuri = await page.evaluate(() => {
    const answers = Array.from(document.querySelectorAll('.answer'))
      .map(x => ({
        text: x.querySelector('.s-prose').innerText.toString().substring(0, 255)
          .replace(/[\n\t\s]+/g, ' '),

        // originalText: x.querySelector('.s-prose').innerText.toString(),
        // votes: (x.querySelector('.js-vote-count')) ? Number(x.querySelector('.js-vote-count').innerText) : 0,
        links: x.querySelector('div.post-menu > a').href
      }))

    return {
      question: {
        title: document.querySelector('#question-header').innerText
        // date: String(document.querySelector('time').getAttribute('datetime')).substring(0,10),
        // votes: Number(document.querySelector('.question .js-vote-count').innerText),
        // answers: answers.length,
        // tags: [].concat(Array.from(document.querySelectorAll('.post-tag')).map(x => x.innerText))

      },

      answers
    }
  })

  await browser.close()
  //console.log(raspunsuri);
  
  const a = { 
    titleQuestion: raspunsuri.question.title,
    answerQuestion: raspunsuri.answers[0].text,
    answerLinks: raspunsuri.answers[0].links
  }
  console.log(a);
  return a 
         
}

searchProcess({ query: 'url undefined', offset: 3 })
/*(async () => {
  const results = []

  for (let i = 0; i < 1; i++) {
    results.push(await searchProcess({ query: 'url undefined', offset: 3 }))
  }

   console.dir(results,{depth:20});*/

 /* await fetch('https://hooks.slack.com/services/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', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      text: 'A vorbit silvica_bot',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Q:' + results[0].question.title,
            emoji: true
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: results[0].answers[0].text
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Visit on stackoverflow.com',
              emoji: true
            },
            url: results[0].answers[0].links
          }

        }
      ]
    })

  })*/
//})()
