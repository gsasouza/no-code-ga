
# Sancathon - 2020

# How to run
- Install dependencies: `yarn`
- Create a `.env` file inside console and server packages (follow `.env.example`)
- Create first user: `yarn repl` and when it opens: `User.create({ username: 'your-username', password: '...', email: '...', name: '...' })`
- Generate GraphQL schema: `yarn server:generate-schema` 
- Generate GraphQL client queries: `yarn console:relay` 
- Run server `yarn server:graphql`
- Run client `yarn console:start`
- Start hacking :)
