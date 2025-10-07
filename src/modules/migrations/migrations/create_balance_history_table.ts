export default `CREATE TABLE balance_history (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  action balance_action NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`;