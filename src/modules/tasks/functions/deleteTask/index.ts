import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import { TaskRepository } from "../../repositories/implements/TaskRepository";
import schema from "./schema";

const deleteTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const task_id = event.pathParameters.task_id;
		const { principalId : user_id} = event.requestContext.authorizer;
		const taskRepository = new TaskRepository();
		const taskAlreadyExists = await taskRepository.findOne(task_id, user_id);
		if(!taskAlreadyExists) {
			return formatJSONResponse("Task not found", 404);
		}
		await taskRepository.destroy(user_id, task_id);
		return formatJSONResponse(null, 204);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { deleteTask }; 