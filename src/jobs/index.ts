import Bull from 'bull';

import redisConfig from '../config/redis';

//jobs
import emailRegister from './emailRegister';
import emailForgotPassword from './emailForgotPassword';

//rows
export const mailRegister = new Bull(emailRegister.key, {
  redis: redisConfig,
  defaultJobOptions: { delay: 10, attempts: 3 },
});
export const mailForgotPassword = new Bull(emailForgotPassword.key, {
  redis: redisConfig,
  defaultJobOptions: { delay: 10, attempts: 3 },
});

//inspect errors
mailRegister.on('failed', (job, err) => {
  console.log('Error - mailRegister', job.name, job.data, err);
});
mailForgotPassword.on('failed', (job, err) => {
  console.log('Error - mailForgotPassword', job.name, job.data, err);
});

//shot
mailRegister.process(emailRegister.handle);
mailForgotPassword.process(emailForgotPassword.handle);
