import { Injectable } from '@nestjs/common';
import { UserRepository } from '@shared/repos/user.repository';
import { HistoryRepository } from '@shared/repos/history.repository';
import { IFullResponse, IWithdrawParams } from './types';
import { HistoryEntity } from '@shared/entities/history.entity';
import { UserEntity } from '@shared/entities/user.entity';
import { ActionType } from '@shared/entities/types';

@Injectable()
export class UsersService {
  constructor(private repo: UserRepository, private historyRepo: HistoryRepository) {
  }

  async withdraw(params: IWithdrawParams): Promise<UserEntity> {
    const {userId, amount} = params;
    const result = await this.repo.withdraw(userId, amount);
    await this.historyRepo.create({
      amount,
      action: ActionType.Withdraw,
      // Not entity now
      ...{user_id: userId}
    });
    return result;
  }

  async getOne(userId: number): Promise<UserEntity> {
    return this.repo.findById(userId);
  }

  async getHistory(userId: number): Promise<HistoryEntity[]> {
    await this.getOne(userId);
    return this.historyRepo.findByUserId(userId);
  }

  async getFull(userId: number): Promise<IFullResponse> {
    const user = await this.getOne(userId);
    const histories = await this.getHistory(userId);
    return {...user, histories};
  }
}