import { Module } from "@enums/Module";
import { Schema } from "@janush-schematics/cloud/template/schema";

export const isEmptyModules = (options: Schema) => options.modules.length === 0;
export const isAuthenticationModule = (options: Schema) =>
  options.modules.includes(Module.AUTHENTICATION);
export const isApiModule = (options: Schema) => options.modules.includes(Module.API);
