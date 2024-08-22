var api_url = "";
var api_ws = "";
var api_key = "";
var bucket = "";
var stage = ""

if (!localStorage["staging-environment"] || localStorage["staging-environment"] == "false"){
	console.log("Connected to production");
	stage = "production";
	bucket = "d1v9fptizgwaad.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_SvvQqNmIm";
	localStorage["aws-congnito-app-id"] = "7iufdkur8u2fdg2aij3qvisi7g";
	localStorage["aws-congnito-ui"] = "https://livedemo-production-nuzkbj.auth.eu-west-2.amazoncognito.com";	api_url = "https://bo6gtp3fonhylgbh4sp2t5jpqi.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://bo6gtp3fonhylgbh4sp2t5jpqi.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-bpynut26czh4bjtfxxpgcz6tsu";
}