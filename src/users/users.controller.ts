import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PersonDatabase } from './interfaces/person.interface';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getEveryBody(): PersonDatabase[] {
    return this.usersService.read();
  }

  @Get(':id')
  getOnePerson(@Param('id') id: string): PersonDatabase {
    return this.usersService.readById(parseInt(id));
  }

  // @Post()
  // addOnePerson(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Post()
  addOnePerson(@Body() person: PersonDatabase): string {
    this.usersService.create(person);
    return 'Person added to database with successfully';
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Put(':id')
  updatePerson(
    @Body() person: PersonDatabase,
    @Param('id') id: string,
  ): string {
    this.usersService.update(parseInt(id), person);
    return 'Person updated with succesfully';
  }

  @Delete(':id')
  deleteOnePerson(@Param('id') id: string): PersonDatabase[] {
    this.usersService.delete(parseInt(id));
    return this.usersService.read();
  }
}
