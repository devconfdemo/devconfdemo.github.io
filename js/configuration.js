var api_url = "";
var api_ws = "";
var api_key = "";
var bucket = "";
var stage = ""

if (!localStorage["staging-environment"] || localStorage["staging-environment"] == "false"){
	console.log("Connected to production");
	stage = "production";
	bucket = "d21xqmje6si5w1.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_AUeeBdpWW";
	localStorage["aws-congnito-app-id"] = "4ifp1q8ttt08kg0n34kpce9730";
	localStorage["aws-congnito-ui"] = "https://livedemo-production.auth.eu-west-2.amazoncognito.com";	api_url = "https://tx7xy73sizdb7eceqwufsp2rpu.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://tx7xy73sizdb7eceqwufsp2rpu.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-zovajteuzjcl7p2tsosdrqmn2y";
}