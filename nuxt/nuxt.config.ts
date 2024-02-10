const { gitDescribe, gitDescribeSync } = require("git-describe");

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  ssr: false,
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      urlBase: {
        front:
          process.env.NODE_ENV == "production"
            ? "https://gather.radison.io"
            : "http://localhost:3000",
        back:
          process.env.NODE_ENV == "production"
            ? "https://api.gather.radison.io"
            : "http://localhost:8787",
      },
      meta: {
        title: "Gather",
        desc: "Empowers friend groups to coordinate meetups and experience Chicago-wide events",
        url: "https://gather.radison.io",
        favicon:
          "https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/cbeec7ce-7b51-4cc2-81bb-e72289777900/sm",
        img: "https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/9036aeb5-ffa0-49ef-f5e3-3d40ac6d3800/md",
      },
      auth0: {
        domain: "rakerman.us.auth0.com",
        client_id:
          process.env.NODE_ENV == "production"
            ? "khPGZMLGaERG1xGRncMBkW4Y5pLrFBMy"
            : "RCVEiy1ybAm6XOrD0cxG2U486q5kHoqw",
        redirect_url: "/groups",
      },
      gitMasterTag: gitDescribeSync().hash,
      version: "1.0.0",
    },
  },
});