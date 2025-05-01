import React, { useEffect, useState } from 'react';

const ElectronViews = () => {
    // create state management
    const [data, setData] = useState({
        productCategoryList: [],
        product: [],
        categoryName: '',
        modal: false,
        loading: false
    }); 
    const { productCategoryList, product, categoryName, modal, loading } = data;
    const setDataState = (newData) => {
        setData(prevData => ({ ...prevData, ...newData }));
    };

    const getProductCategoryList = async () => {
        setDataState({
            loading: true
        });
        const products = await window.electronAPI.fetchProductCategoryList();
        setDataState({
            productCategoryList: products,
            loading: false
        });
    };

    const getProductByCategory = async (category) => {
        setDataState({
            categoryName: category,
            loading: true
        });
        const products = await window.electronAPI.fetchProductByCategory(category); 
        setDataState({
            product: products.products,
            modal: true,
            loading: false
        });
    };

    const modalProduct = () => {
        return (
            <div className='p-6 fixed inset-0 bg-[#00000085] flex items-center justify-center top-0 left-0'>
                <div className='bg-white p-4 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 overflow-y-auto'>
                    <div className='p-2 border-b-2 relative'>
                        <h4 className='text-lg font-bold uppercase'>{categoryName}</h4>
                        <button className='p-1 cursor-pointer rounded-md border-2 border-gray-300 absolute right-1 top-1' onClick={() => setDataState({ modal: false })}>
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" id="cross" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="icon flat-color"><path id="primary" d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>
                        </button>
                    </div>
                    <div className='p-2'>
                        {product.map((item) => (
                            <div key={item.id} className='p-2 border-b border-gray-200'>
                                <img src={item.thumbnail} alt={item.title} className='w-1/2 h-1/2 object-cover mx-auto' />
                                <h4 className='text-lg font-bold'>{item.title}</h4>
                                <p className='text-sm text-gray-500'>{item.description}</p>
                                <p className='text-sm text-gray-500'>{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    
    useEffect(() => {
        getProductCategoryList ()
    }, []);

    return (
        <>
            <div className='p-4 border-b border-gray-200 cursor-pointer'>
                {productCategoryList.map((product) => (
                    <div onClick={() => getProductByCategory(product)} key={product} className='p-2 mb-2 rounded-md border border-gray-200 cursor-pointer'>{product}</div>
                ))}
            </div>
            {modal && modalProduct()}
            {loading && <div className='p-6 fixed inset-0 bg-[#00000085] flex items-center justify-center'>
                <div className='bg-white p-4 rounded-md'>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8.00023L18.3642 5.63609M5.63631 18.364L8.00026 16M17.6566 12H21M3 12H6.34315M12 6.34342L12 3M12 21L12 17.6569M8.00023 8.00023L5.63609 5.63609M18.364 18.364L16 16" stroke="#363853" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>}
        </>
    );
};

export default ElectronViews;