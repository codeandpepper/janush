import { Module } from "@enums/Module";

export interface Janush {
  name: string;
  cloud: {
    module: {
      [Module.AUTHORIZATION]: boolean;
    };
  };
  // TODO refactor when argument come
  web: boolean;
}
