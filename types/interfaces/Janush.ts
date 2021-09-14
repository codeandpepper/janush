import { Module } from "../enums/Module";

export interface Janush {
  name: string;
  cloud?: {
    [Module.AUTHORIZATION]: boolean;
  };
  web?: {
    [Module.AUTHORIZATION]: boolean;
  };
}
