import {DynamoDB} from 'aws-sdk';
import {v4 as uuid}  from 'uuid';
import { isInvalidParam } from '../../../../lib/api-gateway';
import { IUser, IUserRepository } from '../IUserRepository';
interface IDTOUser {
	id: string;
	sk: string;
	name: string;
	email: string;
	password: string;
}
class UserRepository implements IUserRepository{
	private tableName = process.env.dynamodb_table;
	private dynamoDB : DynamoDB.DocumentClient;
	constructor() {
		this.dynamoDB = new DynamoDB.DocumentClient();
	}
	async create({name, email, password }: IUser): Promise<void> {
		if(isInvalidParam([name,email,password])) {
			throw new Error("invalid param value!");
		}
		const id =  uuid();
		await this.dynamoDB.put({
			Item: {
				id,
				sk: `User`,
				name,
				email,
				password
			},
			TableName: this.tableName
		}).promise();
	}
	async findAll() : Promise<DynamoDB.DocumentClient.ItemList> {
		const users = await this.dynamoDB.query({
			TableName: this.tableName,
			IndexName: "sk-index",
			KeyConditionExpression: 'sk = :sk',
			ProjectionExpression: 'id,sk,email,password',
			ExpressionAttributeValues: {
				":sk": "User",
			},

		}).promise();
		return users.Items;
	}
	async findByEmail(email: string) : Promise<DynamoDB.DocumentClient.AttributeMap|false> {
		const user = await this.dynamoDB.query({
			TableName: this.tableName,
			IndexName: "email-index",
			KeyConditionExpression: "email = :email",
			ExpressionAttributeValues:{
				":email": email
			}
		}).promise();
		return user.Items.length >= 1 ? user.Items[0] : false;
	}
	async findOne(id: string) : Promise<DynamoDB.DocumentClient.AttributeMap>{
		const user = await this.dynamoDB.get({
			Key: {
				id,
				sk: `User#${id}`
			},
			TableName: this.tableName,
		}).promise();
		return user.Item;
	}

}

export {UserRepository};