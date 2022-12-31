import { Application, Router } from "oak";
import{addUser} from "./resolvers/post.ts"
const router = new Router();

router
.post("/addUser",addUser)



const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });