import { Module } from "@enums/Module";

export interface Janush {
  name: string;
  cloud: {
    module: {
      [Module.AUTHENTICATION]: boolean;
      [Module.API]: boolean;
      [Module.USERS_MANAGEMENT]: boolean;
    };
  };
  web: {
    module: {
      [Module.AUTHENTICATION]: boolean;
    };
  };
}
