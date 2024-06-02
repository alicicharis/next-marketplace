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
});
