import SmashCanvas from '@/components/play/SmashCanvas'

export const metadata = {
  title: 'Little Humans Mash - Smash!',
}

export default function PlayPage() {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#1d293a' }}
    >
      <SmashCanvas />
    </div>
  )
}
