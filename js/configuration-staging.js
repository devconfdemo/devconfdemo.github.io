if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d257oikjdrqsrt.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_uElChVdje";
	localStorage["aws-congnito-app-id"] = "21dds9lf0sqfp5aemlog21d9id";
	localStorage["aws-congnito-ui"] = "https://livedemo-staging.auth.eu-west-2.amazoncognito.com";	api_url = "https://4oklj5bxa5fx5gwjw5dv7tmnhy.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://4oklj5bxa5fx5gwjw5dv7tmnhy.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-t7azxx5txjf2hbbvoy2bjdiqky";
}