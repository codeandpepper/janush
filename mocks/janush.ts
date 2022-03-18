import { Module } from "@enums/Module";
import { Janush } from "@interfaces/Janush";

export const emptyJanush: Janush = {
	name: "janush-app",
	cloud: {
		module: {
			[Module.AUTHENTICATION]: false,
		},
	},
	web: {
		module: {
			[Module.AUTHENTICATION]: false,
		},
	},
};

export const moduleJanush: Janush = {
	name: "janush-app",
	cloud: {
		module: {
			[Module.AUTHENTICATION]: true,
		},
	},
	web: {
		module: {
			[Module.AUTHENTICATION]: true,
		},
	},
};
