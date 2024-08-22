var api_url = "";
var api_ws = "";
var api_key = "";
var bucket = "";
var stage = ""

if (!localStorage["staging-environment"] || localStorage["staging-environment"] == "false"){
	console.log("Connected to production");
	stage = "production";
	bucket = "d6nw9ezmq1s2u.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_54wVzyDa2";
	localStorage["aws-congnito-app-id"] = "8v5ld51pljr6qj2ml4k7teleq";
	localStorage["aws-congnito-ui"] = "https://livedemo-production-jm5o4z.auth.eu-west-2.amazoncognito.com";	api_url = "https://ypmmyzhhhbcd7glgwzy4u4dwn4.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://ypmmyzhhhbcd7glgwzy4u4dwn4.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-3pizhs4zsndnbbo4cxuiuwm7nu";
}