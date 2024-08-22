if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d9s74mejd0l16.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_y5GpELD1s";
	localStorage["aws-congnito-app-id"] = "7uc7ih859jaqeob82gp4so80l5";
	localStorage["aws-congnito-ui"] = "https://livedemo-staging-14ajzh.auth.eu-west-2.amazoncognito.com";	api_url = "https://irw72jaws5ajlnhh2vp5m6dymi.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://irw72jaws5ajlnhh2vp5m6dymi.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-m5e6p5xhkbbsngbjmrjl6i7saq";
}