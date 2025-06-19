// This is a sample serverless function for Netlify
// If your app had API endpoints, you would implement them here

exports.handler = async function(event, context) {
  // You can handle API requests here
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Noting Meditation API"
    })
  };
};
