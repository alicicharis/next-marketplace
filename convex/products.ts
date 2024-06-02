import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getProduct = query({
  args: {},
  async handler(ctx) {
    // const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    // console.log("USERID :", userId);
    // if (!userId) return [];
    return await ctx.db
      .query("products")
      // .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const createProduct = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    images: v.string(),
    price: v.number(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) throw new ConvexError("Not authenticated");

    console.log("CREATING PROCUTS:::", args);
    await ctx.db.insert("products", {
      title: args.title,
      description: args.description,
      images: args.images,
      tokenIdentifier: userId,
      price: args.price,
    });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getImageUrl = query({
  args: {
    imageId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.storage.getUrl(args.imageId);
  },
});
