// DriveLite - The self-hostable file storage solution.
// Copyright (C) 2025  
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

 

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
