"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useAdmin() {
  const { isSignedIn } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/auth/admin")
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.isAdmin);
        setLoading(false);
      })
      .catch(() => {
        setIsAdmin(false);
        setLoading(false);
      });
  }, [isSignedIn]);

  return { isSignedIn, isAdmin, loading };
}
