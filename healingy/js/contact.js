export async function onRequestPost(context) {
  try {
    // 1. Parse the form data coming from your HTML
    const formData = await context.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    // Add other fields as needed, e.g., const phone = formData.get('phone');

    // 2. Prepare the email data for Resend
    const resendBody = {
      from: 'Contact Form <contact@healwithalison.com>', // MUST match your Resend verified domain
      to: 'alison.creativepath@gmail.com', // Where you want to receive emails
      reply_to: email,
      subject: `New Contact from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`
    };

    // 3. Send to Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendBody)
    });

    if (resendResponse.ok) {
      return new Response("Success", { status: 200 });
    } else {
      const errorData = await resendResponse.text();
      return new Response(`Error sending email: ${errorData}`, { status: 500 });
    }

  } catch (err) {
    return new Response(`Server error: ${err.message}`, { status: 500 });
  }
}