import colors from "vuetify/es5/util/colors";
export default {
  server: {
    port: process.env.PORT || 8000, // default: 3000
    host: "0.0.0.0", // default: localhost,
    timing: false
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: true,
  /*
   **  backend server is working on a same port (3000),client and server both should have different port
   **  Changed client port 8000 to make sure it connects with backend on port 3000 by default
   */

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */ target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loadingIndicator: {
    name: "circle"
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["@/plugins/globalFunctions"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/pwa"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],
  pwa: {
    icon: "./static/pooh.png",
    purpose: "maskable",
    manifest: {
      name: "EMS",
      lang: "en",
      theme_color: "indigo darken-2",
      author: "prmy",
      useWebmanifestExtension: false
    }
    // workbox: {
    //   dev: false // or use a global variable to track the current NODE_ENV, etc to determine dev mode
    // }
  },
  // modules: ["nuxt-material-design-icons"],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    defaultAssets: {
      font: true,
      icons: "md"
    },
    icons: {
      iconfont: "md"
    },
    customVariables: ["~/assets/variables.scss"],
    theme: {}
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
};
