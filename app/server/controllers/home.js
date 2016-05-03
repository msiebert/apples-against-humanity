// @flow

/**
 * Handle requests for the home page.
 */
class HomeController {
  main(response: ExpressResponse) {
    response.render('home', {
      name: 'World'
    })
  }
}

module.exports = HomeController
