import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { toast } from 'react-toastify'

const Orders = () => {
  const { products, currency } = useContext(ShopContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    try { setOrders(JSON.parse(localStorage.getItem('abdusfashions_orders') || '[]')) }
    catch { setOrders([]) }
  }, [])

  const getOrderLines = (order) => Object.entries(order.items || {}).flatMap(([id, sizes]) => {
    const product = products.find((item) => item._id === id)
    if (!product) return []
    return Object.entries(sizes || {}).filter(([, quantity]) => quantity > 0).map(([size, quantity]) => ({ product, size, quantity }))
  })

  return (
    <section className="border-t pt-12 pb-16 min-h-[50vh]">
      <div className="text-2xl mb-6"><Title text1="My" text2="Orders" /></div>
      {orders.length === 0 ? (
        <div className="text-center py-14 border border-dashed border-gray-300 rounded-sm">
          <p className="text-gray-600">You have not placed any orders yet.</p>
          <p className="text-sm text-gray-400 mt-2">Orders you place in this browser demo will appear here.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const lines = getOrderLines(order)
            return (
              <article key={order.id} className="border border-gray-200 rounded-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-4 mb-4">
                  <div><p className="font-semibold">Order {order.id}</p><p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString()}</p></div>
                  <span className="text-xs bg-green-50 text-green-700 px-3 py-2 rounded-full w-fit">{order.status}</span>
                </div>
                {lines.length ? lines.map(({ product, size, quantity }) => (
                  <div key={`${order.id}-${product._id}-${size}`} className="flex items-center gap-4 py-3">
                    <img className="w-16 h-20 object-cover bg-gray-50" src={product.image[0]} alt={product.name} />
                    <div className="flex-1"><p className="font-medium text-sm">{product.name}</p><p className="text-sm text-gray-500 mt-1">Size: {size} · Qty: {quantity}</p></div>
                    <p className="text-sm">{currency}{product.price * quantity}</p>
                  </div>
                )) : <p className="text-sm text-gray-500">Order item details are unavailable.</p>}
                <div className="border-t pt-3 mt-3 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span>Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : `${order.paymentMethod} (demo)`}</span>
                  <span>Delivery to: {order.customer?.city || '—'}, {order.customer?.country || '—'}</span>
                </div>
              </article>
            )
          })}
          <button type="button" onClick={() => { localStorage.removeItem('abdusfashions_orders'); setOrders([]); toast.success('Demo order history cleared.') }} className="text-sm underline underline-offset-4 text-gray-500">Clear demo order history</button>
        </div>
      )}
    </section>
  )
}

export default Orders
