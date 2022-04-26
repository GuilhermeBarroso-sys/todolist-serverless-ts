import {DynamoDB} from 'aws-sdk';
import {v4 as uuid}  from 'uuid';
import { IUser, IUserRepository } from '../IUserRepository';
class UserRepository implements IUserRepository{
	private tableName = 'Users';
	private dynamoDB : DynamoDB.DocumentClient;
	constructor() {
		this.dynamoDB = new DynamoDB.DocumentClient();

	}
	async create({name, email, password }: IUser): Promise<void> {
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
		console.log(id);
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