import { Application, Router } from "https://deno.land/x/oak@v4.0.0/mod.ts";

type Book = {
  id: number;
  title: string;
  author: string;
};

const books: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
  },
];

const app = new Application();

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/book", (context) => {
    context.response.body = books;
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id) {
      const id = context.params.id;
      context.response.body = books.find((book) => book.id === parseInt(id));
    }
  })
  .post("/book", async (context) => {
    const body = await context.request.body();
    console.log(body.value.id);
    if (!body.value.id || !body.value.title || !body.value.author) {
      context.response.status = 400;
      return;
    }
    const newBook: Book = {
      id: body.value.id,
      title: body.value.title,
      author: body.value.author,
    };
    books.push(newBook);
    context.response.status = 201;
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log("http://localhost:8000/");

await app.listen({ port: 8000 });

