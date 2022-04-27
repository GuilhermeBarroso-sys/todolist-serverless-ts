import { verify } from "jsonwebtoken";
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "../../../../lib/api-gateway";
import schema from "./schema";
function generateAuthResponse(principalId , effect, methodArn) {
	const policyDocument = generatePolicyDocument(effect, methodArn);

	return {
		principalId,
		policyDocument
	};
}

function generatePolicyDocument(effect : string, methodArn : string) {
	if (!effect || !methodArn) return null;

	const policyDocument = {
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
const authorizerUser = async (event, context, callback) => {
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