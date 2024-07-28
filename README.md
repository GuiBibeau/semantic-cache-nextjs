# Semantic Cache Demo with Next.js and Upstash

This project demonstrates the use of semantic caching in a Next.js application using Upstash Vector and OpenAI's GPT-4. It showcases how to efficiently cache and retrieve semantically similar queries, reducing API calls and improving response times.

## Demo Video

Check out our demo video to see the Semantic Cache in action:

[![Semantic Cache Demo](https://img.youtube.com/vi/zyL48nDE8XQ/0.jpg)](https://www.youtube.com/watch?v=zyL48nDE8XQ)

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [Upstash Vector](https://upstash.com/) - Serverless vector database for semantic caching
- [OpenAI GPT-4](https://openai.com/) - Advanced language model for generating responses
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/semantic-cache-demo.git
   cd semantic-cache-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```
   OPENAI_API_KEY=your_openai_api_key
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the demo.

## Setting Up OpenAI API Key

1. Go to [OpenAI](https://openai.com/) and sign up for an account.
2. Navigate to the API section and create a new API key.
3. Copy the API key and paste it into your `.env.local` file as `OPENAI_API_KEY`.

## Creating an Upstash Semantic Cache

1. Sign up for an account at [Upstash](https://upstash.com/).
2. Follow the instructions in the [Upstash Vector Getting Started Guide](https://upstash.com/docs/vector/overall/getstarted) to create and set up your semantic cache.

## How It Works

The demo uses a semantic cache to store and retrieve semantically similar queries. Here's a brief overview of the process:

1. User enters a query in the search bar.
2. The application checks the semantic cache for similar queries.
3. If a similar query is found, the cached result is returned quickly.
4. If no similar query is found, the application sends a request to the OpenAI API.
5. The new query and its result are then stored in the semantic cache for future use.

This approach significantly reduces API calls to OpenAI and improves response times for similar queries.

## Demo

The demo showcases a simple search interface where users can enter queries. The application will display the results along with the time taken to retrieve the answer. You can observe the difference in response times between cached and non-cached queries.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
