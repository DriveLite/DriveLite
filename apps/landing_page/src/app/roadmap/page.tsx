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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Explore the upcoming features and development roadmap of DriveLite.",
  openGraph: {
    title: "Roadmap | DriveLite",
    description:
      "Explore the upcoming features and development roadmap of DriveLite.",
  },
};

export default function roadmap() {
  return (
    <section>
      <div className="section-container">
        <h1>Roadmap</h1>
      </div>
    </section>
  );
}
