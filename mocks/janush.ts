import { Janush } from "../types/interfaces/Janush";
import { Module } from "../types/enums/Module";

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
