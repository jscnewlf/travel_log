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
        <div className='flex flex-row flex-wrap justify-between pb-32'>
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
                        <div className='flex flex-row w-[100%] justify-between mb-36'>
                            <div className='max-w-[30vw] flex flex-col justify-between'>
                                <h2 className='font-cardo text-[5vw] font-black leading-[0.9]'>{principalArticle.title}</h2>
                                <p>{principalArticle.subtitle}</p>
                                <a className="text-[21px] bg-dark text-white border-dark py-1 w-[200px] block text-center rounded-md hover:opacity-90" href="#reserve">Reserve Ticket</a>
                            </div>
                            <img className="h-[28vw] w-[55%] object-cover" src={principalArticle.image} alt={principalArticle.title} />
                        </div>
                    )}
                    {limitedOtherArticles.map((articleItem, index) => (
                        <div className='flex flex-col max-w-xs'>
                            <img className="object-cover" src={articleItem.image} alt={articleItem.title} />
                            <span className='w-16 h-1 bg-dark mt-6 mb-2'></span>
                            <h3 className='text-[30px] font-cardo font-extrabold mb-5'>{articleItem.title}</h3>
                            <p className='max-w-[450px]'>{articleItem.subtitle}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
