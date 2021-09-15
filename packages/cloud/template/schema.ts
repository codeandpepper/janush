import { Schema as AppSchema } from "@packages/application/schema";
import { Module } from "@enums/Module";

export interface Schema extends Partial<AppSchema> {
  skipInstall: boolean;
  modules: Module[];
}
