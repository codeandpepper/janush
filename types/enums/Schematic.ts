export enum Schematic {
  APP = "app",
  CLOUD = "cloud",
  WEB = "web",
}

export enum CloudSchematic {
  TEMPLATE = "cloud.template",
  JANUSH = "cloud.janush",
  AUTHENTICATION = "cloud.authentication",
  AUTHENTICATION_EMAILS = "cloud.authentication.emails",
  AUTHENTICATION_IDP = "cloud.authentication.idP",
  CI = "cloud.ci",
  API = "cloud.api.appsync",
}

export enum WebSchematic {
  TEMPLATE = "web.template",
  JANUSH = "web.janush",
  AUTHENTICATION = "web.authentication",
  IDP = "web.idP",
}

export enum WebE2ESchematic {
  PROMPT = "web.e2e.prompt",
  FRAMEWORK = "web.e2e.framework",
}
