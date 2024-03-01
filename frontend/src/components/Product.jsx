import { Link } from 'react-router-dom';
import React from 'react';

const Product = React.forwardRef(({ variant }, ref) => {
    const productBody = (
        <Link to={'/products/' + variant.id} key={variant.id}>
            <div data-test={'product-' + variant.id} className="hover:bg-gray-200 bg-white p-4 rounded-lg shadow-md">
                <img
                    src={variant.main_photo}
                    alt={variant.name}
                    className="w-full object-cover mb-2 rounded-md"
                    loading="lazy"
                />
                <h2 className="dark:text-black text-lg font-bold mb-2">{variant.product.name}</h2>
                <p className="text-gray-700 mb-2">{variant.product.short_description}</p>
                <div className="text-center">
                    <div className="text-red-500 line-through text-sm">${variant.product.price}</div>
                    <div className="text-green-500 font-bold text-xl">${variant.price}</div>
                </div>
            </div>
        </Link>
    );

    return ref ? <article ref={ref}>{productBody}</article> : <article>{productBody}</article>;
});

export default Product;
