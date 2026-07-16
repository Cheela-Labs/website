import { type Collection, MongoClient } from "mongodb";

export type WaitlistDocument = {
  email: string;
  name: string | null;
  company: string | null;
  building: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB ?? "waitlist";

declare global {
  var __cheelaMongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

function getClientPromise() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is required.");
  }

  if (!clientPromise) {
    if (!globalThis.__cheelaMongoClientPromise) {
      globalThis.__cheelaMongoClientPromise = new MongoClient(
        mongoUri,
      ).connect();
    }

    clientPromise = globalThis.__cheelaMongoClientPromise;
  }

  return clientPromise;
}

export async function getWaitlistCollection(): Promise<
  Collection<WaitlistDocument>
> {
  const client = await getClientPromise();
  const collection = client
    .db(mongoDbName)
    .collection<WaitlistDocument>("waitlist");

  await collection.createIndex({ email: 1 }, { unique: true });

  return collection;
}
