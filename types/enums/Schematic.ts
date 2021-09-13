export enum Schematic {
  APP = "app",
  CLOUD = "cloud",
  WEB = "web",
}

export enum CloudSchematic {
  TEMPLATE = Schematic.CLOUD + ".template",
}

export enum WebSchematic {
  TEMPLATE = Schematic.WEB + ".template",
}
