import { Schema as AppSchema } from "@janush-schematics/application/schema";
import { Module } from "@enums/Module";

export interface Schema extends Partial<AppSchema> {
  modules: Module[];
}
