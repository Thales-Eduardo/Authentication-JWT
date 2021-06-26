# Cadastro de usuários

- **Cadastro:** Ao se cadastra o usuário recebera um email notificando o sucesso.

- **Autenticação:** A autenticação foi feita com jwt.

- **Recuperar senha:** Token gerado pela aplicação, enviado em um link no email do usuário, esse link expira em 1h.

- **Buscar usuários:** Para isso a usuário deve estar autenticado na aplicação.

- **Atualizar perfil:** Para atualizar as informações do perfil o usuário deve estar autenticado.

- **Deletar perfil:** Para deletar perfil o usuário deve apenas estar autenticado.

---

# Cadastro.

![Cadastro](./docs/mailCadastro.png)

# Recuperar senha.

![RecuperarSenha](./docs/mailRec.png)

# Token gerado para recuperar senha.

![token](./docs/token.png)
