import app from "./index.js";
import { connectToDb } from "./config/db.js";

app.listen(3000, async () => {
  await connectToDb();
  console.log(`server is running at port 3000`);
});
