import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [subCatagory, setSubCatagory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCatagory = (e) => {

    if (catagory.includes(e.target.value)) {
      setCatagory(prev => prev.filter(item => item !== e.target.value))
    }

    else {
      setCatagory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCatagory = (e) => {

    if (subCatagory.includes(e.target.value)) {
      setSubCatagory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCatagory(prev => [...prev, e.target.value])
    }
  }



  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (catagory.length > 0) {
      productsCopy = products.filter(item => catagory.includes(item.catagory));
    }

    if (subCatagory.length > 0) {
      productsCopy = products.filter(item => subCatagory.includes(item.subCatagory));
    }


    setFilterProducts(productsCopy)
  }



  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }


  }

  useEffect(() => {
    setFilterProducts(products)
  }, [])

  useEffect(() => {
    applyFilter();
  }, [catagory, subCatagory, search, showSearch])


  useEffect(() => {
    sortProduct();
  }, [sortType])


  return (
    <div className=' flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter options */}

      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">Catagories</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCatagory} />Men</p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCatagory} />Women</p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCatagory} />Kids</p>
          </div>
        </div>


        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light'>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCatagory} />Topwear
            </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCatagory} />Bottomwear  </p>
            <p className="flex gap-2">
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCatagory} />Winterwear </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'All'} text2={'Collections'} />

          {/* products */}

          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent" >  Sort by: Relavent</option>
            <option value="low-high"> Sort by: Low-high</option>
            <option value="high-low"> Sort by: High-low</option>
          </select>
        </div>
        {/* map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>

  );
}

export default Collection
