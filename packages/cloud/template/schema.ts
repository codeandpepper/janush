import { Schema as AppSchema } from "../../application/schema";
import { Module } from "../../../types/enums/Module";

export interface Schema extends Partial<AppSchema> {
  skipInstall: boolean;
  modules: Module[];
}
