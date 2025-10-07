import { HistoryEntity } from '@shared/entities/history.entity';
import { UserEntity } from '@shared/entities/user.entity';
import { IFullResponse } from './types';

export class HistoryResponseDto extends HistoryEntity {  
}

export class UserResponseDto extends UserEntity {

}

export class UserFullResponseDto extends UserEntity implements IFullResponse {
  histories: HistoryEntity[];
}