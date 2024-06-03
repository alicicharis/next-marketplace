"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function checkoutCredits(transaction: any) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: any) {
  try {
    await fetchMutation(api.transactions.createTransaction, {
      stripeId: "fdfdfd",
      amount: 1,
      plan: "1",
      credits: 1,
      buyerId: "123",
      createdAt: "123",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}
