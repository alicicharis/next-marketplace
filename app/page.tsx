"use client";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <SignOutButton />
        <h1>CONTENT</h1>
      </Authenticated>
    </main>
  );
}
