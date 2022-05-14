const allowInDev = process.env.NODE_ENV === 'development' ? 'off' : 'error';

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'airbnb', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        // Prettier
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                semi: true,
                trailingComma: 'es5',
                tabWidth: 4,
                printWidth: 110,
            },
        ],

        // Typescript
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',

        // Common
        quotes: ['warn', 'single', { avoidEscape: true }],
        camelcase: 'off',
        'no-void': 'off',
        'no-nested-ternary': 'off',
        'no-return-assign': 'off',
        'no-underscore-dangle': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'max-classes-per-file': 'off',
        'import/no-relative-packages': 'off',
        'import/no-named-default': 'off',
        'func-names': 'off',
        'no-restricted-globals': 'off',
        'lines-between-class-members': 'off',

        // React
        'react/no-this-in-sfc': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-filename-extension': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': 'off',

        // React lint bug fix
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],

        // allow debugger during development only
        'no-unused-vars': 'warn',
        'no-debugger': 'warn',
        'no-console': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
    },
};
