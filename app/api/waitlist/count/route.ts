import { NextResponse } from "next/server";
import { getWaitlistCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const collection = await getWaitlistCollection();
    const count = await collection.countDocuments();

    return NextResponse.json({ count });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch waitlist count.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
