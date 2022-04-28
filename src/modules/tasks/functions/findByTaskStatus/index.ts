import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import { TaskRepository } from "../../repositories/implements/TaskRepository";
import schema from "./schema";

const findByTaskStatus: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const status = parseInt(event.pathParameters.status);
		if(status !== 1 && status !== 0) {
			throw new Error("Invalid status! Please, type 1 or 0 on route params");
		}
		const { principalId : user_id} = event.requestContext.authorizer;
		const taskRepository = new TaskRepository();

		const tasks = await taskRepository.findByStatus(user_id, status);
		return formatJSONResponse(tasks, 200);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { findByTaskStatus }; 