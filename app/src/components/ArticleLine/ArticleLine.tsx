import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ArticleItem {
    title: string;
    subtitle: string;
    image: string;
    isPrincipal: boolean;
}

export default function ArticleLine() {
    const [articleData, setArticleData] = useState<ArticleItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/articles/getData')
            .then(response => {
                const responseData = response.data;
                if (Array.isArray(responseData)) {
                    setArticleData(responseData);
                } else {
                    console.error('não é um array:', responseData);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const principalArticle = articleData.find(article => article.isPrincipal === true);
    const otherArticles = articleData.filter(article => article !== principalArticle);
    const limitedOtherArticles = otherArticles.slice(0, 3);

    return (
        <div className='flex flex-row flex-wrap justify-between pb-32 max-[999px]:justify-around'>
            {isLoading ? (
                <div className='flex flex-row w-[100%] justify-between'>
                    <div>
                        <h2>Loading...</h2>
                        <p>Loading...</p>
                        <a href="#reserve">Reserve Ticket</a>
                    </div>
                    <div className="placeholder-image"></div>
                </div>
            ) : (
                <>
                    {principalArticle && (
                        <div className='flex flex-row w-[100%] justify-between mb-36 max-[999px]:flex-col-reverse max-[999px]:items-center max-[999px]:mb-10' >
                            <div className='max-w-[30vw] flex flex-col justify-between max-[999px]:max-w-[50vw] max-[999px]:text-center max-[480px]:max-w-[80vw]'>
                                <h2 className='font-cardo text-[5vw] font-black leading-[0.9] max-[999px]:mt-10 max-[999px]:mb-5 max-[480px]:text-[35px] max-[480px]:'>{principalArticle.title}</h2>
                                <p>{principalArticle.subtitle}</p>
                                <a className="text-[21px] bg-dark text-white border-dark py-1 w-[200px] block text-center rounded-md hover:opacity-90 max-[999px]:m-auto max-[999px]:mt-5" href="#reserve">Reserve Ticket</a>
                            </div>
                            <img className="h-[28vw] w-[55%] object-cover max-[999px]:w-full max-[999px]:h-[36vw]" src={principalArticle.image} alt={principalArticle.title} />
                        </div>
                    )}
                    {limitedOtherArticles.map((articleItem, index) => (
                        <div className='flex flex-col min-[1000px]:max-w-[26vw] min-[1400px]:max-w-[25vw] max-[999px]:max-w-[40vw] max-[999px]:mt-10 max-[790px]:max-w-none max-[790px]:w-full' key={index}>
                            <img className="object-cover max-[790px]:max-h-[20vw]" src={articleItem.image} alt={articleItem.title} />
                            <span className='w-16 h-1 bg-dark mt-6 mb-2'></span>
                            <h3 className='text-[30px] font-cardo font-extrabold mb-5'>{articleItem.title}</h3>
                            <p className='max-w-[450px] max-[790px]:max-w-none'>{articleItem.subtitle}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
