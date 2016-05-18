declare class SocketIO {
  on(event: string, handler: (...args: Array<any>) => void): void;

  emit(event: string, ...args: Array<any>): void;
}
