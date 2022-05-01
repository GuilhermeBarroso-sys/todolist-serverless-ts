/** USERS */
import { createUser as createUserExport } from './src/modules/users/functions/createUser';
import { findUser as findUserExport } from './src/modules/users/functions/findUser';
import {  findAuthenticateUser as findAuthenticateUserExport } from './src/modules/users/functions/findAuthenticateUser';

import { findAllUsers as findAllUsersExport } from './src/modules/users/functions/findAllUsers';
import { authenticateUser as authenticateUserExport } from './src/modules/users/functions/authenticateUser';
import { authorizerUser as authorizerUserExport } from './src/modules/users/functions/authorizerUser';
/** TASKS */
import { createTask as createTaskExport } from './src/modules/tasks/functions/createTask';
import { findAllUsersTasks as findAllUsersTasksExport } from './src/modules/tasks/functions/findAllUserTasks';
import { updateTask as updateTaskExport } from './src/modules/tasks/functions/updateTask';
import { deleteTask  as deleteTaskExport} from './src/modules/tasks/functions/deleteTask';
import { findByTaskStatus as findByTaskStatusExport } from './src/modules/tasks/functions/findByTaskStatus';
import middy from 'middy';
import {cors} from 'middy/middlewares';

export const createUser = middy(createUserExport).use(cors());
export const findUser = middy(findUserExport).use(cors());
export const findAuthenticateUser = middy(findAuthenticateUserExport).use(cors());
export const findAllUsers = middy(findAllUsersExport).use(cors());
export const authenticateUser = middy(authenticateUserExport).use(cors());
export const authorizerUser = middy(authorizerUserExport).use(cors());
export const createTask = middy(createTaskExport).use(cors());
export const findAllUsersTasks = middy(findAllUsersTasksExport).use(cors());
export const updateTask = middy(updateTaskExport).use(cors());
export const deleteTask = middy(deleteTaskExport).use(cors());
export const findByTaskStatus = middy(findByTaskStatusExport).use(cors());





