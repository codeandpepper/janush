"use strict";(self.webpackChunkjanush=self.webpackChunkjanush||[]).push([[663],{6668:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return d},default:function(){return u}});var a=n(7462),r=n(3366),s=(n(7294),n(3905)),i=["components"],o={sidebar_position:1,title:"Getting Started"},l="Getting Started",p={unversionedId:"getting-started/getting-started",id:"getting-started/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"Clone repository",source:"@site/docs/getting-started/getting-started.md",sourceDirName:"getting-started",slug:"/getting-started/getting-started",permalink:"/docs/getting-started/getting-started",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/getting-started/getting-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Getting Started"},sidebar:"tutorialSidebar",next:{title:"Folder Structure",permalink:"/docs/getting-started/folder-structure"}},d=[{value:"Clone repository",id:"clone-repository",children:[]},{value:"Cloud",id:"cloud",children:[]},{value:"Web",id:"web",children:[]}],c={toc:d};function u(e){var t=e.components,n=(0,r.Z)(e,i);return(0,s.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"getting-started"},"Getting Started"),(0,s.kt)("h2",{id:"clone-repository"},"Clone repository"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"git clone https://github.com/codeandpepper/janush\ncd janush\n")),(0,s.kt)("h2",{id:"cloud"},"Cloud"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"Cloud")," is infrastructure and backend code. It uses ",(0,s.kt)("a",{parentName:"p",href:"https://aws.amazon.com/serverless/"},"AWS (Amazon Web Services) serverless computing"),". We are using IaC (Infrastructure as Code) approach using ",(0,s.kt)("a",{parentName:"p",href:"https://aws.amazon.com/cdk/"},"AWS CDK (Cloud Development Kit)"),", where we define cloud services using TypeScript. We need to deploy it to AWS before we can use our web application."),(0,s.kt)("p",null,"Install npm dependencies"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"cd cloud\nnpm install\n")),(0,s.kt)("p",null,"bootstrap CDK"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"cdk bootstrap\n")),(0,s.kt)("p",null,"deploy to AWS"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"cdk deploy\n")),(0,s.kt)("p",null,"set environment variables needed by web application"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"bash ./scripts/setEnvs.bash\n")),(0,s.kt)("h2",{id:"web"},"Web"),(0,s.kt)("p",null,"Web is React web application, based on ",(0,s.kt)("a",{parentName:"p",href:"https://create-react-app.dev/"},"Create React App")," TypeScript template."),(0,s.kt)("p",null,"Install npm dependencies"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"cd web\nnpm install\n")),(0,s.kt)("p",null,"run the app"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"npm start\n")))}u.isMDXComponent=!0}}]);