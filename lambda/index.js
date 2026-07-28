exports.handler = async (event) => {
    console.log("Event:", JSON.stringify(event));
    
    if (event.httpMethod === "GET" && event.path === "/health") {
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "healthy", version: "1.0.0" })
        };
    }

    if (event.httpMethod === "GET" && event.path === "/api/hello") {
        const claims = event.requestContext.authorizer?.claims;
        const user = claims ? claims["cognito:username"] || claims["email"] : "anonymous";
        
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                message: "Hello from Lambda v2! CANARY IS ACTIVE!", 
                user: user,
                version: "3.0.0",
                timestamp: new Date().toISOString()
            })
        };
    }

    return { statusCode: 404, body: JSON.stringify({ error: "Not found" }) };
};