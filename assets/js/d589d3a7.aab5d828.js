"use strict";(self.webpackChunkjanush=self.webpackChunkjanush||[]).push([[162],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return b}});var n=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,s=function(e,t){if(null==e)return{};var a,n,s={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var i=n.createContext({}),l=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,s=e.mdxType,o=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=l(a),b=s,d=m["".concat(i,".").concat(b)]||m[b]||u[b]||o;return a?n.createElement(d,r(r({ref:t},c),{},{components:a})):n.createElement(d,r({ref:t},c))}));function b(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=a.length,r=new Array(o);r[0]=m;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:s,r[1]=p;for(var l=2;l<o;l++)r[l]=a[l];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9390:function(e,t,a){a.r(t),a.d(t,{assets:function(){return c},contentTitle:function(){return i},default:function(){return b},frontMatter:function(){return p},metadata:function(){return l},toc:function(){return u}});var n=a(7462),s=a(3366),o=(a(7294),a(3905)),r=["components"],p={sidebar_position:1,title:"Getting Started"},i="Getting Started",l={unversionedId:"getting-started",id:"getting-started",title:"Getting Started",description:"Set up project",source:"@site/docs/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/docs/getting-started",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/getting-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Getting Started"},sidebar:"tutorialSidebar",next:{title:"CLI Options",permalink:"/docs/janush-cli"}},c={},u=[{value:"Set up project",id:"set-up-project",level:2}],m={toc:u};function b(e){var t=e.components,a=(0,s.Z)(e,r);return(0,o.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting Started"),(0,o.kt)("h2",{id:"set-up-project"},"Set up project"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Install Janush CLI")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"npm install -g @codeandpepper/janush\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Run Janush CLI")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"janush\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Choose application name")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"Application name? (janush-app) Awesome App\n")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Choose application type")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"Which application type would you like to use? (Press <space> to select, <a> to toggle all, <i> to invert selection)\n\u276f\u25c9 Cloud\n \u25c9 Web\n")),(0,o.kt)("ol",{start:5},(0,o.kt)("li",{parentName:"ol"},"Choose features")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"Which modules would you like to use? You can add this later. (Press <space> to select, <a> to toggle all, <i> to invert selection)\n\u276f\u25c9 Authentication\n\nDo you want add an auth emails template? (Y/n) y\n")),(0,o.kt)("ol",{start:6},(0,o.kt)("li",{parentName:"ol"},"Source code is generated automatically")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"CREATE awesome-app/README.md (31 bytes)\nCREATE awesome-app/janush.json (74 bytes)\nCREATE awesome-app/cloud/.gitignore (107 bytes)\nCREATE awesome-app/cloud/.npmignore (65 bytes)\nCREATE awesome-app/cloud/README.md (543 bytes)\nCREATE awesome-app/cloud/cdk.json (378 bytes)\nCREATE awesome-app/cloud/jest.config.js (467 bytes)\nCREATE awesome-app/cloud/package.json (920 bytes)\nCREATE awesome-app/cloud/tsconfig.json (749 bytes)\nCREATE awesome-app/cloud/bin/awesome-app.ts (822 bytes)\nCREATE awesome-app/cloud/lib/awesome-app-stack.ts (814 bytes)\nCREATE awesome-app/cloud/test/awesome-app.test.ts (475 bytes)\nCREATE awesome-app/cloud/.eslintrc.js (918 bytes)\nCREATE awesome-app/cloud/.prettierrc.json (135 bytes)\nCREATE awesome-app/cloud/consts/index.ts (117 bytes)\nCREATE awesome-app/cloud/enums/EnvName.ts (108 bytes)\nCREATE awesome-app/cloud/scripts/test.txt (10 bytes)\nCREATE awesome-app/cloud/utils/functions.ts (864 bytes)\nCREATE awesome-app/cloud/lib/authentication/cognitoCdkConstruct.ts (1237 bytes)\nCREATE awesome-app/cloud/lib/authentication/cognitoIdentityPoolCdkConstruct.ts (3275 bytes)\nCREATE awesome-app/cloud/lib/authentication/cognitoUserPoolCdkConstruct.ts (1846 bytes)\nCREATE awesome-app/cloud/enums/ServicePurpose.ts (68 bytes)\nCREATE awesome-app/cloud/lib/authentication/emails/emailsCdkConstruct.ts (1889 bytes)\nCREATE awesome-app/cloud/lib/authentication/emails/emailsLambda.ts (2802 bytes)\nCREATE awesome-app/cloud/lib/authentication/emails/emailsS3CdkConstruct.ts (953 bytes)\nCREATE awesome-app/cloud/lib/authentication/emails/templates/emailVerification.html (7965 bytes)\nCREATE awesome-app/cloud/lib/authentication/emails/templates/emailVerification.mjml (2228 bytes)\nCREATE awesome-app/cloud/lib/authentication/emails/templates/resetPassword.html (7978 bytes)\nCREATE awesome-app/cloud/lib/authentication/emails/templates/resetPassword.mjml (2243 bytes)\nCREATE awesome-app/cloud/lib/authentication/emails/utils/index.ts (1077 bytes)\nCREATE awesome-app/cloud/enums/CognitoMessageTriggerSource.ts (222 bytes)\nCREATE awesome-app/cloud/enums/EmailTemplate.ts (110 bytes)\nCREATE awesome-app/web/README.md (2113 bytes)\nCREATE awesome-app/web/package.json (974 bytes)\nCREATE awesome-app/web/tsconfig.json (535 bytes)\nCREATE awesome-app/web/public/favicon.ico (3870 bytes)\nCREATE awesome-app/web/public/index.html (1748 bytes)\nCREATE awesome-app/web/public/logo192.png (5347 bytes)\nCREATE awesome-app/web/public/logo512.png (9664 bytes)\nCREATE awesome-app/web/public/manifest.json (492 bytes)\nCREATE awesome-app/web/public/robots.txt (67 bytes)\nCREATE awesome-app/web/src/App.css (564 bytes)\nCREATE awesome-app/web/src/App.test.tsx (273 bytes)\nCREATE awesome-app/web/src/App.tsx (556 bytes)\nCREATE awesome-app/web/src/index.css (366 bytes)\nCREATE awesome-app/web/src/index.tsx (500 bytes)\nCREATE awesome-app/web/src/logo.svg (2632 bytes)\nCREATE awesome-app/web/src/react-app-env.d.ts (40 bytes)\nCREATE awesome-app/web/src/reportWebVitals.ts (425 bytes)\nCREATE awesome-app/web/src/setupTests.ts (241 bytes)\n")),(0,o.kt)("ol",{start:7},(0,o.kt)("li",{parentName:"ol"},"Use it as a starting point to develop your application")))}b.isMDXComponent=!0}}]);