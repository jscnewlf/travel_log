import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MenuItem {
    pageName: string;
    pageLink: string;
}

export default function Navbar() {
    const [menuData, setMenuData] = useState<MenuItem[]>([]);

    useEffect(() => {
        axios.get('/api/menu/getData')
            .then(response => {
                setMenuData(response.data.menuPages);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do menu:', error);
            });
    }, []);

    return (
        <div>
            <nav className='flex flex-row justify-between pt-16 pb-36 items-center max-[999px]:pb-20 max-[650px]:justify-center'>
                <ul className='flex flex-row gap-20 max-[999px]:gap-[10%] max-[650px]:gap-5'>
                    {menuData.map((menuItem, index) => (
                        <li className='first:font-extrabold hover:border-b hover:border-dark transition duration-1000' 
                        key={index}>
                            <a className='text-[21px]' href={menuItem.pageLink}>{menuItem.pageName}</a>
                        </li>
                    ))}
                </ul>
                <a className='text-[21px] border-[3px] border-solid border-dark py-1 w-48 text-center rounded-md transition duration-1000 hover:scale-75 hover:bg-dark hover:text-white max-[650px]:hidden' 
                href="#contact-us" title="Contact Us">Contact Us</a>
            </nav>
        </div>
    );
};
