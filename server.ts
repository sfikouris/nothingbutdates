import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON request bodies
  app.use(express.json());

  // API endpoint: Handle manual checkout submission and send email to owner
  app.post("/api/order", async (req, res) => {
    try {
      const { fullName, telephone, email, pickupDate, specialRequests, cart, subtotal, shippingFee, grandTotal, orderNumber } = req.body;

      if (!fullName || !telephone || !pickupDate) {
        res.status(400).json({ error: "Missing required checkout details: fullName, telephone, and pickupDate are required." });
        return;
      }

      // Format current date for display
      const orderDate = new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Construct Cart items table/list for the email body
      const cartHtmlItems = cart.map((item: any) => `
        <tr style="border-bottom: 1px solid #eaeaea;">
          <td style="padding: 10px 0; font-family: sans-serif; font-size: 14px; color: #444;">
            <strong>${item.name}</strong><br>
            <span style="font-size: 12px; color: #888;">${item.weight}</span>
          </td>
          <td style="padding: 10px 0; text-align: center; font-family: sans-serif; font-size: 14px; color: #444;">
            ${item.qty}
          </td>
          <td style="padding: 10px 0; text-align: right; font-family: sans-serif; font-size: 14px; font-weight: bold; color: #222;">
            €${item.priceTotal.toFixed(2)}
          </td>
        </tr>
      `).join('');

      // Create beautiful HTML body for the store owner's email notification
      const emailHtmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #1c1917; padding: 24px; text-align: center; color: #ffffff;">
            <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 11px; margin: 0; color: #d6d3d1;">Medjool & Tahini Treats</p>
            <h1 style="font-weight: 300; margin: 4px 0 0 0; font-size: 24px;">New Artisanal Order Receipt</h1>
          </div>
          <div style="padding: 24px; color: #333333; line-height: 1.5;">
            <p style="margin-top: 0;">Hi Paris,</p>
            <p>You have received a new artisanal selection order of hand-rolled treats. Here are the customer coordinates and order specifications:</p>
            
            <table style="width: 105%; border-collapse: collapse; margin-bottom: 24px; background-color: #fafaf9; border-radius: 6px;">
              <tr>
                <td style="padding: 12px; font-size: 13px; color: #666; font-weight: bold; width: 140px;">Order Reference:</td>
                <td style="padding: 12px; font-size: 13px; color: #1c1917; font-weight: bold;">${orderNumber}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-size: 13px; color: #666; font-weight: bold;">Placed On:</td>
                <td style="padding: 12px; font-size: 13px; color: #444;">${orderDate}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-size: 13px; color: #666; font-weight: bold;">Customer Name:</td>
                <td style="padding: 12px; font-size: 13px; color: #444;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-size: 13px; color: #666; font-weight: bold;">Mobile Phone:</td>
                <td style="padding: 12px; font-size: 13px; color: #1c1917; font-weight: bold;"><a href="tel:${telephone}" style="color: #1c1917; text-decoration: underline;">${telephone}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px; font-size: 13px; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 12px; font-size: 13px; color: #444;">${email ? `<a href="mailto:${email}" style="color: #666;">${email}</a>` : 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-size: 13px; color: #666; font-weight: bold;">Pickup Date:</td>
                <td style="padding: 12px; font-size: 13px; color: #b45309; font-weight: bold;">${new Date(pickupDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
            </table>

            <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #1c1917; padding-bottom: 6px; margin-bottom: 12px; color: #1c1917;">Selected Bundle Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #eaeaea; text-align: left;">
                  <th style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #888;">Treat Item</th>
                  <th style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #888; text-align: center; width: 60px;">Qty</th>
                  <th style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #888; text-align: right; width: 90px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${cartHtmlItems}
              </tbody>
            </table>

            <table style="width: 100%; margin-top: 16px; border-top: 1px dashed #cccccc; padding-top: 12px;">
              <tr>
                <td style="font-size: 13px; color: #666; padding: 4px 0;">Subtotal</td>
                <td style="font-size: 13px; color: #444; padding: 4px 0; text-align: right;">€${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #666; padding: 4px 0;">Shipping Feed</td>
                <td style="font-size: 13px; color: #444; padding: 4px 0; text-align: right;">${shippingFee === 0 ? 'FREE' : `€${shippingFee.toFixed(2)}`}</td>
              </tr>
              <tr style="font-size: 16px; font-weight: bold; color: #1c1917;">
                <td style="padding: 12px 0 0 0;">Grand Total</td>
                <td style="padding: 12px 0 0 0; text-align: right;">€${grandTotal.toFixed(2)}</td>
              </tr>
            </table>

            ${specialRequests.trim() ? `
              <div style="margin-top: 24px; padding: 12px; background-color: #fffbeb; border-left: 3px solid #d97706; font-size: 13px; color: #451a03; border-radius: 4px;">
                <strong>Customer Special Notes:</strong><br>
                <p style="margin: 4px 0 0 0; font-style: italic;">"${specialRequests}"</p>
              </div>
            ` : ''}

            <div style="margin-top: 32px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eaeaea; padding-top: 16px;">
              Please contact the client via phone to confirm preparation details and align collection scheduling.<br>
              <strong>Hand-Rolled Suite Admin Platform</strong>
            </div>
          </div>
        </div>
      `;

      // Owner's email address (defaulting to the corrected parissf15@gmail.com)
      const ownerEmail = process.env.OWNER_EMAIL || "parissf15@gmail.com";

      // SMTP transporter configuration checks
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      let emailResult = "simulated";

      if (smtpHost && smtpPort && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort, 10),
            secure: parseInt(smtpPort, 10) === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass
            }
          });

          await transporter.sendMail({
            from: `"Artisanal Bites Shop" <${smtpUser}>`,
            to: ownerEmail,
            subject: `[New Order] ${orderNumber} from ${fullName}`,
            html: emailHtmlContent
          });

          emailResult = "delivered";
          console.log(`[Email] Order confirmation email for ${orderNumber} successfully sent to ${ownerEmail}.`);
        } catch (sendError) {
          console.error("[Email Error] Failed to send real SMTP email using credentials:", sendError);
          emailResult = "failed-smtp-fallback";
        }
      }

      if (emailResult !== "delivered") {
        // Fallback simulation: Log beautifully to terminal so developer and logs viewer see perfect evidence.
        console.log("\n==========================================================");
        console.log("📨 SIMULATED ORDER TRANSMISSION TO WEBSTORE OWNER:");
        console.log(`  To: ${ownerEmail}`);
        console.log(`  Subject: [New Order] ${orderNumber} from ${fullName}`);
        console.log(`  Recipient Phone: ${telephone}`);
        console.log(`  Scheduled Collect Date: ${pickupDate}`);
        console.log(`  Client Email: ${email || "None"}`);
        console.log("  Cart Items:");
        cart.forEach((item: any) => {
          console.log(`    - ${item.name} (${item.weight}) x${item.qty} = €${item.priceTotal.toFixed(2)}`);
        });
        console.log(`  Grand Total: €${grandTotal.toFixed(2)}`);
        if (specialRequests.trim()) {
          console.log(`  Special Instructions: "${specialRequests}"`);
        }
        console.log("==========================================================\n");
      }

      res.status(200).json({
        success: true,
        orderNumber,
        emailStatus: emailResult,
        message: emailResult === "delivered" 
          ? "Artisanal order requested. Store owner has been notified via email." 
          : "Artisanal order registered. Owner notification simulated (details logged to console)."
      });
    } catch (err: any) {
      console.error("[Order Endpoint Error]", err);
      res.status(500).json({ error: "Internal server error registering artisanal request." });
    }
  });

  // Serve Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve build directory in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Web application listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
