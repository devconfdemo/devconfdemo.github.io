if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d1cbkayz4a5wv8.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_X6onWn8p0";
	localStorage["aws-congnito-app-id"] = "3na2opd12se4pd7vq2t30akt9";
	localStorage["aws-congnito-ui"] = "https://livedemo-staging-hob0cx.auth.eu-west-2.amazoncognito.com";	api_url = "https://vnqr4f4injhtlmycxoe2phuhka.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://vnqr4f4injhtlmycxoe2phuhka.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-5kqytcfmujfwjd7sxcvmpyuvda";
}