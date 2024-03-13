import { PartialType } from '@nestjs/mapped-types';
import { CreateWinerDto } from './create-winer.dto';

export class UpdateWinerDto extends PartialType(CreateWinerDto) {}
