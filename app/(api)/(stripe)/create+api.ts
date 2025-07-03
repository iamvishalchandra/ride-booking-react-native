import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, amount } = body;
    if (!name) return new Response(`Please enter a name`, { status: 400 });
    if (!email)
      return new Response(`Please enter a valid email`, { status: 400 });
    if (!amount)
      return new Response(`Please enter a valid amount`, { status: 400 });
    let customer;

    const isExistingCustomer = await stripe.customers.list({ email });

    if (isExistingCustomer?.data?.length > 0)
      customer = isExistingCustomer.data[0];
    else {
      const newCustomer = await stripe.customers.create({ name, email });
      if (newCustomer) customer = newCustomer;
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer?.id },
      { apiVersion: "2025-06-30.basil" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      customer: customer?.id,
      setup_future_usage: "off_session",
      //   payment_method: "card",
      //   automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });

    const data = { paymentIntent, ephemeralKey, customer: customer?.id };

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
        status: 500,
      })
    );
  }
};
