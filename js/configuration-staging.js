if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d2zih1l154kw3f.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_PQDYzHqK2";
	localStorage["aws-congnito-app-id"] = "36irucgjiq4a7lgi9bjhdukqbj";
	localStorage["aws-congnito-ui"] = "https://livedemo-staging-socgth.auth.eu-west-2.amazoncognito.com";	api_url = "https://2hoge7gt2vavdbj6sassr3evya.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://2hoge7gt2vavdbj6sassr3evya.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-3hszg5c2erguzpdqinapy7msui";
}