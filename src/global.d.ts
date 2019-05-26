declare module "nosleep.js" {
  export = NoSleep;
  class NoSleep {
    constructor();
    public enable(): void;
    public disable(): void;
  }
}

declare module "transit-immutable-js" {
  const toJSON: (m: any) => string;
  const fromJSON: (s: string) => any;
  export const toJSON;
  export const fromJSON;
}
