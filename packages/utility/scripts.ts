import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

export const installNodePackages = (workingDirectory: string): NodePackageInstallTask => {
  return new NodePackageInstallTask({
    workingDirectory,
    hideOutput: false,
  });
};
