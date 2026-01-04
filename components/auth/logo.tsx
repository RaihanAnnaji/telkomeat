export function TEatLogo() {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex gap-1 mb-2">
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14C4 8 8 2 12 2" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M16 14C16 8 20 2 24 2" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-0">
        <span className="text-5xl font-bold text-slate-900">TE</span>
        <span className="text-5xl font-bold text-orange-500">at</span>
      </div>
    </div>
  )
}
