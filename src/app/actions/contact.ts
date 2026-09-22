"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected"), // Honeypot field
});

export async function sendContactMessage(
  prevState: any,
  formData: FormData
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const validated = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    honeypot: formData.get("honeypot"),
  });
  if (!validated.success)
    return { success: false, errors: validated.error.flatten().fieldErrors };
  try {
    await resend.emails.send({
      from: "Portfolio Contact <contact@utsabsinha.com>",
      to: "utsabsinha@example.com",
      subject: `[Portfolio Inquiry] Message from ${validated.data.name}`,
      text: `Name: ${validated.data.name}\nEmail: ${validated.data.email}\n\nMessage:\n${validated.data.message}`,
    });
    return { success: true, message: "Inquiry transmitted successfully." };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message:
        "Transmission failed. Please use direct email: utsabsinha468@gmail.com",
    };
  }
}