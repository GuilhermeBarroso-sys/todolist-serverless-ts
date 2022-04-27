import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import { UserRepository } from "../../repositories/implements/UserRepository";
import schema from "./schema";

const findAll: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const userRepository = new UserRepository();
		const user = await userRepository.findAll();
		return formatJSONResponse(user, 200);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 500);
	}
};


export { findAll }; 