import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { tripId, email } = await request.json();

    if (!tripId || !email) {
      return NextResponse.json({ error: 'Missing tripId or email' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // Create invite token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const { error: insertError } = await supabaseAdmin
      .from('invite_links')
      .insert({
        trip_id: tripId,
        token,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // In production, send email via Resend here
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });

    return NextResponse.json({ success: true, token });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
