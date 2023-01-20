import * as amqplib from "amqplib";

import {exchange, routing_key} from "./constants";

(async () => {

    const conn = await amqplib.connect('amqp://guest:guest@localhost');

    const ch = await conn.createChannel();

    await ch.assertExchange(exchange, "direct", {durable:true})

    let i =0
    setInterval(() => {
        ch.publish(exchange, routing_key,Buffer.from('something to do:  '+ i++))
    }, 200);
})();
