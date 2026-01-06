import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer("http://localhost:3000/cable");

export default consumer;
