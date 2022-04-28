import { bodyParams, formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import schema from "./schema";
import { TaskRepository } from "../../repositories/implements/TaskRepository";
const createTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const { name } = bodyParams(event.body, ['name']);
		const {principalId : user_id} = event.requestContext.authorizer;
		const taskRepository = new TaskRepository();
		taskRepository.create({name,user_id});
		return formatJSONResponse('', 201);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { createTask }; 