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
const corsConfig = {
	origin: process.env.NODE_ENV == 'production' ? 'https://todo.devgui.info' : '*'
};
export const createUser = middy(createUserExport).use(cors(corsConfig));
export const findUser = middy(findUserExport).use(cors(corsConfig));
export const findAuthenticateUser = middy(findAuthenticateUserExport).use(cors(corsConfig));
export const findAllUsers = middy(findAllUsersExport).use(cors(corsConfig));
export const authenticateUser = middy(authenticateUserExport).use(cors(corsConfig));
export const authorizerUser = middy(authorizerUserExport).use(cors(corsConfig));
export const createTask = middy(createTaskExport).use(cors(corsConfig));
export const findAllUsersTasks = middy(findAllUsersTasksExport).use(cors(corsConfig));
export const updateTask = middy(updateTaskExport).use(cors(corsConfig));
export const deleteTask = middy(deleteTaskExport).use(cors(corsConfig));
export const findByTaskStatus = middy(findByTaskStatusExport).use(cors(corsConfig));





