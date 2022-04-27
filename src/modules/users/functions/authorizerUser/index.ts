import { verify } from "jsonwebtoken";

interface IEvent {
	authorizationToken: string;
	methodArn: string;
}
type TgeneratePolicyDocument = {
	Version: string;
	Statement: [
		{
			Action: string;
			Effect: string;
			Resource: string;
		}
	]
}
interface IgenerateAuthResponse {
	principalId: string | (() => string);
	policyDocument: TgeneratePolicyDocument
}

function generateAuthResponse(principalId : string | (() => string), effect : string, methodArn : string) : IgenerateAuthResponse {
	const policyDocument = generatePolicyDocument(effect, methodArn);
	return {
		principalId,
		policyDocument
	};
}

function generatePolicyDocument(effect : string, methodArn : string) : TgeneratePolicyDocument {
	if (!effect || !methodArn) return null;

	const policyDocument : TgeneratePolicyDocument = {
		Version: "2012-10-17",
		Statement: [
			{
				Action: "execute-api:Invoke",
				Effect: effect,
				Resource: methodArn
			}
		]
	};

	return policyDocument;
}
const authorizerUser = async (event : IEvent, context, callback : (arg1 : null, arg2: IgenerateAuthResponse|string) => void) => {
	const token = event.authorizationToken.replace("Bearer ", "");
	const methodArn = event.methodArn;
	if (!token || !methodArn) return callback(null, "Unauthorized");
	try {
		const {sub} = verify(token, process.env.jwt_secret);
		return callback(null, generateAuthResponse(sub, "Allow", methodArn));
	} catch(err) {
		return callback(null, generateAuthResponse(err.message, "Deny", methodArn));

	}

};


export { authorizerUser }; 