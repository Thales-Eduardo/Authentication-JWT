import { createConnections } from 'typeorm';
createConnections()
  .then(() => console.log('connected!🆗🎉'))
  .catch(console.log);
