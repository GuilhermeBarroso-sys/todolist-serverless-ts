import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import schema from "./schema";
import { UserRepository } from "../../repositories/implements/UserRepository";

const findAuthenticateUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const { principalId : user_id} = event.requestContext.authorizer;
		const userRepository = new UserRepository();
		const user = await userRepository.findOne(user_id);
		user && delete user.password;
		return formatJSONResponse(user, 200);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { findAuthenticateUser }; 