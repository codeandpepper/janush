import path from "path";

import { Schematic } from "@enums/Schematic";

export const JANUSH_ROOT_PATH = path.join(__dirname, "..");

export const JANUSH_JSON_PATH = "janush.json";
export const PACKAGE_JSON_PATH = "package.json";

export const CLOUD_PACKAGE_JSON_PATH = `${Schematic.CLOUD}/${PACKAGE_JSON_PATH}`;
export const WEB_PACKAGE_JSON_PATH = `${Schematic.WEB}/${PACKAGE_JSON_PATH}`;
