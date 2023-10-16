async function fetchTerms () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/politics/terms`)
  return res.json()
}

export default async function TermsPage() {
  const terms = await fetchTerms()

  return (
    <div className="w-full flex p-4">
      <div className="m-auto w-full flex flex-col gap-4 max-w-[1280px]">
        <h1 className="text-3xl font-medium tracking-widest">TERMINOS Y CONDICIONES</h1>
        <p>{terms.terms}</p>
      </div>
    </div>
  )
}