/**
 * Handle requests for the home page.
 */
class Home {
  main(response) {
    response.render('home', {
      name: 'World'
    })
  }
}

module.exports = Home
