# Criar Usuário.

- POST

- URL ` http://localhost:3333/users/profile`

- Tirando a propriedade `surname`, todas as propriedades são obrigatórias.

Request =>

```json
{
  "name": "thales",
  "surname": "Eduardo",
  "email": "thalesdev22@gmail.com",
  "password": "123456"
}
```

Response =>

```json

```

---

# Login.

- POST

- URL ` http://localhost:3333/users/sessions`

- Todas as propriedades são obrigatórias.

Request =>

```json
{
  "email": "thalesdev22@gmail.com",
  "password": "123456"
}
```

Response =>

```json

```

---

# Listar todos os usuários.

- GET => Rota privada `token`

- URL ` http://localhost:3333/users/sessions`

Response =>

```json

```

---

# Deletar usuário.

- DELETE => Rota privada `token`

- URL ` http://localhost:3333/users/delete_profile`

Response =>

Status.code 200

---

# Atualizar dados do usuário.

- PUT => Rota privada `token`

- URL ` http://localhost:3333/users/updating`

- Tirando a propriedade `surname`, todas as propriedades são obrigatórias.

Request =>

```json
{
  "name": "thales",
  "surname": "Eduardo",
  "email": "thalesdev22@gmail.com",
  "old_Password": "123456",
  "newPassword": "123456",
  "password_confirmation": "123456"
}
```

Response =>

```json

```

---

# Atualizar ou Adicionar foto do usuário.

- PATCH => Rota privada `token`

- URL ` http://localhost:3333/users/avatar`

Request =>

```js
if (event.target.files) {
  const data = new FormData();
  data.append('avatar', event.target.files[0]);
  axios.patch('/users/avatar', data).then(res => {
    const { user } = res.data;
    console.log(user);
  });
}
```

Response =>

```json

```

---

# Recuperar Senha.

- POST

- URL ` http://localhost:3333/password/forgot`

- Todas as propriedades são obrigatórias.

- Um e-mail sera enviado com um link para alterar a senha.

Request =>

```json
{
  "email": "thalesdev22@gmail.com"
}
```

Response =>

```json

```

---

# Alterar Senha.

- POST

- URL ` http://localhost:3333/password/reset`

- Todas as propriedades são obrigatórias.

Request =>

```json
{
  "token": "token enviado no email que sera um uuid",
  "password": "123456",
  "password_confirmation": "123456"
}
```

Response =>

```json

```
