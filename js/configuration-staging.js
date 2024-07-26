if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d3kk88cpzui619.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_uElChVdje";
	localStorage["aws-congnito-app-id"] = "1fliurik81fp83cj4ir913b996";
	localStorage["aws-congnito-ui"] = "https://livedemo-staging.auth.eu-west-2.amazoncognito.com";
	api_url = "https://6oynj642kvckllgqohiesxoczi.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://6oynj642kvckllgqohiesxoczi.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-qjix4jikqbbnneom65irukh2ji";
}