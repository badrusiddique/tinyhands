export default function FeatureBadges() {
  const badges = [
    { label: '🚫 No accounts', bg: '#FF6B6B', text: 'white' },
    { label: '🔒 No tracking', bg: '#4D96FF', text: 'white' },
    { label: '📵 No ads', bg: '#6BCB77', text: 'white' },
    { label: '🌐 No external calls', bg: '#C77DFF', text: 'white' },
    { label: '👶 Safe for toddlers', bg: '#FFD93D', text: '#1a1a1a' },
    { label: '🆓 Always free', bg: '#FF6B6B', text: 'white' },
  ]

  return (
    <section className="bg-landing-bg py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center rounded-full px-5 py-2.5 font-nunito font-semibold text-base border border-white/10"
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
