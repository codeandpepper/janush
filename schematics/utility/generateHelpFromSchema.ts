import { colors } from "@angular/cli/utilities/color";
import { readJson } from "./jsonFilesUtils";

interface CommandHelp {
  command: string;
  alias?: string;
  description: string;
}

interface Property {
  aliases?: string[];
  description: string;
}

interface Properties {
  [property: string]: Property;
}

interface Schema {
  properties: Properties;
}

const generateHelpFromSchema = (relativePath: string): CommandHelp[] => {
  const schemaJsonContent = readJson<Schema>(relativePath);
  const schemaProperties = schemaJsonContent.properties;

  return Object.keys(schemaProperties).map((propertyName) => {
    const { aliases, description }: Property = schemaProperties[propertyName];
    const commandHelp: CommandHelp = {
      command: `--${propertyName}`,
      ...(!!aliases && {
        alias: aliases.map((alias) => "--" + alias).join(", "),
      }),
      description: description,
    };

    return commandHelp;
  });
};

const getCommandsHelpFromSchema = (relativePath: string) : string=> {
  const commandsHelp = generateHelpFromSchema(relativePath);
  let helpContent = "Available Commands:\n";

  commandsHelp.forEach(({ command, alias, description }) => {
    helpContent += alias
      ? `  ${colors.cyan(command)} (${alias}) ${description}\n`
      : `  ${colors.cyan(command)} ${description}\n`;
  });

  return helpContent;
};

export default getCommandsHelpFromSchema;
