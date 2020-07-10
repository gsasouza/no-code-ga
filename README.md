
# No Code GA
*this project was made for the class Evolutionary Algorithms applied to Robotics (SSC0713) at ICMC/USP*

This is a platform to run genetic algorithms with *almost* no code skills required. You can define your algorithm parameters, we'll run everything automagically and present the results in our dashboard.

## Architecture

- AWS Lambda Functions to run multiple algorithms and algorithm steps in parallel and distributed.
- MongoDB to persist data.
- NodeJS, React and GraphQL for the web application.

![Architecture](./architecture.png)

## Next Steps
- Database access can be a bottleneck, find ways to improve this part
- Improve platform to support more algorithm parameters (like multi-objective optimization)

## References
[Applications of Evolutionary Computation](https://books.google.com.br/books?id=jEDcDwAAQBAJ&pg=PA690&hl=pt-BR&source=gbs_selected_pages&cad=2#v=onepage&q&f=false)
