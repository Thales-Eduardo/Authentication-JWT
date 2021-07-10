# Cadastro de usuários

- **Cadastro:** Ao se cadastra o usuário recebera um email notificando o sucesso.

- **Autenticação:** A autenticação foi feita com jwt.

- **Recuperar senha:** Token gerado pela aplicação, enviado em um link no email do usuário, esse link expira em 1h.

- **Buscar usuários:** Para isso a usuário deve estar autenticado na aplicação.

- **Atualizar perfil:** Para atualizar as informações do perfil o usuário deve estar autenticado.

- **Deletar perfil:** Para deletar perfil o usuário deve apenas estar autenticado.

- **Notificação com o mongodb:** Quando o usuário criar conta e trocar a senha, recebera uma notificação sobre.

---

# Cadastro.

![Cadastro](./docs/mailCadastro.png)

# Recuperar senha.

![RecuperarSenha](./docs/mailRec.png)

# Token gerado para recuperar senha.

![token](./docs/token.png)

# Dependências.

bcryptjs, celebrate, cors, date-fns, dotenv, express, express-async-errors,
handlebars, jsonwebtoken, mongodb, multer, nodemailer, pg, reflect-metadata.

# Build

```bash
yarn add -D babel-plugin-transform-typescript-metadata @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

```bash
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver

```

```js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@modules': './src/modules',
          '@config': './src/config',
          '@shared': './src/shared',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
```

