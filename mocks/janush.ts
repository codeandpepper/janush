import { Module } from "@enums/Module";
import { Janush } from "@interfaces/Janush";

export const emptyJanush: Janush = {
  name: "janush-app",
  cloud: {
    module: {
      [Module.AUTHENTICATION]: false,
      [Module.API]: false,
    },
  },
  web: {
    module: {
      [Module.AUTHENTICATION]: false,
    },
  },
};

export const moduleJanush: Janush = {
  name: "janush-app",
  cloud: {
    module: {
      [Module.AUTHENTICATION]: true,
      [Module.API]: true,
    },
  },
  web: {
    module: {
      [Module.AUTHENTICATION]: true,
    },
  },
};
