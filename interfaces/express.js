declare class ExpressApp {
  get(
    path: string,
    handler: (request: ExpressRequest, response: ExpressResponse) => void
  ): void
}

declare class ExpressRequest {
  params: Object
}

declare class ExpressResponse {
  render(template: string, args: Object): void;
  send(message: string): void;
  setHeader(header: string, value: string): void;
}
