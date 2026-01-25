// import app from "./app.js"
// import db from "./models/index.js"   

// const PORT = process.env.PORT || 3000
// const NODE_ENV = process.env.NODE_ENV || "development"

// (async () => {
//   try {
//     await db.sequelize.authenticate()
//     console.log("DB connected successfully")

//     if (NODE_ENV !== "production") {
//       console.log(Object.keys(db.sequelize.models))
//       await db.sequelize.sync()
//       console.log("Db synced (dev only)")
//     }

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`)
//     })

//   } catch (err) {
//     console.error(err)
//   }
// })()

import app from "./app.js";
import db from "./models/index.js";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

console.log("BEFORE AUTH");

await db.sequelize.authenticate();
console.log("DB connected successfully");

console.log("MODELS:", Object.keys(db.sequelize.models));

if (NODE_ENV !== "production") {
  await db.sequelize.sync();
  console.log("DB synced (dev only)");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
