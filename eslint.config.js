import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettierConfig from "eslint-config-prettier";
import vueParser from "vue-eslint-parser";
import globals from "globals";

export default [
  // 1. Taranmayacak dosyalar ve klasörler
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".github/**",
      "coverage/**",
      "*.patch",
    ],
  },

  // 2. JS ve Vue önerilen kuralları
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  prettierConfig,

  // 3. Proje dili ve ortam tanımları
  {
    files: ["**/*.vue", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser, // fetch, setTimeout, Image, ResizeObserver vb. tüm tarayıcı API'lerini çözer
        ...globals.node, // process, __dirname vb. Node ortamını çözer
      },
    },
    rules: {
      // Bileşen kuralları esnetmesi
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off", // Opsiyonel prop'larda default zorunluluğunu kaldırır
      "vue/no-unused-components": "warn", // Kullanılmayan bileşeni hataya değil uyarıya düşürür

      // JavaScript kuralları esnetmesi
      "no-empty": ["error", { allowEmptyCatch: true }], // try-catch içindeki boş bloklara izin verir
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none", // catch(e) içindeki kullanılmayan hataları yoksayar
        },
      ],
    },
  },
];
