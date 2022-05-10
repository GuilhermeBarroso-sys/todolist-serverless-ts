import {AWSError, DynamoDB} from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import {v4 as uuid}  from 'uuid';
import { isInvalidParam } from '../../../../lib/api-gateway';
import { IDTOUpdateTask, ITask, ITaskRepository, TodoCreateResponse } from '../ITaskRepository';

class TaskRepository implements ITaskRepository{
	private tableName = process.env.dynamodb_table;
	private dynamoDB : DynamoDB.DocumentClient;
	constructor() {
		this.dynamoDB = new DynamoDB.DocumentClient();
	}
	async findByStatus(user_id: string, status: number | boolean): Promise<DynamoDB.DocumentClient.ItemList> {
		const tasks = await this.dynamoDB.query({
			TableName: this.tableName,
			IndexName: "sk-index",
			ExpressionAttributeNames: {
				"#status": "status",
				"#name": "name",
			},
			KeyConditionExpression: 'sk = :sk',
			ProjectionExpression: 'id,#name,#status',
			ExpressionAttributeValues: {
				":sk": `Todo#${user_id}`,
			},
		}).promise();
		return tasks.Items.filter((task : ITask) => task.status == status);

	}
 
	async create({name, user_id}: ITask): Promise<TodoCreateResponse> {
		if(isInvalidParam([name, user_id])) {
			throw new Error("invalid param value!");
		}
		const id =  uuid();
		await this.dynamoDB.put({
			Item: {
				id,
				sk: `Todo#${user_id}`,
				name,
				status: 0
			},
			TableName: this.tableName
		}).promise();
		const task : TodoCreateResponse = {
			id,
			sk: `Todo#${user_id}`,
			name,
			status: false
		};
		return task;
	}

	async findAll(user_id : string) : Promise<DynamoDB.DocumentClient.ItemList> {
		const tasks = await this.dynamoDB.query({
			TableName: this.tableName,
			IndexName: "sk-index",
			KeyConditionExpression: 'sk = :sk',
			ExpressionAttributeNames: {
				"#name": "name",
				"#status": "status"
			},
			ProjectionExpression: 'id,#name,#status',
			ExpressionAttributeValues: {
				":sk": `Todo#${user_id}`,
			},
		}).promise();
		return tasks.Items;
	}
	async findOne(id: string, user_id: string) : Promise<DynamoDB.DocumentClient.AttributeMap>{
		const task = await this.dynamoDB.get({
			Key: {
				id,
				sk: `Todo#${user_id}`
			},
			TableName: this.tableName,
		}).promise();
		return task.Item;
	}

	async update(user_id: string, { task_id ,name, status }: IDTOUpdateTask): Promise<void> {
		await this.dynamoDB.update({
			TableName: this.tableName,
			Key: {
				"id": task_id,
				"sk": `Todo#${user_id}`
			},
			UpdateExpression: "set #name = :name, #status = :status",
			ExpressionAttributeNames: {
				"#name": "name",
				"#status": "status"
			},
			ExpressionAttributeValues: {
				":name": name,
				":status": status
			}
		}).promise();
	}

	async destroy(user_id: string, task_id: string): Promise<void> {
		if(isInvalidParam([task_id])) {
			throw new Error("invalid param value!");
		}
		await this.dynamoDB.delete({
			TableName: this.tableName,
			Key: {
				"id": task_id,
				"sk": `Todo#${user_id}`
			}
		}).promise();
	}

	
}

export {TaskRepository};