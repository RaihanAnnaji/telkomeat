import { SettingsHeaderProps } from "./types"

export default function SettingsHeader({ title, description }: SettingsHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
        {title}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  )
}