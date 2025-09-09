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

export default function FeatureSection() {
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
  return (
    <section className="m-20 px-2 sm:px-12">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Why Choose DriveLite?
        </h3>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          An open-source file storage solution designed for developers who value
          privacy and control.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-8 text-sm">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start space-x-4 card-hover p-5 rounded-xl cursor-pointer"
          >
            <div className="text-xl">{feature.icon}</div>
            <div>
              <h4 className="font-bold">{feature.title}</h4>
              <p className="text-gray-400 font-semibold">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
