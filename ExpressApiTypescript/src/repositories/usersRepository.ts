import User, { IUser } from '../domain/entities/user';
import { v4 } from 'uuid';

export default class UsersRepository {
  constructor() {}

  async list(): Promise<IUser[]> {
    return await User.find().exec();
  }

  async find(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async save(user: IUser): Promise<IUser> {
    user._id = v4();
    console.log(`Saving user ${user.id}`);
    return await user.save();
  }

  async update(user: IUser): Promise<IUser | null> {
    console.log(`Updating user ${user._id}`);
    return await User.findOneAndUpdate({ _id: user._id }, user);
  }

  async delete(id: string): Promise<void> {
    console.log(`Deleting user ${id}`);
    await User.deleteOne({
      _id: id,
    });
  }
}
