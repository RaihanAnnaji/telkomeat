interface StepCardProps {
  number: string
  title: string
  desc: string
}

export default function StepCard({ number, title, desc }: StepCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <span className="text-lg font-bold text-primary">{number}</span>
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-sm text-gray-900">{title}</h4>
          <p className="text-xs text-gray-600 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  )
}