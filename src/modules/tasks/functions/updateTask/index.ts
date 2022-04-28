import { bodyParams, formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import { TaskRepository } from "../../repositories/implements/TaskRepository";
import schema from "./schema";

const updateTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const task_id = event.pathParameters.id;
		const { name, status } = bodyParams(event.body, ['name', 'status']);
		const { principalId : user_id} = event.requestContext.authorizer;
		const taskRepository = new TaskRepository();
		await taskRepository.update(user_id, {task_id, name,status});
		return formatJSONResponse(null, 204);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { updateTask }; 