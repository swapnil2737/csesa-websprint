import Card from "./Card";

export default function Features() {
  const data = [
    {
      title: "Fast Development",
      description: "Reusable components allow rapid implementation."
    },
    {
      title: "Responsive Design",
      description: "Fully mobile-friendly and adaptive layout."
    },
    {
      title: "Clean Structure",
      description: "Organized folder structure and scalable code."
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800 transition">
      <h2 className="text-3xl font-bold text-center mb-12">
        Key Features
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}