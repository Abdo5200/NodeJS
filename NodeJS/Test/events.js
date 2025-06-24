const eventEmitter = require("node:events");
const emitter = new eventEmitter();

emitter.on("order", (size, name) => {
  console.log(`order Placed ${size} pizza for ${name}`);
});

emitter.emit("order", "small", "Ahmed");
