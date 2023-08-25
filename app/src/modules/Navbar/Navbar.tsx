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
            <nav className='flex flex-row justify-between pt-20 pb-16 items-center'>
                <ul className='flex flex-row gap-20'>
                    {menuData.map((menuItem, index) => (
                        <li className='first:font-extrabold hover:border-b hover:border-dark transition duration-1000' 
                        key={index}>
                            <a className='text-[21px]' href={menuItem.pageLink}>{menuItem.pageName}</a>
                        </li>
                    ))}
                </ul>
                <a className='text-[21px] border-[3px] border-solid border-dark py-1 w-48 text-center rounded-md transition duration-1000 hover:scale-75 hover:bg-dark hover:text-white' 
                href="#contact-us" title="Contact Us">Contact Us</a>
            </nav>
        </div>
    );
};
