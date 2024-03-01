import { useEffect, useState } from 'react';
import axios from '../../lib/axios.js';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    // const [colors, setColors] = useState([]);
    // const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    // const [variantData, setVariantData] = useState([]);
    const navigate = useNavigate();

    // function fetchSizes() {
    //     axios
    //         .get('/api/admin/sizes')
    //         .then((res) => {
    //             setSizes(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    // function fetchColors() {
    //     axios
    //         .get('/api/admin/colors')
    //         .then((res) => {
    //             setColors(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    function fetchCategories() {
        axios
            .get('/api/admin/categories')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function fetchBrands() {
        axios
            .get('/api/admin/brands')
            .then((res) => {
                setBrands(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        // fetchColors();
        // fetchSizes();
        fetchCategories();
        fetchBrands();
    }, []);

    // const handleColorChange = (index, event) => {
    //     const colorId = event.target.value;
    //     const isColorUsed = variantData.some((variant, variantIndex) =>
    //         variantIndex !== index && variant.color === colorId
    //     );
    //
    //     if (!isColorUsed) {
    //         const newVariantData = [...variantData];
    //         newVariantData[index].color = colorId;
    //         setVariantData(newVariantData);
    //     } else {
    //         alert('!This color is being used in another variant!');
    //     }
    // };
    //
    // const handlePriceChange = (index, event) => {
    //     const newVariantData = [...variantData];
    //     newVariantData[index].price = event.target.value;
    //     setVariantData(newVariantData);
    // };
    //
    // const handleSizeCheck = (index, sizeId, event) => {
    //     const newVariantData = [...variantData];
    //     newVariantData[index].sizes[sizeId] = event.target.checked;
    //     setVariantData(newVariantData);
    // };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // const handleAddVariant = () => {
    //     setVariantData([
    //         ...variantData,
    //         {
    //             color: "",
    //             price: "0",
    //             sizes: sizes.reduce((acc, size) => ({ ...acc, [size.id]: false }), {}),
    //         },
    //     ]);
    // };

    const handleSave = () => {
        if (!name) {
            alert('Name is required');
            return;
        }

        if (!description) {
            alert('Description is required');
            return;
        }

        if (!price) {
            alert('Price is required');
            return;
        }

        if (!brand) {
            alert('Brand is required');
            return;
        }

        if (!category) {
            alert('Category is required');
            return;
        }
        axios
            .post('/api/admin/products', {
                name: name,
                price: price,
                description: description,
                category_id: category,
                brand_id: brand,
            })
            .then(() => {
                navigate('/admin/products');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const handleRemoveVariant = (index) => {
    //     setVariantData(prevState => prevState.filter((_, i) => i !== index));
    // };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-4xl pt-40">
                    <div className="space-y-8">
                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Name</span>
                                </div>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Enter name..."
                                    className="input input-bordered input-primary"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Price</span>
                                </div>
                                <input
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    min="1"
                                    placeholder="Set price..."
                                    className="input input-bordered input-primary"
                                    required
                                />
                            </label>
                        </div>

                        <div className="flex space-x-2">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Category</span>
                                </div>
                                <select
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    className="select select-primary"
                                    aria-placeholder="Choose category"
                                    required
                                >
                                    <option value="" disabled>
                                        Choose category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {capitalizeFirstLetter(category.name)}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Brand</span>
                                </div>
                                <select
                                    value={brand}
                                    onChange={(event) => setBrand(event.target.value)}
                                    className="select select-primary"
                                    aria-placeholder="Choose brand"
                                    required
                                >
                                    <option value="" disabled>
                                        Choose brand
                                    </option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {capitalizeFirstLetter(brand.name)}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Description</span>
                                </div>
                                <textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    minLength="10"
                                    className="textarea textarea-primary"
                                    rows="6"
                                    placeholder="Fill the description..."
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <div className=" mt-2">
                        <button type="submit" onClick={handleSave} className="w-full btn btn-success">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Create;
