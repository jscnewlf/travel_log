import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface InspirationalItem {
    mainTitle: string,
    secondaryTitle: string,
    secondaryParagraph: string,
    tertiaryTitle: string,
    tertiaryParagraph: string,
    image: string,
    imageAlt: string
}

export default function InspirationalFrame() {
    const [inspirationalData, setInspirationalData] = useState<InspirationalItem[]>([]);

    useEffect(() => {
        axios.get('/api/inspirational/getData')
            .then(response => {
                setInspirationalData(response.data.inspirationalContent);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do menu:', error);
            });
    }, []);

    return (
        <div>
            {inspirationalData.map((inspirationalItem, index) => (
                <div key={index}>
                    <div className='flex flex-row  justify-between py-28 items-center'>
                        <div className='max-w-[35%] text-justify flex flex-col justify-between'>
                            <h2 className='text-white font-cardo font-extrabold text-5xl mb-16 text-start'>{inspirationalItem.mainTitle}</h2>
                            <div>
                            <h4 className='text-white font-extrabold text-xl mb-3'>{inspirationalItem.secondaryTitle}</h4>
                            <p className='text-white'>{inspirationalItem.secondaryParagraph}</p>
                            </div>
                            <div>
                                <h4 className='text-white font-extrabold text-xl mb-3 mt-10'>{inspirationalItem.tertiaryTitle}</h4>
                                <p className='text-white'>{inspirationalItem.tertiaryParagraph}</p>
                            </div>
                        </div>
                        <div className='max-w-3xl  max-[1330px]:w-[55vw]'>
                            <img src={inspirationalItem.image} alt={inspirationalItem.imageAlt} />
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};
