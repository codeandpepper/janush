import { Schema as AppSchema } from "@janush-schematics/application/schema";
import { Module } from "@enums/Module";

export interface Schema extends Partial<AppSchema> {
  name: string;
  skipInstall: boolean;
  modules: Module[];
}
