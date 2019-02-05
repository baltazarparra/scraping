const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

request('https://www.imdb.com/chart/moviemeter', (err, res, body) => {
  if (err) console.log(err)

  const $ = cheerio.load(body)

  $('.lister-list tr').each(function() {
    const title = $(this).find('.titleColumn a').text().trim()
    const rating = $(this).find('.imdbRating strong').text().trim()

    fs.appendFile('imdb.text', `${title}, ${rating} '\n'`, (error) => {
      if (error) console.log(error)
    })
  })
})
