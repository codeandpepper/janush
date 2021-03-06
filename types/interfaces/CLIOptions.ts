export interface CLIOptions {
  //INFO: Change 'command' to more suitable name for schematics' type
  command?: string;
  debug?: string;
  name?: string;
  isAutoGenerated?: boolean;
  skipInstall?: boolean;
  types?: string[];
  modules?: string[];
  e2e?: boolean;
  e2eModule?: string;
  version?: boolean;
  help?: boolean;
}
