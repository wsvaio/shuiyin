// https://nuxt.com/docs/api/configuration/nuxt-config
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {},

  appConfig: {},

  vite: {
    vue: {},
    plugins: [ReactivityTransform()],
  },

  vue: {
    // defineModel: true,
    propsDestructure: true,

  },

  app: {
    head: {
      title: "水印",
      meta: [
        { name: "author", content: "wsvaio@qq.com" },
        {
          name: "description",
          content: "批量为图片添加个性化的水印",
        },
      ],
      link: [
      ],
      script: [

      ],
    },

    // PageTransitionEvent: { name: "page", mode: "out-in" },

    // layoutTransition: {
    // 	name: "page",
    // 	mode: "out-in" // 默认值
    // },
    // pageTransition: {
    // 	name: "page",
    // 	mode: "out-in" // 默认值
    // },

  },

  css: ["~/assets/css/main.less"],

  modules: ["@unocss/nuxt", "@vueuse/nuxt", "@pinia/nuxt", "@shuimo-design/shuimo-ui-nuxt"],
  // modules: ["@nuxtjs/stylelint-module", "@nuxtjs/eslint-module", "@unocss/nuxt", "@vueuse/nuxt", "@pinia/nuxt"],

  nitro: {
    imports: {
      dirs: ["~/server/utils"],
    },
  },

  // experimental: {
  // 	viewTransition: true,

  // }
});
