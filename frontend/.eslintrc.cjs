module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        'cypress/globals': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:cypress/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react', 'react-hooks', 'react-refresh', 'cypress'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        semi: ['warn', 'always'], // Enforces semicolons at the end of statements
        eqeqeq: ['warn', 'always'], // Enforces the use of === and !==
        curly: 'error', // Enforces consistent brace style for all control statements
        'no-console': 'warn', // Warns on console.log usage
        'no-debugger': 'error', // Disallows the use of debugger
        'default-case': 'error', // Requires default case in switch statements
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'react/prop-types': 'off', // Turn off prop-types as we assume a TypeScript environment
        'no-unused-vars': 'warn', // Warns on unused variables
        'no-constant-condition': 'warn', // Warns on constant conditions
        'react/display-name': 'off', // Turn off displayName
        'no-undef': 'error', // Disallows use of undeclared variables
    },
};
