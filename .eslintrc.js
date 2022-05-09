module.exports = {
    "env": {
        "browser": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "overrides": [
        {
          "files": [
              "src/**/*.js",
              "src/**/*.vue",
          ],
          "env": {
            "jest": false
          }
        }
      ],
    "rules": {
    }
}
