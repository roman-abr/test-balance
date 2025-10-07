export default `CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  balance NUMERIC(10, 2) NOT NULL DEFAULT 0
)`;