export async function handler(event) {
    const API_KEY = "b5661d21d1f9407eb4d8dc975e2f0535"
    const baseUrl = "https://newsapi.org/v2/everything?q="; 

    try {
        const query = event.queryStringParameters.q || "india";
        const res = await fetch(`${baseUrl}${query}&apiKey=${API_KEY}`);
        const data = await res.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch news" }),
        };
    }
}