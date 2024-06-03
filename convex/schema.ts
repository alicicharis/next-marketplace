import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    title: v.string(),
    description: v.string(),
    images: v.string(),
    tokenIdentifier: v.string(),
    price: v.number(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  transactions: defineTable({
    stripeId: v.string(),
    amount: v.number(),
    plan: v.string(),
    credits: v.number(),
    buyerId: v.string(),
    createdAt: v.string(),
  }),
});
