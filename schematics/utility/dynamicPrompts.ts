import { prompt, CheckboxQuestion, InputQuestion } from "inquirer";

import { Schematic } from "@enums/Schematic";

async function inputPrompt(
  message: string,
  promptName: string,
  defaultResponse: string
): Promise<string> {
  const question: InputQuestion = {
    type: "input",
    name: promptName,
    message,
    default: defaultResponse,
  };
  const answers = await prompt([question]);

  return answers[promptName];
}

async function checkboxPrompt(
  message: string,
  promptName: string,
  choicesSet: Schematic[],
  checkedChoices: boolean[]
): Promise<Schematic[]> {
  const choices = choicesSet.map((choice) => {
    const capitalizedChoice =
      choice.charAt(0).toLocaleUpperCase() + choice.slice(1);

    return {
      name: capitalizedChoice,
      value: choice,
    };
  });
  const defaultChoices = choicesSet.filter((_, index) => checkedChoices[index]);
  const question: CheckboxQuestion = {
    type: "checkbox",
    name: promptName,
    message,
    choices,
    default: defaultChoices,
  };
  const answers = await prompt([question]);

  return answers[promptName];
}

export { inputPrompt, checkboxPrompt };
