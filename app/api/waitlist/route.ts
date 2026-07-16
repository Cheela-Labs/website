import { NextResponse } from "next/server";
import { submitWaitlist } from "@/lib/waitlist";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: string;
      email?: string;
      company?: string;
      building?: string;
    };

    if (!payload.email || !isValidEmail(payload.email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const result = await submitWaitlist({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      building: payload.building,
    });

    return NextResponse.json({
      success: true,
      created: result.created,
      emailSent: result.emailSent,
      message: result.created
        ? "You're on the list."
        : "You're already on the list.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to join waitlist.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
