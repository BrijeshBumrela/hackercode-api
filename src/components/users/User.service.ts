import User from './User.model';
import { IUserRegistration } from './User.types';

const addUser = async (user: IUserRegistration) => {
    const { email, name, password } = user;

    const newUser = new User();

    newUser.email = email;
    newUser.name = name;
    newUser.password = password;

    try {
        await newUser.save();
        return user;
    } catch (e) {
        throw new Error(e);
    }
};

export { addUser };
