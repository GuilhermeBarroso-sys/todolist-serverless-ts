import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import { TaskRepository } from "../../repositories/implements/TaskRepository";
import schema from "./schema";

const findAllUsersTasks: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const { principalId : user_id} = event.requestContext.authorizer;
		const taskRepository = new TaskRepository();
		const tasks = await taskRepository.findAll(user_id);
		return formatJSONResponse(tasks, 200);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { findAllUsersTasks }; 