import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import schema from "./schema";
import { UserRepository } from "../../repositories/implements/UserRepository";

const findUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const {user_id : id} = event.pathParameters;
		const userRepository = new UserRepository();
		const user = await userRepository.findOne(id);
		return formatJSONResponse(user, 200);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { findUser }; 