import { bodyParams, formatJSONResponse, isInvalidParam, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import schema from "./schema";
import { UserRepository } from "../../repositories/implements/UserRepository";
import {compare} from 'bcryptjs';
import { sign } from "jsonwebtoken";
const authenticateUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const {email,password} = bodyParams(event.body, ['email', 'password']);
		if(isInvalidParam([email,password])) {
			throw new Error("invalid param value!");
		}
		const userRepository = new UserRepository();
		const userExists = await userRepository.findByEmail(email);
		if(!userExists){ 
			return formatJSONResponse("This email doesn't exist!", 404);
		}
		const user = userExists;
		const correctPassword = await compare(password, user.password);
		if(!correctPassword) {
			return formatJSONResponse("Invalid password!", 403);
		}
		const token = sign(user, process.env.jwt_secret, { subject: user.id });
		delete user.password;
		return formatJSONResponse({user,token}, 404);
		
	} catch(err) {
		return formatJSONResponse({err: err.message}, 500);
	}
};


export { authenticateUser }; 