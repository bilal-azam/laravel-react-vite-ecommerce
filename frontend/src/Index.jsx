import { useCallback, useRef } from 'react';
import axios from './lib/axios.js';
import Product from './components/Product.jsx';
import { useInfiniteQuery } from '@tanstack/react-query';

function Index() {
    const fetchVariants = useCallback(async ({ pageParam = 1 }) => {
        const res = await axios.get('api/feature-products', {
            params: {
                page: pageParam,
            },
        });

        return res.data;
    }, []);

    const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery({
        queryKey: ['variants'],
        queryFn: fetchVariants,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.current_page + 1;
        },
    });

    const intObserver = useRef();
    const lastProductRef = useCallback(
        (product) => {
            if (intObserver.current) {
                intObserver.current.disconnect();
            }

            intObserver.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            if (product) {
                intObserver.current.observe(product);
            }
        },
        [hasNextPage, fetchNextPage],
    );

    const skeleton = () => {
        const skeletons = [];

        for (let i = 0; i < 20; i++) {
            skeletons.push(
                <div className="flex flex-col gap-4 w-52" key={i}>
                    <div className="skeleton w-96 h-96"></div>
                </div>,
            );
        }

        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{skeletons}</div>;
    };

    if (isLoading) {
        return skeleton();
    }

    if (isError) {
        // Handle error state
        console.error(error);
        return <div>Error loading data</div>;
    }

    if (!data.pages.length) {
        return (
            <div data-test="no-products" className="flex justify-center items-center max-w-7xl mx-auto">
                No products found...
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.pages.map((pageData, i) =>
                    pageData.data.map((variant, index) => {
                        const isLastVariant = i === data.pages.length - 1 && index === pageData.data.length - 1;
                        return (
                            <Product
                                ref={isLastVariant ? lastProductRef : null}
                                variant={variant}
                                key={`${variant.id}-${index}`}
                            />
                        );
                    }),
                )}
            </div>
        </div>
    );
}

export default Index;
