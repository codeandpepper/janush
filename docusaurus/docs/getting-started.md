---
sidebar_position: 1
title: Getting Started
---

# Getting Started

## Set up project

1. Install Janush CLI
```sh
npm install -g @codeandpepper/janush
```

2. Run Janush CLI
```sh
janush
```

3. Choose application name
```sh
Application name? (janush-app) Awesome App
```

4. Choose application type
```sh
Which application type would you like to use? (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ Cloud
 ◉ Web
```

5. Choose features
```sh
Which modules would you like to use? You can add this later. (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ Authentication

Do you want add an auth emails template? (Y/n) y
```

6. Source code is generated automatically
```sh
CREATE awesome-app/README.md (31 bytes)
CREATE awesome-app/janush.json (74 bytes)
CREATE awesome-app/cloud/.gitignore (107 bytes)
CREATE awesome-app/cloud/.npmignore (65 bytes)
CREATE awesome-app/cloud/README.md (543 bytes)
CREATE awesome-app/cloud/cdk.json (378 bytes)
CREATE awesome-app/cloud/jest.config.js (467 bytes)
CREATE awesome-app/cloud/package.json (920 bytes)
CREATE awesome-app/cloud/tsconfig.json (749 bytes)
CREATE awesome-app/cloud/bin/awesome-app.ts (822 bytes)
CREATE awesome-app/cloud/lib/awesome-app-stack.ts (814 bytes)
CREATE awesome-app/cloud/test/awesome-app.test.ts (475 bytes)
CREATE awesome-app/cloud/.eslintrc.js (918 bytes)
CREATE awesome-app/cloud/.prettierrc.json (135 bytes)
CREATE awesome-app/cloud/consts/index.ts (117 bytes)
CREATE awesome-app/cloud/enums/EnvName.ts (108 bytes)
CREATE awesome-app/cloud/scripts/test.txt (10 bytes)
CREATE awesome-app/cloud/utils/functions.ts (864 bytes)
CREATE awesome-app/cloud/lib/authentication/cognitoCdkConstruct.ts (1237 bytes)
CREATE awesome-app/cloud/lib/authentication/cognitoIdentityPoolCdkConstruct.ts (3275 bytes)
CREATE awesome-app/cloud/lib/authentication/cognitoUserPoolCdkConstruct.ts (1846 bytes)
CREATE awesome-app/cloud/enums/ServicePurpose.ts (68 bytes)
CREATE awesome-app/cloud/lib/authentication/emails/emailsCdkConstruct.ts (1889 bytes)
CREATE awesome-app/cloud/lib/authentication/emails/emailsLambda.ts (2802 bytes)
CREATE awesome-app/cloud/lib/authentication/emails/emailsS3CdkConstruct.ts (953 bytes)
CREATE awesome-app/cloud/lib/authentication/emails/templates/emailVerification.html (7965 bytes)
CREATE awesome-app/cloud/lib/authentication/emails/templates/emailVerification.mjml (2228 bytes)
CREATE awesome-app/cloud/lib/authentication/emails/templates/resetPassword.html (7978 bytes)
CREATE awesome-app/cloud/lib/authentication/emails/templates/resetPassword.mjml (2243 bytes)
CREATE awesome-app/cloud/lib/authentication/emails/utils/index.ts (1077 bytes)
CREATE awesome-app/cloud/enums/CognitoMessageTriggerSource.ts (222 bytes)
CREATE awesome-app/cloud/enums/EmailTemplate.ts (110 bytes)
CREATE awesome-app/web/README.md (2113 bytes)
CREATE awesome-app/web/package.json (974 bytes)
CREATE awesome-app/web/tsconfig.json (535 bytes)
CREATE awesome-app/web/public/favicon.ico (3870 bytes)
CREATE awesome-app/web/public/index.html (1748 bytes)
CREATE awesome-app/web/public/logo192.png (5347 bytes)
CREATE awesome-app/web/public/logo512.png (9664 bytes)
CREATE awesome-app/web/public/manifest.json (492 bytes)
CREATE awesome-app/web/public/robots.txt (67 bytes)
CREATE awesome-app/web/src/App.css (564 bytes)
CREATE awesome-app/web/src/App.test.tsx (273 bytes)
CREATE awesome-app/web/src/App.tsx (556 bytes)
CREATE awesome-app/web/src/index.css (366 bytes)
CREATE awesome-app/web/src/index.tsx (500 bytes)
CREATE awesome-app/web/src/logo.svg (2632 bytes)
CREATE awesome-app/web/src/react-app-env.d.ts (40 bytes)
CREATE awesome-app/web/src/reportWebVitals.ts (425 bytes)
CREATE awesome-app/web/src/setupTests.ts (241 bytes)
```

7. Use it as a starting point to develop your application