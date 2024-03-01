import axios from '../../lib/axios.js';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const [file, setFile] = useState({});
    const [error, setError] = useState({});
    const [success, setSuccess] = useState({});

    const fetchProducts = useCallback(() => {
        axios
            .get('/api/admin/products', {
                params: {
                    page,
                },
            })
            .then((res) => {
                setData(res.data);
                setProducts(res.data.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center max-w-7xl mx-auto h-screen">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure?')) {
            axios.delete('/api/admin/variants/' + id).then(() => {
                fetchProducts();
            });
        }
    };

    const handlePublish = (id) => {
        axios.post('/api/admin/variants/' + id + '/publish').then(() => {
            fetchProducts();
        });
    };

    const handleUnpublish = (id) => {
        axios.post('/api/admin/variants/' + id + '/unpublish').then(() => {
            fetchProducts();
        });
    };

    const handleProductImport = () => {
        if (!file) {
            alert('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios
            .post('/api/admin/products/import', formData)
            .then((res) => {
                setSuccess(res.data);
                setFile({});
                fetchProducts();
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setError(err.response.data.errors);
                    return;
                }

                if (err.response.status === 500) {
                    setError({ message: 'Something went wrong' });
                    return;
                }
            });
    };

    return (
        <div className="space-y-4 w-full max-w-7xl mx-auto">
            <div className="flex justify-end space-x-2">
                <label htmlFor="my_modal_7" className="btn btn-success">
                    Import
                </label>
                <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Product import</h3>
                        <input
                            onChange={(event) => setFile(event.target.files[0])}
                            accept=".xlsx"
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full max-w-md mt-2"
                        />
                        {success && (
                            <div>
                                <p className="text-success">{success.message}</p>
                            </div>
                        )}
                        {error && (
                            <div>
                                <p className="text-error">{error.message}</p>
                            </div>
                        )}
                        <div className="flex justify-end items-center mt-6">
                            <button onClick={handleProductImport} className="btn btn-success">
                                Import Product
                            </button>
                        </div>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">
                        Close
                    </label>
                </div>
                <Link to="/admin/products/create" className="btn btn-outline btn-success">
                    Create Product
                </Link>
            </div>
            {products.map((product) => (
                <div key={product.id} className="collapse bg-base-300 border border-primary/50 overflow-x-auto">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title peer-checked:bg-primary peer-checked:text-primary-content">
                        {product.id}. {product.brand.name} - {product.name}
                    </div>
                    <div className="collapse-content space-y-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Color</th>
                                    <th>Price</th>
                                    <th>Published</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.variants.map((variant) => (
                                    <tr key={variant.id}>
                                        <td>{variant.id}</td>
                                        <td>
                                            <img
                                                src={JSON.parse(variant.images)[0]}
                                                alt=""
                                                className="w-14 rounded-lg"
                                            />
                                        </td>
                                        <td>{variant.color.name}</td>
                                        <td>${variant.price}</td>
                                        <td>
                                            <div className="">
                                                {variant.published ? (
                                                    <button
                                                        onClick={() => handleUnpublish(variant.id)}
                                                        className="btn btn-success btn-xs"
                                                    >
                                                        Unpublish
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handlePublish(variant.id)}
                                                        className="btn btn-success btn-outline btn-xs"
                                                    >
                                                        Publish
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="flex space-x-2">
                                            <Link
                                                to={'/admin/variants/' + variant.id + '/edit'}
                                                className="btn btn-info btn-outline btn-xs"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(variant.id)}
                                                className="btn btn-error btn-outline btn-xs"
                                            >
                                                Delete
                                            </button>
                                            <Link
                                                to={'/products/' + variant.id}
                                                disabled={!variant.published}
                                                className="btn btn-success btn-outline btn-xs"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-2">
                            <Link
                                to={'/admin/products/' + product.id + '/variants/create'}
                                className="btn btn-accent btn-outline btn-sm"
                            >
                                Add variant
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            <div className="join grid grid-cols-2">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!data.prev_page_url}
                    className="join-item btn btn-outline"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!data.next_page_url}
                    className="join-item btn btn-outline"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Index;
