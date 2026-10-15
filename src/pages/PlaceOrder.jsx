import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const [submitting, setSubmitting] = useState(false)
  const { navigate, cartItems, getCartCount, clearCart } = useContext(ShopContext)

  const handlePlaceOrder = (event) => {
    event.preventDefault()
    if (getCartCount() === 0) {
      toast.error('Your cart is empty. Add a product before placing an order.')
      navigate('/collection')
      return
    }
    setSubmitting(true)
    try {
      const formData = new FormData(event.currentTarget)
      const order = {
        id: `AF-${Date.now().toString().slice(-8)}`,
        customer: Object.fromEntries(formData.entries()),
        paymentMethod: method,
        items: cartItems,
        createdAt: new Date().toISOString(),
        status: 'Received (demo)',
      }
      const orders = JSON.parse(localStorage.getItem('abdusfashions_orders') || '[]')
      localStorage.setItem('abdusfashions_orders', JSON.stringify([order, ...orders]))
      clearCart()
      toast.success(`Demo order ${order.id} placed successfully!`)
      navigate('/orders')
    } catch {
      toast.error('Could not save your order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'border border-gray-300 rounded-sm py-3 px-3 w-full outline-none focus:border-black focus:ring-1 focus:ring-black/10'

  return (
    <form onSubmit={handlePlaceOrder} className="border-t pt-5 sm:pt-14 pb-12 min-h-[80vh]">
      <div className="flex flex-col sm:flex-row justify-between gap-10">
        <section className="flex flex-col gap-4 w-full sm:max-w-[520px]">
          <div className="text-xl sm:text-2xl my-3"><Title text1="Delivery" text2="Information" /></div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input className={inputClass} name="firstName" autoComplete="given-name" type="text" placeholder="First name" required />
            <input className={inputClass} name="lastName" autoComplete="family-name" type="text" placeholder="Last name" required />
          </div>
          <input className={inputClass} name="email" autoComplete="email" type="email" placeholder="Email address" required />
          <input className={inputClass} name="street" autoComplete="street-address" type="text" placeholder="Street address" required />
          <div className="flex flex-col sm:flex-row gap-3">
            <input className={inputClass} name="city" autoComplete="address-level2" type="text" placeholder="City" required />
            <input className={inputClass} name="state" autoComplete="address-level1" type="text" placeholder="Region / State" required />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input className={inputClass} name="postalCode" autoComplete="postal-code" type="text" placeholder="Postal code (optional)" />
            <input className={inputClass} name="country" autoComplete="country-name" type="text" placeholder="Country" defaultValue="Ethiopia" required />
          </div>
          <input className={inputClass} name="phone" autoComplete="tel" type="tel" placeholder="Phone number" required />
        </section>

        <section className="w-full sm:max-w-[420px] mt-4 sm:mt-8">
          <div className="min-w-0 sm:min-w-80">
            <CartTotal />
            <div className="mt-10">
              <Title text1="Payment" text2="Method" />
              <div className="flex flex-col gap-3 mt-4">
                <label className={`flex items-center gap-3 border rounded-sm p-3 cursor-pointer ${method === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                  <input type="radio" name="paymentMethod" value="stripe" checked={method === 'stripe'} onChange={() => setMethod('stripe')} />
                  <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                  <span className="text-sm text-gray-600">Stripe (demo only)</span>
                </label>
                <label className={`flex items-center gap-3 border rounded-sm p-3 cursor-pointer ${method === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                  <input type="radio" name="paymentMethod" value="razorpay" checked={method === 'razorpay'} onChange={() => setMethod('razorpay')} />
                  <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                  <span className="text-sm text-gray-600">Razorpay (demo only)</span>
                </label>
                <label className={`flex items-center gap-3 border rounded-sm p-3 cursor-pointer ${method === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={method === 'cod'} onChange={() => setMethod('cod')} />
                  <span className="text-sm text-gray-600">Cash on Delivery</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-3">Frontend demo only. No real payment is processed and no order is sent to a server.</p>
              <button disabled={submitting} type="submit" className="w-full bg-black text-white px-8 py-3 mt-6 text-sm hover:bg-gray-800 disabled:opacity-60 transition-colors">
                {submitting ? 'Placing order…' : 'Place Order'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </form>
  )
}

export default PlaceOrder
