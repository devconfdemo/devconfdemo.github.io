var api_url = "";
var api_ws = "";
var api_key = "";
var bucket = "";
var stage = ""

if (!localStorage["staging-environment"] || localStorage["staging-environment"] == "false"){
	console.log("Connected to production");
	stage = "production";
	bucket = "d2lwyu9qa3zdc5.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_54wVzyDa2";
	localStorage["aws-congnito-app-id"] = "8v5ld51pljr6qj2ml4k7teleq";
	localStorage["aws-congnito-ui"] = "https://livedemo-production-jm5o4z.auth.eu-west-2.amazoncognito.com";	api_url = "https://b4db3tus3jffrkhvyqwmspgwgu.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://b4db3tus3jffrkhvyqwmspgwgu.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-irw2f5muk5dfpmie4mh64ctkie";
}