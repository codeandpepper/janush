import { Janush } from "@interfaces/Janush";
import { Module } from "@enums/Module";

export const emptyJanush: Janush = {
  name: "janush-app",
  cloud: {
    module: {
      [Module.AUTHORIZATION]: false,
    },
  },
  web: false,
};

export const moduleJanush: Janush = {
  name: "janush-app",
  cloud: {
    module: {
      [Module.AUTHORIZATION]: true,
    },
  },
  web: true,
};
