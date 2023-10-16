async function fetchDevolutions () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/politics/devolutions`)
  return res.json()
}

export default async function DevolutionsPage() {
  const terms = await fetchDevolutions()

  return (
    <div className="w-full flex p-4">
      <div className="m-auto w-full flex flex-col gap-4 max-w-[1280px]">
        <h1 className="text-3xl font-medium tracking-widest">POLITICAS DE DEVOLUCIONES Y REEMBOLSOS</h1>
        <p>{terms.devolutions}</p>
      </div>
    </div>
  )
}