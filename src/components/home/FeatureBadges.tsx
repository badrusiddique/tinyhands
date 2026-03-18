export default function FeatureBadges() {
  const badges = [
    { label: '🔐 Account-free', bg: '#FF6B6B', text: 'white' },
    { label: '🛡️ Zero tracking', bg: '#4D96FF', text: 'white' },
    { label: '📺 Ad-free forever', bg: '#6BCB77', text: 'white' },
    { label: '🌐 No internet calls', bg: '#C77DFF', text: 'white' },
    { label: '👶 Safe for toddlers', bg: '#FFD93D', text: '#1a1a1a' },
    { label: '🆓 Always free', bg: '#FF6B6B', text: 'white' },
  ]

  return (
    <section className="bg-[#F8F4FF] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-nunito font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3">
            Safe and sound 🛡️
          </h2>
          <p className="font-nunito text-lg text-gray-500">
            Designed so you can hand it over without worrying.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center rounded-full px-6 py-3 font-nunito font-bold text-base shadow-md hover:scale-105 transition-transform cursor-default"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
