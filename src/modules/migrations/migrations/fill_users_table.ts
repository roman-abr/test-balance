const users = [{
  balance: 15000
}];

export default `INSERT INTO users(balance) VALUES ${users.map(u => `(${u.balance})`).join(',')}`;