---
sidebar_position: 6
title: FAQ
---

### Is it possible to generate js code?

For now, most of our projects are based on typescript,
and we will continue to have all code generated this way

### What package managers janush supports?

[To run janush install it globally](getting-started#set-up-project)
For development mode janush supports all common package managers but we strongly recommend to use npm as convention

### What browsers janush supports?

Generated janush app project supports all modern browsers
Also a browserslist configuration is included in your package.json.
```json
{
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### What language features janush supports?

Janush supports a superset of the latest JavaScript standard (ES2015+)

### (development) How to apply changes to template files?

In order to get correct content of template files the best bet would be to generate project and modify its files.
If everything is tested and working properly, you should manually make all changes to the template files to the janush project.

### How to build and use CLI locally instead of npm?

There is a possibility to use the latest version locally. Please use commands 
```shell
npm install
npm run build
npm link
```

The proof that you are using local library instead of npm library can be version from `package.json`