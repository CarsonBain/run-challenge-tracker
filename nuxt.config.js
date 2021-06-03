export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'run-tracker',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  env: {
    baseURL: process.env.NODE_ENV !== "production" ? 'http://localhost:3000' : 'https://www.run-tracker.vercel.app'
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://localhost:3000', 
  },
  
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  serverMiddleware: [
    {
      path: 'api/v1',
      handler: '~/api/v1/index.js',
    },
  ],
}
