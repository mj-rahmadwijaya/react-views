import React, { useEffect, useState } from 'react';
import useHITApi from '../hooks/useHitAPI';

const ReactViews = () => {
    const [data, setData] = useState({
        products: [],
        search: '',
        modal: false,
        modalData: null,
        loading: false
    });

    const { products, search, modal, modalData, loading } = data;
    const setDataState = (newData) => {
        setData(prevData => ({ ...prevData, ...newData }));
    };
    const hitAPI = useHITApi();

    const getProductsAll = async () => {
        setDataState({
            loading: true
        });
        const x = await hitAPI('https://dummyjson.com/products');
        setDataState({
            products: x.products,
            loading: false
        });
    };

    const handleSearch = (e) => {
        setDataState({
            search: e.target.value
        });
    }

    const handleSearchClick = async () => {
        setDataState({
            loading: true
        });
        const x = await hitAPI(`https://dummyjson.com/products/search?q=${search}`);
        setDataState({
            products: x.products,
            loading: false
        });
    }

    const clickModal = async (product) => {
        setDataState({
            loading: true
        });
        const x = await hitAPI(`https://dummyjson.com/products/${product.id}`);
        setDataState({
            modalData: x,
            modal: true,
            loading: false
        });
    }

    const modalDetail = () => {
        return (
            <div className='p-6 fixed inset-0 bg-[#00000085] flex items-center justify-center'>
                <div className='bg-white p-4 rounded-md'>
                    <div className='p-2 border-b-2 relative'>
                        <h4>Detail Product</h4>
                        <button className='p-1 cursor-pointer rounded-md border-2 border-gray-300 absolute right-1 top-1' onClick={() => setDataState({ modal: false })}>
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" id="cross" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="icon flat-color"><path id="primary" d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>
                        </button>
                    </div>
                    <div className='p-2'>
                        <img src={modalData.thumbnail} alt={modalData.title} className='h-48 w-48 object-cover rounded-md' />
                        <h6>{modalData.title}</h6>
                        <p>{modalData.description}</p>
                        <p>{modalData.price}</p>
                        <p>{modalData.rating}</p>
                        <p>{modalData.stock}</p>
                        <p>{modalData.brand}</p>
                        <p>{modalData.category}</p>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        getProductsAll()
    }, []);

    return (
        <>
            <div className='p-4 sticky top-0 bg-white flex gap-2'>
                <input type="text" placeholder='Search' className='w-64 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={handleSearch} />
                <button className='p-2 rounded-md w-24 cursor-pointer' onClick={handleSearchClick}>Search</button>
            </div>
            <div>
                {products.map((product) => (
                    <div key={product.id} className='p-4 border-b border-gray-200 cursor-pointer' onClick={() => clickModal(product)}>
                        <h4 className='text-lg font-bold'>{product.title}</h4>
                        <p className='text-sm text-gray-500'>{product.description}</p>
                    </div>
                ))}

            </div>
            {modal && modalDetail(products[0])}

            {loading && <div className='p-6 fixed inset-0 bg-[#00000085] flex items-center justify-center'>
                <div className='bg-white p-4 rounded-md'>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8.00023L18.3642 5.63609M5.63631 18.364L8.00026 16M17.6566 12H21M3 12H6.34315M12 6.34342L12 3M12 21L12 17.6569M8.00023 8.00023L5.63609 5.63609M18.364 18.364L16 16" stroke="#363853" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>}
        </>
    );
};

export default ReactViews;