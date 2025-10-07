import {DatabaseService} from "../database/database.service";
import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);
  constructor(private db: DatabaseService) {
  }

  async run(): Promise<void> {
    await this.db.query(`CREATE TABLE IF NOT EXISTS migrations (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`);
    const migrations = [
      'create_users_table',
      'create_balance_action_enum',
      'create_balance_history_table',
      /* *************************** */
      'fill_users_table',
    ];
    
    const current = await this.db.query('SELECT * FROM migrations');
    const rowNames = current.rows.map(r => r.name);
    for (const migration of migrations) {
      if (!rowNames.includes(migration)) {
        const sql = require(`./migrations/${migration}`);
        this.logger.log(sql.default);
        await this.db.query(sql.default);
        await this.addMigration(migration);
      }
    }
  }

  private async addMigration(name: string): Promise<void> {
    await this.db.query(`INSERT INTO migrations(name) VALUES($1)`, [name]);
  }
}