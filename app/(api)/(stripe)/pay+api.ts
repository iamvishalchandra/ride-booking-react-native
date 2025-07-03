import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { payment_method_id, payment_intent_id, customer_id } = body;
    if (!payment_method_id)
      return new Response(`Please enter a name`, { status: 400 });
    if (!payment_intent_id)
      return new Response(`Please enter a valid email`, { status: 400 });
    if (!customer_id)
      return new Response(`Please enter a valid amount`, { status: 400 });

    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      { customer: customer_id }
    );

    const data = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: payment_method_id,
      setup_future_usage: "off_session",
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment Confirmed Successfully",
        data,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
        status: 500,
      })
    );
  }
};
