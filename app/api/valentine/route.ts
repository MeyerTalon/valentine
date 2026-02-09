import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const TO_EMAIL = process.env.VALENTINE_NOTIFICATION_EMAIL || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, accepted, note } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured (RESEND_API_KEY missing)" },
        { status: 503 }
      );
    }

    const to = TO_EMAIL.trim();
    if (!to) {
      return NextResponse.json(
        { error: "Notification email not configured (VALENTINE_NOTIFICATION_EMAIL missing)" },
        { status: 503 }
      );
    }

    const subject = accepted
      ? `💕 Yes! ${name} said yes to being your Valentine!`
      : `Valentine's Day response from ${name}`;

    const noteHtml = note && typeof note === "string" && note.trim()
      ? `<p style="margin-top: 16px; padding: 12px; background: #fff5f7; border-radius: 8px; border-left: 4px solid #e63946;"><em>Their note:</em> "${note.trim().replace(/"/g, "&quot;")}"</p>`
      : "";

    const html = `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #e63946;">Valentine's Day 💕</h2>
        <p><strong>${name}</strong> ${accepted ? "said <em>Yes!</em> to being your Valentine! 🎉" : "responded."}</p>
        ${noteHtml}
        <p style="color: #888; font-size: 14px; margin-top: 24px;">Sent from your Valentine's Day site.</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Valentine API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
