import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import { TaskRepository } from "../../repositories/implements/TaskRepository";
import schema from "./schema";

const deleteTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const task_id = event.pathParameters.id;
		const { principalId : user_id} = event.requestContext.authorizer;
		const taskRepository = new TaskRepository();
		await taskRepository.destroy(user_id, task_id);
		return formatJSONResponse(null, 204);
	} catch(err) {
		return formatJSONResponse({err: err.message}, 400);
	}
};


export { deleteTask }; 