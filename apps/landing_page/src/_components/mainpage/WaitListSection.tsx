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

import Link from "next/link";
import { Button } from "../ui/button";

export function WaitListSection() {
  return (
    <section className="section-alt">
      <div className="section-container text-center">
        <h1 className="text-2xl md:text-4xl font-black my-5 ">
          Be First to Try DriveLite
        </h1>
        <p className="text-md md:text-xl my-5 text-foreground/50">
          Join our waitlist to get early access and updates on our progress.
        </p>
        <Button asChild className="p-7 rounded-xl font-bold text-sm md:text-md">
          <Link href={"/waitlist"}>Join Waitlist!</Link>
        </Button>

        <p className="my-5 text-sm md:text-md text-foreground/20">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
