import { ISell } from "@/interfaces"

export const revalidate = 60

async function fetchSell (sell: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell}`)
  return res.json()
}

export default async function Page ({ params }: { params: { sell: string } }) {
  const sell: ISell = await fetchSell(params.sell)
  
  return (
    <div className='w-full px-2'>
      <div className='w-full max-w-[1280px] m-auto flex flex-col gap-4 py-14'>
        <h1 className="text-2xl font-medium tracking-widest">COMPRA {sell.buyOrder}</h1>
      </div>
    </div>
  )
}