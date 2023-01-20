import * as amqplib from "amqplib";
import {exchange, queue, routing_key} from "./constants";

(async () => {
    const conn = await amqplib.connect('amqp://localhost');

    const ch = await conn.createChannel();
    // maximum messages to take before reaching no-ack for this consumer
    await ch.prefetch(2)
    await ch.assertExchange(exchange, "direct", {durable:true})
    await ch.assertQueue(queue, {durable:true})
    await ch.bindQueue(queue,exchange,routing_key)
    await ch.consume(queue,(msg)=>{

        console.log('Received:', msg.content.toString());
        setTimeout(() => ch.ack(msg),1000)
    },{noAck:false})

})();
