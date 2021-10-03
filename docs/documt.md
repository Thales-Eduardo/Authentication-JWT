# Criar Usuário.

- POST

- URL ` http://localhost:3333/users`

- Todas as propriedades são obrigatórias.

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
{
  "name": "thales",
  "surname": "Eduardo",
  "email": "thalesdev22@gmail.com",
  "id": "88edea1f-3f01-48b8-aa9a-6b8717db10db",
  "created_at": "2021-09-14T17:07:13.442Z",
  "updated_at": "2021-09-14T17:07:13.442Z",
  "avatarUrl": null
}
```

---

# Login.

- POST

- URL ` http://localhost:3333/sessions`

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
{
  "user": {
    "id": "88edea1f-3f01-48b8-aa9a-6b8717db10db",
    "name": "thales",
    "surname": "Eduardo",
    "email": "thalesdev22@gmail.com",
    "avatar": null,
    "created_at": "2021-09-14T17:07:13.442Z",
    "updated_at": "2021-09-14T17:07:13.442Z",
    "avatarUrl": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzE2MzkzMzUsImV4cCI6MTYzMTcyNTczNSwic3ViIjoiODhlZGVhMWYtM2YwMS00OGI4LWFhOWEtNmI4NzE3ZGIxMGRiIn0.QxD29zaV6AFZpT8ojST4VXq-ixRUOzFvrW7STWluc4A"
}
```

---

# Listar todos os usuários.

- GET => Rota privada `token`

- URL `http://localhost:3333/users/profile`

Response =>

```json
[
  {
    "id": "fadb9b95-076a-4292-a28e-edf26acff04d",
    "name": "thales",
    "surname": "Eduardo",
    "email": "thalesdev@gmail.com",
    "avatar": null,
    "created_at": "2021-09-14T17:07:08.296Z",
    "updated_at": "2021-09-14T17:07:08.296Z",
    "avatarUrl": null
  },
  {
    "id": "88edea1f-3f01-48b8-aa9a-6b8717db10db",
    "name": "Thales",
    "surname": "Eduardo",
    "email": "thalesdev22@gmail.com",
    "avatar": "bfc28266700616246508-21-215651_madara-uchiha-wallpaper-4k.jpg",
    "created_at": "2021-09-14T17:07:13.442Z",
    "updated_at": "2021-09-14T17:09:45.185Z",
    "avatarUrl": "http://localhost:3000/files/bfc28266700616246508-21-215651_madara-uchiha-wallpaper-4k.jpg"
  }
]
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

- Todas as propriedades são obrigatórias.

Request =>

```json
{
  "name": "Thales",
  "surname": "Eduardo",
  "email": "thalesdev22@gmail.com",
  "old_Password": "123456",
  "newPassword": "123456",
  "password_confirmation": "123456"
}
```

Response =>

```json
{
  "id": "88edea1f-3f01-48b8-aa9a-6b8717db10db",
  "name": "Thales",
  "surname": "Eduardo",
  "email": "thalesdev22@gmail.com",
  "avatar": null,
  "created_at": "2021-09-14T17:07:13.442Z",
  "updated_at": "2021-09-14T17:09:19.319Z",
  "avatarUrl": null
}
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
{
  "id": "88edea1f-3f01-48b8-aa9a-6b8717db10db",
  "name": "Thales",
  "surname": "Eduardo",
  "email": "thalesdev22@gmail.com",
  "avatar": "bfc28266700616246508-21-215651_madara-uchiha-wallpaper-4k.jpg",
  "created_at": "2021-09-14T17:07:13.442Z",
  "updated_at": "2021-09-14T17:09:45.185Z",
  "avatarUrl": "http://localhost:3000/files/bfc28266700616246508-21-215651_madara-uchiha-wallpaper-4k.jpg"
}
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

Status code 204

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

Status code 204
junto com um email enviado.

- Em localhost o link para ter acesso ao e-mail com o link para trocar a senha fica dentro do log no contêiner node.
