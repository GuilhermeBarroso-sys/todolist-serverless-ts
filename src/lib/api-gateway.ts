import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: unknown, statusCode = 200) => {
	return {
		statusCode,
		body: response ? JSON.stringify(response) : undefined
	};
};

export const bodyParams = (eventBody: string, requiredParams : Array<string> = []) => {
	const body = JSON.parse(eventBody);
	if(!body) {
		throw new Error(`Bad Request! Body is null`);
	}
	if(requiredParams.length != 0) {
		const parameters = Object.keys(body).map(param => {return param;});
		requiredParams.forEach(requiredParam => {
			if(!parameters.includes(requiredParam)) {
				throw new Error(`Required Params is missing! Required params: [${[...requiredParams]}] `);
			} 
		});
	}
	return body;
};

export const isInvalidParam = (array : Array<string>) => {
  
	const parameters = array.map((param) => {
		if(!param) {
			return false;
		}
		return true;
	});
	return parameters.includes(false) ? true : false;

};