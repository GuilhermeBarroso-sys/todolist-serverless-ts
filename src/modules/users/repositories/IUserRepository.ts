import {  DynamoDB } from "aws-sdk";

export interface IUser {
	id?: string;
	sk?: string;
	name: string;
	email: string;
	password: string;
}
export interface IUserRepository {
	create({id,name,email,password} : IUser) : Promise<void>
	findAll() : Promise<IUser[]>
	findOne(id: string) : Promise<DynamoDB.DocumentClient.AttributeMap>
	findByEmail(email: string) : Promise<DynamoDB.DocumentClient.AttributeMap|false>

}