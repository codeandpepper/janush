const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "Janush",
    tagline:
      "Set up a modern codebase for cloud-native web app with authentication features by running one command",
    url: "https://janush.dev",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "codeandpepper", // Usually your GitHub org/user name.
    projectName: "janush", // Usually your repo name.
    trailingSlash: false,

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl: "https://github.com/facebook/docusaurus/edit/main/website/",
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            editUrl: "https://github.com/facebook/docusaurus/edit/main/website/blog/",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      {
        colorMode: {
          defaultMode: "dark",
          disableSwitch: true,
        },
        navbar: {
          title: "Janush",
          // logo: {
          //   alt: "Janush logo",
          //   src: "img/logo.svg",
          // },
          items: [
            {
              type: "doc",
              docId: "intro",
              position: "right",
              label: "Docs",
            },
            {
              href: "https://janush.app",
              label: "Demo",
              position: "right",
            },
            {
              href: "https://github.com/codeandpepper/janush",
              label: "GitHub",
              position: "right",
              className: "header-github-link",
            },
          ],
        },
        footer: {
          style: "dark",
          // links: [
          //   {
          //     title: "Docs",
          //     items: [
          //       {
          //         label: "Tutorial",
          //         to: "/docs/intro",
          //       },
          //     ],
          //   },
          //   {
          //     title: "Community",
          //     items: [
          //       {
          //         label: "Twitter",
          //         href: "https://twitter.com/codeandpepper",
          //       },
          //     ],
          //   },
          //   {
          //     title: "More",
          //     items: [
          //       {
          //         label: "Blog",
          //         to: "/blog",
          //       },
          //       {
          //         label: "GitHub",
          //         href: "https://github.com/codeandpepper/janush",
          //       },
          //     ],
          //   },
          // ],
          copyright: `Copyright © ${new Date().getFullYear()} Code & Pepper`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      },
  }
);
