import { Module } from "@enums/Module";
import { Schema as AppSchema } from "@janush-schematics/application/schema";

export interface Schema extends Partial<AppSchema> {
  e2e: boolean;
  modules: Module[];
}
