import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
const IframeComponent = ({ content, key }) => {
	const { width, height } = Dimensions.get("screen");
	//console.log(content);

	const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; }
        #iframe { width: 700px; height: 700px; border: none; }
      </style>
    </head>
    <body>
    <h1>Report</h1>
      <iframe id="iframe" srcdoc="${content}" frameborder="0"></iframe>
    </body>
  </html>
`;
	return (
		<View>
			<ScrollView>
				<WebView
					style={{
						width: width,
						height: height,
						backgroundColor: "transparent",
					}}
					originWhitelist={["*"]}
					allowFileAccess={true}
					startInLoadingState={false}
					allowUniversalAccessFromFileURLs
					allowFileAccessFromFileURLs
					useWebView2={true}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					source={{ html: `${content}` }}
				/>
			</ScrollView>
		</View>
	);
};

export default IframeComponent;
