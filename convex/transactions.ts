import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTransaction = mutation({
  args: {
    stripeId: v.string(),
    amount: v.number(),
    plan: v.string(),
    credits: v.number(),
    buyerId: v.string(),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("transactions", {
      stripeId: args.stripeId,
      amount: args.amount,
      plan: args.plan,
      credits: args.credits,
      buyerId: args.buyerId,
      createdAt: args.createdAt,
    });
    return newTaskId;
  },
});
