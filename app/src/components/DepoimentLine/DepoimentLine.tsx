import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";

interface DepoimentItem {
    name: string;
    avatar: string;
    comment: string;
}
export default function DepoimentLine() {

    const [depoimentData, setDepoimentData] = useState<DepoimentItem[]>([]);

    useEffect(() => {
        axios.get('/api/depoiments/getData')
            .then(response => {
                const responseData = response.data;
                if (Array.isArray(responseData)) {
                    setDepoimentData(responseData);
                } else {
                    console.error('não é um array:', responseData);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados', error);
            })
    }, []);

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 2500,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 748,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    return (
        <div className='py-16 max-w-5xl m-auto'>
            <h2 className='font-cardo font-extrabold text-center text-[80px] max-w-2xl leading-[1] m-auto mb-14 min-[2198px]:max-w-3xl min-[2100px]:text-[4vw]'>Here's what they have to say...</h2>
            <Slider {...settings}>
                {depoimentData.map((depoimentItem, index) => (
                    <div className="border-2 border-solid border-dark rounded-lg py-16 px-3 w-[300px!important] m-auto h-96">
                        <img className="rounded-full m-auto" src={depoimentItem.avatar} alt="Avatar" />
                        <h4 className='font-extrabold text-xl my-5'>{depoimentItem.name}</h4>
                        <p className='text-center'>{depoimentItem.comment}</p>
                    </div>

                ))}
            </Slider>
        </div>
    );
};

