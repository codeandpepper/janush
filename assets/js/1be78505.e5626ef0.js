(self.webpackChunkjanush=self.webpackChunkjanush||[]).push([[514,75],{5750:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Pe}});var a=n(7294),r=n(3905),o=n(6291),l=n(308),i=n(6010),c=n(941),s=n(3783),u=n(7898),d=n(5537),m=n(7462),p=function(e){return a.createElement("svg",(0,m.Z)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))},h=n(4973),f=n(3366),y=n(6742),g=n(3919),v=n(8617),b="menuLinkText_1J2g",k=["items"],E=["item"],Z=["item","onItemClick","activePath"],C=["item","onItemClick","activePath"],N=function e(t,n){return"link"===t.type?(0,c.Mg)(t.href,n):"category"===t.type&&t.items.some((function(t){return e(t,n)}))},_=(0,a.memo)((function(e){var t=e.items,n=(0,f.Z)(e,k);return a.createElement(a.Fragment,null,t.map((function(e,t){return a.createElement(T,(0,m.Z)({key:t,item:e},n))})))}));function T(e){var t=e.item,n=(0,f.Z)(e,E);switch(t.type){case"category":return 0===t.items.length?null:a.createElement(S,(0,m.Z)({item:t},n));case"link":default:return a.createElement(x,(0,m.Z)({item:t},n))}}function S(e){var t,n=e.item,r=e.onItemClick,o=e.activePath,l=(0,f.Z)(e,Z),s=n.items,u=n.label,d=n.collapsible,p=N(n,o),h=(0,c.uR)({initialState:function(){return!!d&&(!p&&n.collapsed)}}),y=h.collapsed,g=h.setCollapsed,v=h.toggleCollapsed;return function(e){var t=e.isActive,n=e.collapsed,r=e.setCollapsed,o=(0,c.D9)(t);(0,a.useEffect)((function(){t&&!o&&n&&r(!1)}),[t,o,n])}({isActive:p,collapsed:y,setCollapsed:g}),a.createElement("li",{className:(0,i.Z)(c.kM.docs.docSidebarItemCategory,"menu__list-item",{"menu__list-item--collapsed":y})},a.createElement("a",(0,m.Z)({className:(0,i.Z)("menu__link",(t={"menu__link--sublist":d,"menu__link--active":d&&p},t[b]=!d,t)),onClick:d?function(e){e.preventDefault(),v()}:void 0,href:d?"#":void 0},l),u),a.createElement(c.zF,{lazy:!0,as:"ul",className:"menu__list",collapsed:y},a.createElement(_,{items:s,tabIndex:y?-1:0,onItemClick:r,activePath:o})))}function x(e){var t=e.item,n=e.onItemClick,r=e.activePath,o=(0,f.Z)(e,C),l=t.href,s=t.label,u=N(t,r);return a.createElement("li",{className:(0,i.Z)(c.kM.docs.docSidebarItemLink,"menu__list-item"),key:s},a.createElement(y.Z,(0,m.Z)({className:(0,i.Z)("menu__link",{"menu__link--active":u}),"aria-current":u?"page":void 0,to:l},(0,g.Z)(l)&&{onClick:n},o),(0,g.Z)(l)?s:a.createElement("span",null,s,a.createElement(v.Z,null))))}var I="sidebar_15mo",j="sidebarWithHideableNavbar_267A",P="sidebarHidden_2kNb",B="sidebarLogo_3h0W",L="menu_Bmed",w="menuWithAnnouncementBar_2WvA",M="collapseSidebarButton_1CGd",A="collapseSidebarButtonIcon_3E-R";function D(e){var t=e.onClick;return a.createElement("button",{type:"button",title:(0,h.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,h.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,i.Z)("button button--secondary button--outline",M),onClick:t},a.createElement(p,{className:A}))}function F(e){var t,n,r=e.path,o=e.sidebar,l=e.onCollapse,s=e.isHidden,m=function(){var e=(0,c.nT)().isClosed,t=(0,a.useState)(!e),n=t[0],r=t[1];return(0,u.Z)((function(t){var n=t.scrollY;e||r(0===n)})),n}(),p=(0,c.LU)(),h=p.navbar.hideOnScroll,f=p.hideableSidebar,y=(0,c.nT)().isClosed;return a.createElement("div",{className:(0,i.Z)(I,(t={},t[j]=h,t[P]=s,t))},h&&a.createElement(d.Z,{tabIndex:-1,className:B}),a.createElement("nav",{className:(0,i.Z)("menu thin-scrollbar",L,(n={},n[w]=!y&&m,n))},a.createElement("ul",{className:(0,i.Z)(c.kM.docs.docSidebarMenu,"menu__list")},a.createElement(_,{items:o,activePath:r}))),f&&a.createElement(D,{onClick:l}))}var O=function(e){var t=e.toggleSidebar,n=e.sidebar,r=e.path;return a.createElement("ul",{className:(0,i.Z)(c.kM.docs.docSidebarMenu,"menu__list")},a.createElement(_,{items:n,activePath:r,onItemClick:function(){return t()}}))};function R(e){return a.createElement(c.Cv,{component:O,props:e})}var H=a.memo(F),W=a.memo(R);function z(e){var t=(0,s.Z)(),n="desktop"===t||"ssr"===t,r="mobile"===t;return a.createElement(a.Fragment,null,n&&a.createElement(H,e),r&&a.createElement(W,e))}var U=n(9105),V={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},Y={Prism:n(7410).default,theme:V};function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function J(){return(J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var K=/\r\n|\r|\n/,G=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},q=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},Q=function(e,t){var n=e.plain,a=Object.create(null),r=e.styles.reduce((function(e,n){var a=n.languages,r=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=J({},e[t],r);e[t]=n})),e}),a);return r.root=n,r.plain=J({},n,{backgroundColor:null}),r};function X(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}var ee=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),$(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?Q(e.theme,e.language):void 0;return t.themeDict=n})),$(this,"getLineProps",(function(e){var n=e.key,a=e.className,r=e.style,o=J({},X(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(o.style=l.plain),void 0!==r&&(o.style=void 0!==o.style?J({},o.style,r):r),void 0!==n&&(o.key=n),a&&(o.className+=" "+a),o})),$(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,r=n.length,o=t.getThemeDict(t.props);if(void 0!==o){if(1===r&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===r&&!a)return o[n[0]];var l=a?{display:"inline-block"}:{},i=n.map((function(e){return o[e]}));return Object.assign.apply(Object,[l].concat(i))}})),$(this,"getTokenProps",(function(e){var n=e.key,a=e.className,r=e.style,o=e.token,l=J({},X(e,["key","className","style","token"]),{className:"token "+o.types.join(" "),children:o.content,style:t.getStyleForToken(o),key:void 0});return void 0!==r&&(l.style=void 0!==l.style?J({},l.style,r):r),void 0!==n&&(l.key=n),a&&(l.className+=" "+a),l})),$(this,"tokenize",(function(e,t,n,a){var r={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",r);var o=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),o}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,r=e.children,o=this.getThemeDict(this.props),l=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],a=[0],r=[e.length],o=0,l=0,i=[],c=[i];l>-1;){for(;(o=a[l]++)<r[l];){var s=void 0,u=t[l],d=n[l][o];if("string"==typeof d?(u=l>0?u:["plain"],s=d):(u=q(u,d.type),d.alias&&(u=q(u,d.alias)),s=d.content),"string"==typeof s){var m=s.split(K),p=m.length;i.push({types:u,content:m[0]});for(var h=1;h<p;h++)G(i),c.push(i=[]),i.push({types:u,content:m[h]})}else l++,t.push(u),n.push(s),a.push(0),r.push(s.length)}l--,t.pop(),n.pop(),a.pop(),r.pop()}return G(i),c}(void 0!==l?this.tokenize(t,a,l,n):[a]),className:"prism-code language-"+n,style:void 0!==o?o.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(a.Component);var te=n(7594),ne=n.n(te),ae={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]},re=n(5350),oe=function(){var e=(0,c.LU)().prism,t=(0,re.Z)().isDarkTheme,n=e.theme||ae,a=e.darkTheme||n;return t?a:n},le="codeBlockContainer_K1bP",ie="codeBlockContent_hGly",ce="codeBlockTitle_eoMF",se="codeBlock_23N8",ue="copyButton_Ue-o",de="codeBlockLines_39YC",me=/{([\d,-]+)}/,pe=["js","jsBlock","jsx","python","html"],he={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},fe=["highlight-next-line","highlight-start","highlight-end"],ye=function(e){void 0===e&&(e=pe);var t=e.map((function(e){var t=he[e],n=t.start,a=t.end;return"(?:"+n+"\\s*("+fe.join("|")+")\\s*"+a+")"})).join("|");return new RegExp("^\\s*(?:"+t+")\\s*$")};function ge(e){var t=e.children,n=e.className,r=e.metastring,o=e.title,l=(0,c.LU)().prism,s=(0,a.useState)(!1),u=s[0],d=s[1],p=(0,a.useState)(!1),f=p[0],y=p[1];(0,a.useEffect)((function(){y(!0)}),[]);var g=(0,c.bc)(r)||o,v=(0,a.useRef)(null),b=[],k=oe(),E=Array.isArray(t)?t.join(""):t;if(r&&me.test(r)){var Z=r.match(me)[1];b=ne()(Z).filter((function(e){return e>0}))}var C=null==n?void 0:n.replace(/language-/,"");!C&&l.defaultLanguage&&(C=l.defaultLanguage);var N=E.replace(/\n$/,"");if(0===b.length&&void 0!==C){for(var _,T="",S=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return ye(["js","jsBlock"]);case"jsx":case"tsx":return ye(["js","jsBlock","jsx"]);case"html":return ye(["js","jsBlock","html"]);case"python":case"py":return ye(["python"]);default:return ye()}}(C),x=E.replace(/\n$/,"").split("\n"),I=0;I<x.length;){var j=I+1,P=x[I].match(S);if(null!==P){switch(P.slice(1).reduce((function(e,t){return e||t}),void 0)){case"highlight-next-line":T+=j+",";break;case"highlight-start":_=j;break;case"highlight-end":T+=_+"-"+(j-1)+","}x.splice(I,1)}else I+=1}b=ne()(T),N=x.join("\n")}var B=function(){!function(e,t){var n=(void 0===t?{}:t).target,a=void 0===n?document.body:n,r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";var l=document.getSelection(),i=!1;l.rangeCount>0&&(i=l.getRangeAt(0)),a.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;var c=!1;try{c=document.execCommand("copy")}catch(s){}r.remove(),i&&(l.removeAllRanges(),l.addRange(i)),o&&o.focus()}(N),d(!0),setTimeout((function(){return d(!1)}),2e3)};return a.createElement(ee,(0,m.Z)({},Y,{key:String(f),theme:k,code:N,language:C}),(function(e){var t=e.className,n=e.style,r=e.tokens,o=e.getLineProps,l=e.getTokenProps;return a.createElement("div",{className:le},g&&a.createElement("div",{style:n,className:ce},g),a.createElement("div",{className:(0,i.Z)(ie,C)},a.createElement("pre",{tabIndex:0,className:(0,i.Z)(t,se,"thin-scrollbar"),style:n},a.createElement("code",{className:de},r.map((function(e,t){1===e.length&&""===e[0].content&&(e[0].content="\n");var n=o({line:e,key:t});return b.includes(t+1)&&(n.className+=" docusaurus-highlight-code-line"),a.createElement("span",(0,m.Z)({key:t},n),e.map((function(e,t){return a.createElement("span",(0,m.Z)({key:t},l({token:e,key:t})))})))})))),a.createElement("button",{ref:v,type:"button","aria-label":(0,h.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,i.Z)(ue,"clean-btn"),onClick:B},u?a.createElement(h.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):a.createElement(h.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}var ve=n(6159),be="details_1VDD";function ke(e){var t=Object.assign({},e);return a.createElement(c.PO,(0,m.Z)({},t,{className:(0,i.Z)("alert alert--info",be,t.className)}))}var Ee=["mdxType","originalType"];var Ze={head:function(e){var t=a.Children.map(e.children,(function(e){return function(e){var t,n;if(null!=e&&null!=(t=e.props)&&t.mdxType&&null!=e&&null!=(n=e.props)&&n.originalType){var r=e.props,o=(r.mdxType,r.originalType,(0,f.Z)(r,Ee));return a.createElement(e.props.originalType,o)}return e}(e)}));return a.createElement(U.Z,e,t)},code:function(e){var t=e.children;return(0,a.isValidElement)(t)?t:t.includes("\n")?a.createElement(ge,e):a.createElement("code",e)},a:function(e){return a.createElement(y.Z,e)},pre:function(e){var t,n=e.children;return(0,a.isValidElement)(n)&&(0,a.isValidElement)(null==n||null==(t=n.props)?void 0:t.children)?n.props.children:a.createElement(ge,(0,a.isValidElement)(n)?null==n?void 0:n.props:Object.assign({},e))},details:function(e){var t=a.Children.toArray(e.children),n=t.find((function(e){var t;return"summary"===(null==e||null==(t=e.props)?void 0:t.mdxType)})),r=a.createElement(a.Fragment,null,t.filter((function(e){return e!==n})));return a.createElement(ke,(0,m.Z)({},e,{summary:n}),r)},h1:(0,ve.Z)("h1"),h2:(0,ve.Z)("h2"),h3:(0,ve.Z)("h3"),h4:(0,ve.Z)("h4"),h5:(0,ve.Z)("h5"),h6:(0,ve.Z)("h6")},Ce=n(4608),Ne=n(5977),_e="backToTopButton_35hR",Te="backToTopButtonShow_18ls";function Se(){var e=(0,a.useRef)(null);return{smoothScrollTop:function(){var t;e.current=(t=null,function e(){var n=document.documentElement.scrollTop;n>0&&(t=requestAnimationFrame(e),window.scrollTo(0,Math.floor(.85*n)))}(),function(){return t&&cancelAnimationFrame(t)})},cancelScrollToTop:function(){return null==e.current?void 0:e.current()}}}var xe=function(){var e,t=(0,Ne.TH)(),n=Se(),r=n.smoothScrollTop,o=n.cancelScrollToTop,l=(0,a.useState)(!1),c=l[0],s=l[1];return(0,u.Z)((function(e,t){var n=e.scrollY;if(t){var a=n<t.scrollY;if(a||o(),n<300)s(!1);else if(a){var r=document.documentElement.scrollHeight;n+window.innerHeight<r&&s(!0)}else s(!1)}}),[t]),a.createElement("button",{className:(0,i.Z)("clean-btn",_e,(e={},e[Te]=c,e)),type:"button",onClick:function(){return r()}},a.createElement("svg",{viewBox:"0 0 24 24",width:"28"},a.createElement("path",{d:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",fill:"currentColor"})))},Ie={docPage:"docPage_31aa",docMainContainer:"docMainContainer_3ufF",docSidebarContainer:"docSidebarContainer_3Kbt",docMainContainerEnhanced:"docMainContainerEnhanced_3NYZ",docSidebarContainerHidden:"docSidebarContainerHidden_3pA8",collapsedDocSidebar:"collapsedDocSidebar_2JMH",expandSidebarButtonIcon:"expandSidebarButtonIcon_1naQ",docItemWrapperEnhanced:"docItemWrapperEnhanced_2vyJ"};function je(e){var t,n,o,s=e.currentDocRoute,u=e.versionMetadata,d=e.children,m=u.pluginId,f=u.version,y=s.sidebar,g=y?u.docsSidebars[y]:void 0,v=(0,a.useState)(!1),b=v[0],k=v[1],E=(0,a.useState)(!1),Z=E[0],C=E[1],N=(0,a.useCallback)((function(){Z&&C(!1),k(!b)}),[Z]);return a.createElement(l.Z,{wrapperClassName:c.kM.wrapper.docsPages,pageClassName:c.kM.page.docsDocPage,searchMetadatas:{version:f,tag:(0,c.os)(m,f)}},a.createElement("div",{className:Ie.docPage},a.createElement(xe,null),g&&a.createElement("aside",{className:(0,i.Z)(Ie.docSidebarContainer,(t={},t[Ie.docSidebarContainerHidden]=b,t)),onTransitionEnd:function(e){e.currentTarget.classList.contains(Ie.docSidebarContainer)&&b&&C(!0)}},a.createElement(z,{key:y,sidebar:g,path:s.path,onCollapse:N,isHidden:Z}),Z&&a.createElement("div",{className:Ie.collapsedDocSidebar,title:(0,h.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,h.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:N,onClick:N},a.createElement(p,{className:Ie.expandSidebarButtonIcon}))),a.createElement("main",{className:(0,i.Z)(Ie.docMainContainer,(n={},n[Ie.docMainContainerEnhanced]=b||!g,n))},a.createElement("div",{className:(0,i.Z)("container padding-top--md padding-bottom--lg",Ie.docItemWrapper,(o={},o[Ie.docItemWrapperEnhanced]=b,o))},a.createElement(r.Zo,{components:Ze},d)))))}var Pe=function(e){var t=e.route.routes,n=e.versionMetadata,r=e.location,l=t.find((function(e){return(0,Ne.LX)(r.pathname,e)}));return l?a.createElement(a.Fragment,null,a.createElement(U.Z,null,a.createElement("html",{className:n.className})),a.createElement(je,{currentDocRoute:l,versionMetadata:n},(0,o.Z)(t,{versionMetadata:n}))):a.createElement(Ce.default,e)}},6159:function(e,t,n){"use strict";n.d(t,{N:function(){return m},Z:function(){return p}});var a=n(3366),r=n(7462),o=n(7294),l=n(6010),i=n(4973),c=n(941),s="anchorWithStickyNavbar_31ik",u="anchorWithHideOnScrollNavbar_3R7-",d=["id"],m=function(e){var t=Object.assign({},e);return o.createElement("header",null,o.createElement("h1",(0,r.Z)({},t,{id:void 0}),t.children))},p=function(e){return"h1"===e?m:(t=e,function(e){var n,r=e.id,m=(0,a.Z)(e,d),p=(0,c.LU)().navbar.hideOnScroll;return r?o.createElement(t,m,o.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,l.Z)("anchor","anchor__"+t,(n={},n[u]=p,n[s]=!p,n)),id:r}),m.children,o.createElement("a",{className:"hash-link",href:"#"+r,title:(0,i.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):o.createElement(t,m)});var t}},4608:function(e,t,n){"use strict";n.r(t);var a=n(7294),r=n(308),o=n(4973);t.default=function(){return a.createElement(r.Z,{title:(0,o.I)({id:"theme.NotFound.title",message:"Page Not Found"})},a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(o.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(o.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(o.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}},7594:function(e,t){function n(e){let t,n=[];for(let a of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(a))n.push(parseInt(a,10));else if(t=a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,a,r,o]=t;if(a&&o){a=parseInt(a),o=parseInt(o);const e=a<o?1:-1;"-"!==r&&".."!==r&&"\u2025"!==r||(o+=e);for(let t=a;t!==o;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);