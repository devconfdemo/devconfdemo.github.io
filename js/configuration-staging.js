if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d1uj78o13wap7c.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-west-2_giWBrvtck";
	localStorage["aws-congnito-app-id"] = "3dqqrrk3vovvrv6okpbuq6tmqn";
	localStorage["aws-congnito-ui"] = "https://livedemo-staging-eoyx1g.auth.eu-west-2.amazoncognito.com";	api_url = "https://2ie46ii4trhnnki22gesogbxum.appsync-api.eu-west-2.amazonaws.com/graphql";
	api_ws = "wss://2ie46ii4trhnnki22gesogbxum.appsync-realtime-api.eu-west-2.amazonaws.com/graphql";
	api_key = "da2-lmechitgnzbr5gbyzaxx2aio5a";
}