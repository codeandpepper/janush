import { Module } from "@enums/Module";

export interface Janush {
	name: string;
	cloud: {
		module: {
			[Module.AUTHENTICATION]: boolean;
		};
	};
	web: {
		module: {
			[Module.AUTHENTICATION]: boolean;
		};
	};
}
