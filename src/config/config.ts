export default {
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "index" },
    { path: "/home", component: "index" },
    { path: "/pay", component: "index" },
    { path: "/login", component: "index" },
  ],
  npmClient: "pnpm",
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: "umi_with_dva_test",
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  antd: {
    // configProvider
    configProvider: {},
    // themes
    dark: true,
    compact: true,
    // babel-plugin-import
    import: true,
    // less or css, default less
    style: "less",
    // shortcut of `configProvider.theme`
    // use to configure theme token, antd v5 only
    theme: {},
    // antd <App /> valid for version 5.1.0 or higher, default: undefined
    appConfig: {},
    // Transform DayJS to MomentJS
    momentPicker: true,
    // Add StyleProvider for legacy browsers
    styleProvider: {
      hashPriority: "high",
      legacyTransformer: true,
    },
  },
};
