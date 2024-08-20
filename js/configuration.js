var api_url = "";
var api_ws = "";
var api_key = "";
var bucket = "";
var stage = ""

if (!localStorage["staging-environment"] || localStorage["staging-environment"] == "false"){
	console.log("Connected to production");
	stage = "production";
	bucket = "d3juinhyinqnof.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_QDBL3Xwqh";
	localStorage["aws-congnito-app-id"] = "3kpigfvoq5phcspvp7nr25qevl";
	localStorage["aws-congnito-ui"] = "https://livedemo-production-3rolfw.auth.eu-west-2.amazoncognito.com";	api_url = "https://maukuxiqa5e2rbo5vfbpe53sxe.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://maukuxiqa5e2rbo5vfbpe53sxe.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-dcapcmu6ozcpxanccpcrsadsei";
}