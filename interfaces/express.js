declare class ExpressApp {
  get(
    path: string,
    handler: (request: ExpressRequest, response: ExpressResponse) => void
  ): void
}

declare class ExpressRequest {

}

declare class ExpressResponse {
  render(template: string, args: Object): void
}
