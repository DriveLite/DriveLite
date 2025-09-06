
export default function FeatureSection() {
  const features: {icon: string;title: string;desc:string;}[] = [
  {
    icon: "🛠️",
    title: "Developer First",
    desc: "Use REST or gRPC, plug in your database, bring your infra",
  },
  {
    icon: "🔐",
    title: "Self-Hosted & Private",
    desc: "No tracking, full control of your data",
  },
  {
    icon: "🧩",
    title: "Modular Design",
    desc: "Replaceable search engine, database, or storage backend",
  },
  ]
  return (
    <section className="mb-20">
      <h3 className="text-2xl font-semibold mb-8 text-center">Why DriveLite ?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-start space-x-4">
            <div  className="text-xl">{feature.icon}</div>
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
