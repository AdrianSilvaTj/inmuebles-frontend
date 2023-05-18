import { User } from '@app/models/backend/user';
// Copia el contenido de User a UserResponse
export { User as UserResponse } from '@app/models/backend/user';

// Se utilizara para el request del login
export interface EmailPasswordCredentials{
  email : string;
  password : string;
}

// Para crear un nuevo usuario
export interface UserRequest extends User{
  password : string;
  password2 : string;
}

export type UserCreateRequest = Omit<UserRequest, 'token'>;
