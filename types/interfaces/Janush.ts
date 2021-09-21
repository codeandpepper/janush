import { Module } from "@enums/Module";

export interface Janush {
  name: string;
  cloud: {
    module: {
      [Module.AUTHORIZATION]: boolean;
    };
  };
  web: {
    module: {}
  };
}
