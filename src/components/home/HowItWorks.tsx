const steps = [
  {
    number: '1',
    emoji: '🖥️',
    accent: '#FF6B6B',
    title: 'Open TinyHands',
    description:
      'Open the website on your laptop or tablet. No downloads, no installs - it just works in your browser.',
  },
  {
    number: '2',
    emoji: '📺',
    accent: '#4D96FF',
    title: 'Go fullscreen',
    description:
      'Click "Start" to go fullscreen instantly. No other tabs to accidentally close.',
  },
  {
    number: '3',
    emoji: '👶',
    accent: '#6BCB77',
    title: 'Let them smash!',
    description:
      'Hand it over and watch the magic happen. Every key press explodes into colorful glyphs, emojis, and sparkles.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-nunito font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">
            How it works
          </h2>
          <p className="font-nunito text-lg text-gray-500 max-w-xl mx-auto">
            Three simple steps from open to happy toddler.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl bg-white shadow-lg p-8 flex flex-col items-center text-center border-t-4 hover:-translate-y-2 hover:shadow-xl transition-all"
              style={{ borderTopColor: step.accent }}
            >
              <div className="text-5xl mb-3 select-none" aria-hidden="true">
                {step.emoji}
              </div>

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold font-nunito text-white mb-4 shadow-md"
                style={{ backgroundColor: step.accent }}
              >
                {step.number}
              </div>

              <h3 className="font-nunito font-bold text-xl text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="font-nunito text-gray-500 leading-relaxed text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
