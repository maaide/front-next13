import { ISell } from "@/interfaces"
import { NumberFormat, offer } from "@/utils"
import Image from 'next/image'

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
        <div className="block gap-8 lg:flex">
          <div className="w-full flex flex-col gap-4 lg:w-2/3">
            <h2 className="font-medium text-xl tracking-widest">PRODUCTOS</h2>
            <table className="border dark:border-neutral-800">
              <thead className="border-b text-left dark:border-neutral-800">
                <th className="p-1 font-medium tracking-widest">NOMBRE</th>
                <th className="p-1 font-medium tracking-widest">CANTIDAD</th>
                <th className="p-1 font-medium tracking-widest">PRECIO</th>
                <th className="p-1 font-medium tracking-widest">TOTAL</th>
              </thead>
              {
                sell.cart.map(product => (
                  <tbody key={product._id}>
                    <td className="flex gap-2 p-1 h-20 sm:h-auto">
                      <Image src={product.image} alt={`Imagen del producto ${product.name}`} width={100} height={100} className="hidden sm:flex" />
                      <p className="my-auto">{product.name}</p>
                    </td>
                    <td className="my-auto p-1">{product.quantity}</td>
                    <td className="my-auto p-1">${NumberFormat(product.price)}</td>
                    <td className="my-auto p-1">${NumberFormat(product.quantityOffers?.length ? offer(product) : product.quantity * product.price)}</td>
                  </tbody>
                ))
              }
            </table>
            <div className="flex gap-2 justify-between">
              <p>ENVÍO</p>
              <p>${NumberFormat(sell.shipping)}</p>
            </div>
            <div className="flex gap-2 justify-between mb-6 lg:mb-0">
              <p>TOTAL</p>
              <p>${NumberFormat(sell.total)}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 lg:w-1/3">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl tracking-widest font-medium">ESTADO</h2>
              <p>{sell.state} / {sell.shippingState}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl tracking-widest font-medium">METODO DE ENVÍO</h2>
              <p>{sell.shippingMethod}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl tracking-widest font-medium">METODO DE PAGO</h2>
              <p>{sell.pay}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl tracking-widest font-medium">DATOS DE ENVÍO</h2>
              <p>{sell.firstName} {sell.lastName}</p>
              <p>{sell.email}</p>
              <p>+{sell.phone}</p>
              <p>{sell.address}</p>
              <p>{sell.city}, {sell.region}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}