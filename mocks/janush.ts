import { Janush } from "@interfaces/Janush";
import { Module } from "@enums/Module";

export const emptyJanush: Janush = {
  name: "janush-app",
  cloud: {
    module: {
      [Module.AUTHENTICATION]: false,
    },
  },
  web: {
    module: {},
  },
};

export const moduleJanush: Janush = {
  name: "janush-app",
  cloud: {
    module: {
      [Module.AUTHENTICATION]: true,
    },
  },
  web: {
    module: {},
  },
};
