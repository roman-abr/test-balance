import { HistoryEntity } from '@shared/entities/history.entity';
import { UserEntity } from '@shared/entities/user.entity';

export interface IWithdrawParams {
  userId: number;
  amount: number;
}

export interface IFullResponse extends UserEntity {
  histories: HistoryEntity[];
}