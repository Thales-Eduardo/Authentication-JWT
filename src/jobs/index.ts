import Bull from 'bull';

import redisConfig from '../config/redis';

//jobs
import emailRegister from './emailRegister';
import emailForgotPassword from './emailForgotPassword';

//rows
export const mailRegister = new Bull(emailRegister.key, {
  redis: redisConfig,
});
export const mailForgotPassword = new Bull(emailForgotPassword.key, {
  redis: redisConfig,
});

//inspect errors
mailRegister.on('failed', (job, err) => {
  console.log('job failed', job.name, job.data);
  console.log(err);
});
mailForgotPassword.on('failed', (job, err) => {
  console.log('job failed', job.name, job.data);
  console.log(err);
});

//shot
mailRegister.process(emailRegister.handle);
mailForgotPassword.process(emailForgotPassword.handle);
