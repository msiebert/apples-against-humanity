// @flow

/**
 * Handle requests for the home page.
 */
export default class MasterController {
  main(response: ExpressResponse) {
    response.render('master', {})
  }
}
