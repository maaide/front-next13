async function fetchPrivacy () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/politics/privacy`)
  return res.json()
}

export default async function PrivacyPage() {
  const terms = await fetchPrivacy()

  return (
    <div className="w-full flex p-4">
      <div className="m-auto w-full flex flex-col gap-4 max-w-[1280px]">
        <h1 className="text-3xl font-medium tracking-widest">POLITICAS DE PRIVACIDAD</h1>
        <p>{terms.privacy}</p>
      </div>
    </div>
  )
}