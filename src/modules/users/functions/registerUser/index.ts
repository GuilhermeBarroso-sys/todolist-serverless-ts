import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import schema from "./schema";
import { UserRepository } from "../../repositories/implements/UserRepository";

const registerUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const {name,email,password} = JSON.parse(event.body);   
		const userRepository = new UserRepository();
		await userRepository.create({
			name,
			email,
			password,
		});
		return formatJSONResponse('success', 201);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 500);
	}
};


export { registerUser }; 