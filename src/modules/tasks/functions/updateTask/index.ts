import { bodyParams, formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import { TaskRepository } from "../../repositories/implements/TaskRepository";
import schema from "./schema";

const updateTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const task_id = event.pathParameters.task_id;
		const { name, status } = bodyParams(event.body, ['name', 'status']);
		const { principalId : user_id} = event.requestContext.authorizer;
		const taskRepository = new TaskRepository();
		const taskAlreadyExists = await taskRepository.findOne(task_id, user_id);
		if(!taskAlreadyExists) {
			return formatJSONResponse("Task not found", 404);
		}
		await taskRepository.update(user_id, {task_id, name,status});
		return formatJSONResponse(null, 204);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { updateTask }; 