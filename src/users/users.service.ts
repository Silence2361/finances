import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { User } from './users.model';
import { ModelClass } from 'objection';
import { updateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcryptjs'
import { IUser } from './interfaces/user.interface';


@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: ModelClass<User>) {}


  async createUser(createUserDto: CreateUserDto): Promise <IUser>{
    const {email, password, role} = createUserDto
    const hashedPassword = await bcrypt.hash(password , 10)
    try {
      const user = await this.userModel.query().insert({
        email, 
        password: hashedPassword,
        role
      });
      return user as IUser
    } catch (e) {
      throw new BadRequestException('Failed to create user')      
    }
  }

  async findAll(): Promise<IUser[]>{
    const user =  await this.userModel.query();
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user as IUser[]
  }

  async findById(id: number): Promise<IUser> {
    const user = await this.userModel.query().findById(id);
    if(!user){
      throw new NotFoundException (`User with id ${id} not found`)
    }
    return user
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.query().findOne({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user as IUser;
  }

 

  async updateUser(id: number, updateUserDto: updateUserDto): Promise <IUser>{
    if(updateUserDto.password){
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }
    const user = await this.userModel.query().patchAndFetchById(id, updateUserDto)
    if(!user){
      throw new NotFoundException(`User with email ${id} not found`)
    }
    return user as IUser;
  }

  async deleteUser(id: number): Promise <void>{
    const user = await this.userModel.query().deleteById(id)
    if(user === 0){
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return console.log('User deleted successfully')
  }
}
