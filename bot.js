const fetch = require('node-fetch')

fetch('https://hooks.slack.com/services/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', {
        
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
            },
    body: JSON.stringify({
        text: 'test'
    })

})
