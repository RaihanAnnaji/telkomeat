import { MenuTabsProps } from "./types"

export default function MenuTabs({ activeTab, setActiveTab }: MenuTabsProps) {
  const tabs = [
    { id: "makanan" as const, label: "Makanan" },
    { id: "snack" as const, label: "Snack" },
    { id: "minuman" as const, label: "Minuman" },
  ]

  return (
    <>
      {/* Tombol Chat */}
      <section className="px-4 sm:px-6 lg:px-12">
        <div className="w-full bg-primary text-white py-3 rounded-full font-medium text-center">
          Silahkan Pesan Disini
        </div>
      </section>

      {/* Tabs Menu */}
      <section className="px-4 sm:px-6 lg:px-12 py-8">
        <div className="flex gap-4 overflow-x-auto pb-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full font-medium transition whitespace-nowrap ${
                activeTab === tab.id ? "bg-primary text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>
    </>
  )
}