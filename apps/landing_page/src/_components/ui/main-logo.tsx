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
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";
export function MainLogo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Skeleton className="w-[200] h-[200] bg-gray-300 animate-float" />;
  }

  return (
    <Image
      src={"/logo_icon.svg"}
      alt={"DriveLite logo"}
      className="animate-float"
      width={200}
      height={200}
      priority={false}
      loading="lazy"
    />
  );
}
