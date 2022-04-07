"use strict";(self.webpackChunkjanush=self.webpackChunkjanush||[]).push([[28],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return m}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),s=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=s(t.components);return a.createElement(p.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},c=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),c=s(n),m=r,f=c["".concat(p,".").concat(m)]||c[m]||d[m]||l;return n?a.createElement(f,i(i({ref:e},u),{},{components:n})):a.createElement(f,i({ref:e},u))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=c;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var s=2;s<l;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},1138:function(t,e,n){n.r(e),n.d(e,{assets:function(){return u},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return d}});var a=n(7462),r=n(3366),l=(n(7294),n(3905)),i=["components"],o={sidebar_position:3,title:"CLI Options"},p=void 0,s={unversionedId:"janush-cli",id:"janush-cli",title:"CLI Options",description:"Janush is a command-line tool that you use to initialize, develop, scaffold, and maintain cloud and web applications directly from a command shell.",source:"@site/docs/janush-cli.md",sourceDirName:".",slug:"/janush-cli",permalink:"/docs/janush-cli",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/janush-cli.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"CLI Options"},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/getting-started"},next:{title:"E2E tests",permalink:"/docs/e2e-tests"}},u={},d=[{value:"CLI command-language syntax",id:"cli-command-language-syntax",level:2},{value:"Boolean options",id:"boolean-options",level:3},{value:"Options Overview",id:"options-overview",level:2}],c={toc:d};function m(t){var e=t.components,n=(0,r.Z)(t,i);return(0,l.kt)("wrapper",(0,a.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Janush is a command-line tool that you use to initialize, develop, scaffold, and maintain cloud and web applications directly from a command shell."),(0,l.kt)("h2",{id:"cli-command-language-syntax"},"CLI command-language syntax"),(0,l.kt)("p",null,"Command syntax is shown as follows:"),(0,l.kt)("p",null,"janush optionNameOrAlias=requiredArg","[optionalArg][options]"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Some of options are obligatory and if not supplied, the appropriate prompt shows on screena after running command."),(0,l.kt)("li",{parentName:"ul"},"Most options have aliases. Aliases are shown in the ",(0,l.kt)("a",{parentName:"li",href:"#options-overview"},"Options Overview")," for specific."),(0,l.kt)("li",{parentName:"ul"},"Both option names and aliases are prefixed with a double dash (--).")),(0,l.kt)("h3",{id:"boolean-options"},"Boolean options"),(0,l.kt)("p",null,"Boolean options do not take arguments e.g. --skipInstall option sets its flag to true. If neither option is supplied, the flag remains in its default state, as listed in the ",(0,l.kt)("a",{parentName:"p",href:"#options-overview"},"Options Overview"),"."),(0,l.kt)("h2",{id:"options-overview"},"Options Overview"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"OPTION"),(0,l.kt)("th",{parentName:"tr",align:null},"ALIAS"),(0,l.kt)("th",{parentName:"tr",align:null},"TYPE"),(0,l.kt)("th",{parentName:"tr",align:null},"DEFAULT VALUE"),(0,l.kt)("th",{parentName:"tr",align:null},"DESCRIPTION"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"--name"),(0,l.kt)("td",{parentName:"tr",align:null},"--n"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"janush-app"),(0,l.kt)("td",{parentName:"tr",align:null},"Sets application name.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"--types"),(0,l.kt)("td",{parentName:"tr",align:null},"--t"),(0,l.kt)("td",{parentName:"tr",align:null},"object"),(0,l.kt)("td",{parentName:"tr",align:null},"{cloud, web}"),(0,l.kt)("td",{parentName:"tr",align:null},"Sets application types to be installed.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("span",{style:{whiteSpace:"nowrap"}},"--isAutoGenerated")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"Outputs, if created by deployment bot.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"--skipInstall"),(0,l.kt)("td",{parentName:"tr",align:null},"--s"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"Skip installing dependencies.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"--version"),(0,l.kt)("td",{parentName:"tr",align:null},"--v"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"Outputs Janush version.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"--help"),(0,l.kt)("td",{parentName:"tr",align:null},"--h"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"Outputs short Janush help.")))))}m.isMDXComponent=!0}}]);