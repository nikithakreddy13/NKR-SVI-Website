export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      patient_name,
      patient_dob,
      patient_phone,
      reason,
      notes,
      doctor_name,
      practice_name,
      contact_phone,
      contact_fax,
      contact_email,
      contact_name
    } = req.body;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Soni Vision Referrals <onboarding@resend.dev>',
        to: 'drsoni@sonivisioninstitute.com',
        subject: `New Referral: ${patient_name} — from Dr. ${doctor_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #32384e; border-bottom: 2px solid #499188; padding-bottom: 10px;">New Patient Referral</h2>

            <h3 style="color: #499188; margin-top: 24px;">Patient Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #666; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: bold;">${patient_name}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Date of Birth</td><td style="padding: 6px 0;">${patient_dob}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Phone</td><td style="padding: 6px 0;">${patient_phone}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Reason for Referral</td><td style="padding: 6px 0; font-weight: bold;">${reason}</td></tr>
            </table>

            ${notes ? `
            <h3 style="color: #499188; margin-top: 24px;">Clinical Notes</h3>
            <p style="background: #f8f7f4; padding: 12px 16px; border-radius: 6px; color: #333; line-height: 1.6;">${notes.replace(/\n/g, '<br>')}</p>
            ` : ''}

            <h3 style="color: #499188; margin-top: 24px;">Referring Doctor</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #666; width: 140px;">Doctor</td><td style="padding: 6px 0; font-weight: bold;">${doctor_name}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Practice</td><td style="padding: 6px 0;">${practice_name}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Phone</td><td style="padding: 6px 0;">${contact_phone}</td></tr>
              ${contact_fax ? `<tr><td style="padding: 6px 0; color: #666;">Fax</td><td style="padding: 6px 0;">${contact_fax}</td></tr>` : ''}
              ${contact_email ? `<tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;">${contact_email}</td></tr>` : ''}
              ${contact_name ? `<tr><td style="padding: 6px 0; color: #666;">Contact Person</td><td style="padding: 6px 0;">${contact_name}</td></tr>` : ''}
            </table>

            <p style="color: #999; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 12px;">
              Submitted via sonivisioninstitute.com referral form
            </p>
          </div>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
