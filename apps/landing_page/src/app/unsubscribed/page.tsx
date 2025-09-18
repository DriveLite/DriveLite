// app/unsubscribed/page.tsx
import { Button } from "@/Components/ui/button";
import Link from "next/link";

export default function UnsubscribedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          You’re Unsubscribed
        </h1>
        <p className="text-gray-600 mb-6">
          You have successfully been removed from our waitlist. You will no
          longer receive emails from DriveLite.
        </p>
        <Link href="/">
          <Button variant="default" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
