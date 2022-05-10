import { AWSError, DynamoDB } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
export interface TodoCreateResponse {
	id: string
	sk: string
	name: string
	status:  boolean
}
export interface ITask {
	id?: string;
	user_id: string;
	name: string;
	status?: boolean;
}
export interface IDTOUpdateTask  {
	task_id: string;
	name: string;
	status: string;
}
export interface ITaskRepository {
	create({user_id,name} : ITask) : Promise<TodoCreateResponse>
	findAll(user_id : string) : Promise<DynamoDB.DocumentClient.ItemList>
	findOne(id: string, user_id: string) : Promise<DynamoDB.DocumentClient.AttributeMap>
	update(user_id: string, {task_id, name,status} : IDTOUpdateTask) : Promise<void>
	destroy(user_id: string, task_id : string) : Promise<void>
	findByStatus(id: string, status: boolean|number) : Promise<DynamoDB.DocumentClient.ItemList>
}