const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const url = 'http://localhost:3333';

describe('Integration tests', () => {
  it('Create user.', async () => {
    const user = await axios.post(`${url}/users`, {
      name: 'thales',
      surname: 'Eduardo',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });
    const userData = user.data;
    expect(userData).toHaveProperty('id');
    expect(userData.name).toBe('thales');
    expect(userData.email).toBe('thalesdev22@gmail.com');
    const auth = await axios.post(`${url}/sessions`, {
      email: userData.email,
      password: '123456',
    });
    expect(auth.data).toHaveProperty('token');
    expect(auth.data.user.email).toBe('thalesdev22@gmail.com');
    await axios.delete(`${url}/users/delete_profile`, {
      headers: {
        Authorization: `Bearer ${auth.data.token}`,
      },
    });
  });

  it('list all users.', async () => {
    const user1 = await axios.post(`${url}/users`, {
      name: 'thales',
      surname: 'Eduardo',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });
    const auth1 = await axios.post(`${url}/sessions`, {
      email: user1.data.email,
      password: '123456',
    });
    const user2 = await axios.post(`${url}/users`, {
      name: 'thales',
      surname: 'Eduardo',
      email: 'thalesdev@gmail.com',
      password: '123456',
    });
    const auth2 = await axios.post(`${url}/sessions`, {
      email: user2.data.email,
      password: '123456',
    });
    const users = await axios.get(`${url}/users/profile`, {
      headers: {
        Authorization: `Bearer ${auth1.data.token}`,
      },
    });
    const usersData = users.data;
    expect(usersData).toHaveLength(2);
    await axios.delete(`${url}/users/delete_profile`, {
      headers: {
        Authorization: `Bearer ${auth1.data.token}`,
      },
    });
    await axios.delete(`${url}/users/delete_profile`, {
      headers: {
        Authorization: `Bearer ${auth2.data.token}`,
      },
    });
  });

  it('Update users data.', async () => {
    const user = await axios.post(`${url}/users`, {
      name: 'thales',
      surname: 'eduardo',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });
    const userData = user.data;
    const auth = await axios.post(`${url}/sessions`, {
      email: userData.email,
      password: '123456',
    });
    const update = await axios.put(
      `${url}/users/updating`,
      {
        name: 'Thales',
        surname: 'Eduardo',
        email: 'thalesdev22@gmail.com',
        old_Password: '123456',
        newPassword: '123456',
        password_confirmation: '123456',
      },
      {
        headers: {
          Authorization: `Bearer ${auth.data.token}`,
        },
      }
    );
    expect(update.data.name).toBe('Thales');
    expect(update.data.surname).toBe('Eduardo');
    await axios.delete(`${url}/users/delete_profile`, {
      headers: {
        Authorization: `Bearer ${auth.data.token}`,
      },
    });
  });

  it('Add avatar to users.', async () => {
    const user = await axios.post(`${url}/users`, {
      name: 'thales',
      surname: 'Eduardo',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });
    const userData = user.data;
    const auth = await axios.post(`${url}/sessions`, {
      email: userData.email,
      password: '123456',
    });

    const file = path.join(__dirname, '..', 'docs', 'docker.png');
    let data = new FormData();
    data.append('avatar', fs.createReadStream(file));

    const avatar = await axios
      .create({
        headers: data.getHeaders(),
      })
      .patch(`${url}/users/avatar`, data, {
        headers: {
          Authorization: `Bearer ${auth.data.token}`,
        },
      });

    expect(avatar.status).toBe(200);

    await axios.delete(`${url}/users/delete_profile`, {
      headers: {
        Authorization: `Bearer ${auth.data.token}`,
      },
    });
  });

  it('Sending email for password recovery.', async () => {
    const user = await axios.post(`${url}/users`, {
      name: 'thales',
      surname: 'Eduardo',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });
    const userData = user.data;
    const auth = await axios.post(`${url}/sessions`, {
      email: userData.email,
      password: '123456',
    });

    const forgot = await axios.post(`${url}/password/forgot`, {
      email: userData.email,
    });

    expect(forgot.status).toBe(204);

    await axios.delete(`${url}/users/delete_profile`, {
      headers: {
        Authorization: `Bearer ${auth.data.token}`,
      },
    });
  });

  it('Refresh token.', async () => {
    const user = await axios.post(`${url}/users`, {
      name: 'thales',
      surname: 'Eduardo',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });
    const userData = user.data;
    const auth = await axios.post(`${url}/sessions`, {
      email: userData.email,
      password: '123456',
    });

    const refreshToken = await axios.post(`${url}/users/refresh_token`, {
      id: auth.data.refreshToken.id,
    });

    expect(refreshToken.data).toHaveProperty('token');

    await axios.delete(`${url}/users/delete_profile`, {
      headers: {
        Authorization: `Bearer ${refreshToken.data.token}`,
      },
    });
  });
});
