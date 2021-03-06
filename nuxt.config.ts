export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'pl'
    },
    title: 'awesome-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ricky and morty awesome project' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  styleResources: {
    scss: ["@/assets/scss/*.scss"],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "~/plugins/localStorage.js", ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    "@nuxtjs/svg"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
  ],

  loading: {
    height: '5px',
    color: '#11B0C8'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'https://rickandmortyapi.com/api'
  },

  router: {
    middleware: [
        'root'
    ]
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: "awesome-project",
    },
    manifest: {
      name: "awesome-project",
      short_name: "awesome-project",
      lang: 'pl',
      theme_color: "#FFFFFF",
      background_color: "#FFFFFF",
      display: "fullscreen",
    },
  },

  apollo: {
    prefetch: true,
    clientConfigs: {
      default: {
        httpEndpoint: 'https://rickandmortyapi.com/graphql',
      }
    },
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
