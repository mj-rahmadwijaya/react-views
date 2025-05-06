import React, { useEffect, useState } from 'react';

const RxdbViews = () => {


    const [data, setData] = useState([]);
    const [subscribeData, setSubscribeData] = useState('');
    const [modal, setModalUpdate] = useState(false);
    const [updateItem, setUpdateItem] = useState({});

    const getItem = async () => {
        const items = await window.electronAPI.getItemDB();
        const x = JSON.parse(items);
        setData(x);
    }

    const insertItemDB = async () => {
        const x = {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            name: 'test',
            done: false,
        };
        window.electronAPI.insertToDB(x);
        setSubscribeData(x)
    }

    const subscribe = async () => { 
        const sub = await window.electronAPI.subscribeItemDB();
        console.log(sub);
    }

    const clickModalUpdate = (item) => {
        setModalUpdate(true);
        setUpdateItem(item);
    }

    const handleUpdate = () => {
        window.electronAPI.updateItemDB(updateItem);
        setModalUpdate(false);
        getItem();
    }

    const modalUpdate = () => {
        return (
            <div className='p-6 fixed inset-0 bg-[#00000085] flex items-center justify-center top-0 left-0'>
                <div className='bg-white p-4 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 overflow-y-auto'>
                    <div className='p-2 border-b-2 relative h-10'>
                        <button className='p-1 cursor-pointer rounded-md border-2 border-gray-300 absolute right-1 top-1' onClick={() => setModalUpdate(false)}>
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" id="cross" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="icon flat-color"><path id="primary" d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>
                        </button>
                    </div>
                    <div className='p-2'>
                        <h4 className='text-lg font-bold uppercase mb-1'>{updateItem.id}</h4>
                        <input type="text" className='w-full p-2 rounded-md border border-gray-300 mb-2' 
                            value={updateItem.name} 
                            onChange={(e) => setUpdateItem({...updateItem, name: e.target.value})} />
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        )
    }

    const deleteItemDB = async (id) => {
        window.electronAPI.deleteItemDB(id);
        getItem();
    }

    useEffect(() => {
        // subscribe();
        getItem();
    }, [subscribeData]);

    return (
        <>
            <div className='sticky top-0 bg-white p-4 border-b border-gray-200 w-full'>
                <button className=' bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer' onClick={insertItemDB}>Insert Item</button>
            </div>
            <div className='p-4 border-b border-gray-200'>
                <div className='flex flex-col gap-2'>
                    {data.map((item) => (
                        <div className='p-2 border-b border-gray-200 relative' key={item.id} >
                            <p className='text-lg font-bold cursor-pointer' onClick={() => clickModalUpdate(item)}>{item.id}</p>
                            <p className='text-sm text-gray-500'>{item.name}</p>
                            <p className='text-sm text-gray-500'>{item.done ? 'Done' : 'Not Done'}</p>
                            <button className='absolute right-10 top-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer' onClick={() => deleteItemDB(item.id)}>
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z" fill="#ffffff"/></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {modal && modalUpdate()}
        </>
    );
};

export default RxdbViews;