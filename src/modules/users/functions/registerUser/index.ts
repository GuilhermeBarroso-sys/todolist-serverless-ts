import { bodyParams, formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import schema from "./schema";
import { UserRepository } from "../../repositories/implements/UserRepository";
import {hash} from 'bcryptjs';
const registerUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const {name,email,password} = bodyParams(event.body, ['name', 'email', 'password']);
    
		const userRepository = new UserRepository();
		const hashedPassword = await hash(password, 10);
		const alreadyExists = await userRepository.findByEmail(email);
		if(alreadyExists.length > 0) {
			throw new Error("this email already been used!");
		}
		await userRepository.create({
			name,
			email,
			password: hashedPassword,
		});
		return formatJSONResponse('', 201);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 500);
	}
};


export { registerUser }; 