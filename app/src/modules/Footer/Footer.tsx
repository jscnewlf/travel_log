import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FooterItem {
    pageName: string;
    pageLink: string;
}
interface CopyItem {
    textLine: string;
}

export default function Navbar() {
    const [footerData, setFooterData] = useState<FooterItem[]>([]);
    const [copyData, setCopyData] = useState<CopyItem>();
    useEffect(() => {
        axios.get('/api/footer/getData')
            .then(response => {
                setFooterData(response.data.footerLink);
                setCopyData(response.data.footerCopyright);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do menu:', error);
            });
    }, []);

    return (
        <div>
            <div className='flex flex-col justify-between items-center pt-20'>
                <div className='flex flex-row justify-between w-[100%] gap-24 items-start'>

                    <img src="http://localhost:8080/images/logo.png" alt="" />

                    <div className='max-w-screen-xl w-[100%]'>
                        <h4 className='font-extrabold mb-5'>Quick Links</h4>
                        <ul className='flex flex-col  max-h-20 flex-wrap  content-between '>
                            {footerData.map((footerItem, index) => (
                                <li className='w-fit hover:border-b hover:border-dark transition duration-1000'
                                    key={index}>
                                    <a className='text-[16px]' href={footerItem.pageLink}>{footerItem.pageName}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mt-20 mb-10'>
                    {copyData && <p>{copyData.textLine}</p>}
                </div>
            </div>
        </div>
    );
};
