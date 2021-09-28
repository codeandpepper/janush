import { Schema as AppSchema } from "@schematics/application/schema";
import { Module } from "@enums/Module";

export interface Schema extends Partial<AppSchema> {
  skipInstall: boolean;
  modules: Module[];
}
