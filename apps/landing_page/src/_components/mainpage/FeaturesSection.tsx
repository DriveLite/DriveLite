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

import { Fragment } from "react";

export function FeatureSection() {
  const features: { icon: string; title: string; desc: string }[] = [
    {
      icon: "🛠️",
      title: "API-First for Developers",
      desc: "Upload, share, and search files easily — whether through a simple dashboard or powerful APIs.",
    },
    {
      icon: "🔐",
      title: "Truly Own Your Data",
      desc: "Break free from SaaS surveillance. Host everything on your own servers with zero tracking.",
    },
    {
      icon: "🧩",
      title: "Avoid Vendor Lock-In",
      desc: "Swap out databases, search engines, or storage backends anytime. You're never stuck.",
    },
    {
      icon: "⚡️",
      title: "Built for Scale",
      desc: "Perfect for personal files, startup projects, or global enterprises.",
    },
    {
      icon: "🛡️",
      title: "Security by Default",
      desc: "E2E encryption, fine-grained access controls, and audit logs out of the box.",
    },
    {
      icon: "📈",
      title: "Grow Without Limits",
      desc: "Scale from a single server to a global cluster without changing your code.",
    },
  ];

  const pairs: {
    left: (typeof features)[0] | null;
    right: (typeof features)[0] | null;
    pairindex: number;
  }[] = [];

  for (let i = 0; i < features.length; i += 2) {
    const pairindex = Math.floor(i / 2);
    const a = features[i] ?? null;
    const b = features[i + 1] ?? null;

    pairs.push({ left: a, right: b, pairindex });
  }

  return (
    <section className="section-alt" id="features">
      <div className="section-container">
        <h1 className="text-2xl md:text-4xl font-black my-5 text-center">
          Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pairs.map((pair) => {
            const isEvenPair = pair.pairindex % 2 === 0;
            return (
              <Fragment key={pair.pairindex}>
                <div
                  className={`
                    ${
                      isEvenPair
                        ? "md:col-start-1 md:col-end-3"
                        : "md:col-start-1 md:col-end-2"
                    } rounded-md w-full text-center min-h-[25rem] flex items-center justify-center flex-col card-hover bg-background`}
                >
                  <div className="text-5xl mb-3">{pair.left?.icon}</div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {pair.left?.title}
                  </h2>
                  <p className="text-foreground/50 ">{pair.left?.desc}</p>
                </div>
                <div
                  className={`
                    ${
                      isEvenPair
                        ? "md:col-start-3 md:col-end-4"
                        : "md:col-start-2 md:col-end-4"
                    } rounded-md w-full text-center min-h-[25rem] flex items-center justify-center flex-col card-hover bg-background`}
                >
                  <div className="text-5xl mb-3">{pair.right?.icon}</div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {pair.right?.title}
                  </h2>
                  <p className="text-foreground/50">{pair.right?.desc}</p>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
