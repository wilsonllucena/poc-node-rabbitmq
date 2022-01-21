import { Connection, Channel, Message, connect } from "amqplib";

export default class RabbitmqServer {
	private conn: Connection;
	private channel: Channel;
	private uri: string;

	constructor(uri: string) {}

	async start(): Promise<void> {
		this.conn = await connect(this.uri);
		this.channel = await this.conn.createChannel();
	}

	// Envia a mensagem para o RabbitMQ ( 2 parametro = Fila e Messagem (sempre string))
	async publishInQueue(queue: string, message: string): Promise<void> {
		await this.channel.sendToQueue(queue, Buffer.from(message));
	}

	async publishInExchange(
		exchange: string,
		routingKey: string,
		message: string
	): Promise<boolean> {
		return this.channel.publish(exchange, routingKey, Buffer.from(message));
	}

	// Função para consumir a mensagem no meu RabbitMQ
	async consume(queue: string, callback: (message: Message) => void) {
		return this.channel.consume(queue, (message) => {
			callback(message);
			this.channel.ack(message); // esse cara limpa a mensagem da fila
		});
	}
}
