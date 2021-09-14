import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

export const installDependencies = (workingDirectory: string): NodePackageInstallTask => {
  return new NodePackageInstallTask({
    workingDirectory,
    hideOutput: false,
  });
};
