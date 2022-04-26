import {DynamoDB} from 'aws-sdk';
import {v4 as uuid}  from 'uuid';
import { isInvalidParam } from '../../../../lib/api-gateway';
import { IUser, IUserRepository } from '../IUserRepository';
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
				sk: `User#${id}`,
				name,
				email,
				password
			},
			TableName: this.tableName
		}).promise();
	}
	async findAll(): Promise<IUser[]> {
		throw new Error('Method not implemented.');
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

	async findByEmail(email: string) : Promise<DynamoDB.DocumentClient.AttributeMap> {
		const user = await this.dynamoDB.get({
			Key: {
				email
			},
			TableName: this.tableName,
		}).promise();
		return user.Item;
	}
}

export {UserRepository};