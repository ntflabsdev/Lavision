
const Statistics = () => {
  const stats = [
    { number: '50M+', label: 'Dreams Visualized', color: 'text-purple-600' },
    { number: '200+', label: 'Countries', color: 'text-purple-600' },
    { number: '99%', label: 'Uptime', color: 'text-purple-600' },
    { number: '2019', label: 'Founded', color: 'text-purple-600' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-12 shadow-xl"
          style={{
            background: 'linear-gradient(54.17deg, rgba(188, 8, 207, 0.1) 8.96%, rgba(44, 187, 224, 0.1) 97.54%)',
            border: '1px solid rounded-3xl',
            borderImage: 'linear-gradient(90deg, rgba(188, 8, 207, 0.3) 0%, rgba(44, 187, 224, 0.3) 100%) 1',
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              LaVision by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-6xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-700 text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;