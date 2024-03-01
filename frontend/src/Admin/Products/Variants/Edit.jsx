import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../lib/axios.js';

function Edit() {
    const id = useParams().id;
    const [price, setPrice] = useState('');
    const [published, setPublished] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState(Array(6).fill(null));
    const [imagePreviews, setImagePreviews] = useState(Array(6).fill(null));
    const [tabIndex, setTabIndex] = useState(0);
    const [variants, setVariants] = useState([]);

    const handleSizeChange = (id, checked) => {
        setVariants((prevVariants) => {
            if (checked) {
                // If the checkbox is selected, add a new variant object
                return [...prevVariants, { id, selected: true, quantity: 1 }];
            } else {
                // If the checkbox is deselected, remove the variant from the array
                return prevVariants.filter((v) => v.id !== id);
            }
        });
    };

    const handleQuantityChange = (id, value) => {
        setVariants((prevVariants) => prevVariants.map((v) => (v.id === id ? { ...v, quantity: value } : v)));
    };

    const navigate = useNavigate();

    const handleImagesChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImages(images.map((img, i) => (i === index ? file : img)));
            setImagePreviews(imagePreviews.map((img, i) => (i === index ? reader.result : img)));
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImagePreviews(imagePreviews.map((img) => img));
        }
    };

    const fetchVariant = useCallback(() => {
        axios
            .get(`/api/admin/variants/${id}`)
            .then((res) => {
                setPrice(res.data.price);
                setPublished(res.data.published);

                const options = res.data.options;

                setVariants(
                    options.map((option) => {
                        return {
                            id: option.size_id,
                            selected: true,
                            quantity: option.quantity,
                        };
                    }),
                );

                const variantImages = JSON.parse(res.data.images) || [];
                variantImages.map((url, index) => {
                    setImagePreviews(imagePreviews.map((img, i) => (i === index ? url : img)));
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const fetchSizes = () => {
        axios.get('/api/admin/sizes').then((res) => {
            setSizes(res.data);
        });
    };

    useEffect(() => {
        fetchVariant();
        fetchSizes();
    }, [fetchVariant]);

    const handleSave = () => {
        if (!variants.length) {
            alert('Add at least one variant');
            return;
        }

        if (!price) {
            alert('Choose price !');
            return;
        }

        if (!images.length) {
            alert('Add at least one image!');
            return;
        }

        const formData = new FormData();

        formData.append('price', price);
        formData.append('published', published);

        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        variants.forEach((variant) => {
            formData.append(`variants[${variant.id}]`, variant.quantity);
        });

        formData.append('_method', 'PATCH');

        axios
            .post('/api/admin/variants/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                navigate('/admin/products');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div role="tablist" className="tabs tabs-bordered">
            <input
                checked={tabIndex == 0}
                value="0"
                onChange={(e) => setTabIndex(e.target.value)}
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-xl"
                aria-label="General"
            />
            <div role="tabpanel" className="tab-content p-10">
                <div className="w-full max-w-4xl">
                    <div className="space-y-8">
                        <div className="flex space-x-2">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Price</span>
                                </div>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    min="1"
                                    placeholder="Set price..."
                                    className="input input-bordered input-primary"
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <label className="cursor-pointer label">
                                <span className="label-text mr-2">Published</span>
                                <input
                                    checked={published}
                                    onChange={(event) => setPublished(event.target.checked)}
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                />
                            </label>
                        </div>
                    </div>
                    <h2 className="font-bold text-lg mb-4 mt-10">Images</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {imagePreviews.map((image, index) => (
                            <div key={index}>
                                <input
                                    id={`file-input-${index}`}
                                    onChange={(event) => handleImagesChange(event, index)}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                                <label htmlFor={`file-input-${index}`}>
                                    {image ? (
                                        <img className="w-72 max-h-40 rounded-xl" src={image} alt="Preview" />
                                    ) : (
                                        <img
                                            className="w-72 cursor-pointer rounded-xl bg-gray-200"
                                            src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png"
                                            alt="Placeholder"
                                            title="Click to upload"
                                        />
                                    )}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className=" mt-2">
                        <button type="submit" onClick={handleSave} className="w-full btn btn-success">
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <input
                checked={tabIndex == 1}
                value="1"
                onChange={(e) => setTabIndex(e.target.value)}
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-xl"
                aria-label="Variants"
            />
            <div role="tabpanel" className="tab-content p-10">
                <div className="space-y-4 max-w-xl">
                    {sizes.map((size) => (
                        <div key={size.id} className="flex justify-between items-center">
                            <div className="flex space-x-2">
                                <input
                                    onChange={(e) => handleSizeChange(size.id, e.target.checked)}
                                    id={size.id}
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                />
                                <label htmlFor={size.id} className="form-control cursor-pointer">
                                    {size.name.toUpperCase()}
                                </label>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Quantity..."
                                    className="input input-bordered input-primary"
                                    id={size.id}
                                    onChange={(e) => handleQuantityChange(size.id, e.target.value)}
                                    value={variants.find((v) => v.id === size.id)?.quantity || ''} // Display the quantity if it exists in the state
                                    disabled={!variants.find((v) => v.id === size.id)?.selected} // Disable the input if the checkbox isn't selected
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Edit;
