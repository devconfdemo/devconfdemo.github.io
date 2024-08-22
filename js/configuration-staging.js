if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d35s1t8mxwqfv0.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_X6onWn8p0";
	localStorage["aws-congnito-app-id"] = "a75m2981lvl652cdkqp66k66r";
	localStorage["aws-congnito-ui"] = "https://livedemo-staging-hob0cx.auth.eu-west-2.amazoncognito.com";	api_url = "https://et2ab5wwx5drflfwja5eluibxm.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://et2ab5wwx5drflfwja5eluibxm.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-zcmhifu3mvespg226hlgoduyfu";
}