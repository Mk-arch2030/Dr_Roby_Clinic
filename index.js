const Fastify = require('fastify');
const { createPostgresPool } = require('./backend/config/postgres');
const { PatientRepository } = require('./backend/persistence/patient-repository');
const { patientRoutes } = require('./backend/api/routes/patient-routes');

const app = Fastify();

const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || '0.0.0.0';

const dbPool = createPostgresPool();
const patientRepository = new PatientRepository(dbPool);

app.decorate('dbPool', dbPool);
app.decorate('patientRepository', patientRepository);

app.register(patientRoutes);

app.listen({ port: PORT, host: HOST })
  .then(() => {
    console.log(`SERVER_STARTED = PASS`);
    console.log(`SERVER_HOST = ${HOST}`);
    console.log(`SERVER_PORT = ${PORT}`);
  })
  .catch((error) => {
    console.error('SERVER_STARTED = FAIL');
    console.error(error);
    process.exit(1);
  });
