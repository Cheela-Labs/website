import { Resend } from "resend";
import type { WaitlistDocument } from "@/lib/mongodb";
import { getWaitlistCollection } from "@/lib/mongodb";

export type WaitlistInput = {
  name?: string;
  email: string;
  company?: string;
  building?: string;
};

export type WaitlistResult = {
  created: boolean;
  emailSent: boolean;
  email: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom =
  process.env.RESEND_FROM_EMAIL ?? "Cheela <waitinglist@cheela.virentanti.in>";
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

function normalizeOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function submitWaitlist(
  input: WaitlistInput,
): Promise<WaitlistResult> {
  const collection = await getWaitlistCollection();
  const email = normalizeEmail(input.email);
  const now = new Date();

  const document: WaitlistDocument = {
    email,
    name: normalizeOptional(input.name),
    company: normalizeOptional(input.company),
    building: normalizeOptional(input.building),
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.updateOne(
    { email },
    {
      $set: {
        name: document.name,
        company: document.company,
        building: document.building,
        updatedAt: now,
      },
      $setOnInsert: {
        email,
        createdAt: now,
      },
    },
    { upsert: true },
  );

  const created = Boolean(result.upsertedId);
  let emailSent = false;

  if (created && resendClient) {
    await resendClient.emails.send({
      from: resendFrom,
      to: [email],
      subject: "You're on the Cheela waitlist",
      html: `
        <div style="font-family:Inter,Arial,sans-serif;background:#090909;color:#fafafa;padding:32px">
          <div style="max-width:560px;margin:0 auto;border:1px solid #232323;border-radius:24px;background:#111111;padding:32px">
            <p style="margin:0 0 12px;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:#a1a1aa">Cheela</p>
            <h1 style="margin:0 0 16px;font-size:28px;line-height:1.1">You're on the list.</h1>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#a1a1aa">Thanks for joining the Cheela waitlist. We'll send updates as the platform opens up.</p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#a1a1aa">If you didn't request this, you can ignore this email.</p>
          </div>
        </div>
      `,
    });
    emailSent = true;
  }

  return {
    created,
    emailSent,
    email,
  };
}
