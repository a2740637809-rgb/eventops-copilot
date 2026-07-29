import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { eventId?: string };
  if (!body.eventId) {
    return NextResponse.json({ error: "eventId is required" }, { status: 400 });
  }
  return NextResponse.json({
    mode: "simulated",
    status: "succeeded",
    idempotencyKey: `evt_${body.eventId}_t-1`,
    externalWrite: false,
  });
}
