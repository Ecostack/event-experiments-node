import * as amqplib from "amqplib";
import {exchange, queue, routing_key} from "./constants";

(async () => {
    const conn = await amqplib.connect('amqp://localhost');

    const ch = await conn.createChannel();
    await ch.assertExchange(exchange, "direct", {durable:true})
    await ch.assertQueue(queue, {durable:true})
    await ch.bindQueue(queue,exchange,routing_key)
    await ch.consume(queue,(msg)=>{

        console.log('Received:', msg.content.toString());
        setTimeout(() => ch.ack(msg),200)
    })

})();
