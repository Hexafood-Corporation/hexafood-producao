import { MongoClient } from "mongodb";
import { MONGO_URL } from "src/config/env";

export class MongoHelper {
  private static instance: MongoHelper
  private client!: MongoClient

  private constructor() { }

  static async connect(): Promise<MongoHelper> {
    if (MongoHelper.instance !== undefined) {
      return MongoHelper.instance
    }
    const helper = new MongoHelper()
    MongoHelper.instance = helper
    helper.client = await MongoClient.connect(MONGO_URL)
    helper.defineIndex()
    return helper
  }

  private async defineIndex() {
    this.client.db().collection('pedidos').createIndex({
      pedido_id: 1,
      otimistic_counter: 1,
    },
      { unique: true })
  }

  async disconnect(): Promise<void> {
    await this.client.close()
  }

  collection(name: string) {
    return this.client.db().collection(name)
  }
}