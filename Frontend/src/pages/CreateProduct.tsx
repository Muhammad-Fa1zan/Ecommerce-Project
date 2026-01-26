import { useState, type FormEvent } from 'react';
import {
    Upload,
    Save,
    Package,
    Tag,
    DollarSign
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

const CreateProduct = () => {

    const { user } = useAuth();

    console.log(user?.token);

    const [popup, setPopup] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stockCount: "",
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImages(Array.from(e.target.files))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("stockCount", form.stockCount);

        if (images[0]) {
            formData.append('image', images[0])
        };

        try {
            await axios.post(
                '/api/item/create-product',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                    },
                    withCredentials: true
                }
            );

            setPopup(true)
        } catch (error) {
            throw new Error('Failed to create Product')
        } finally {
            setTimeout(() => {
                setPopup(false)
            }, 2000)
        };


    }


    return (

        <>
            <div>
                {popup && <h1 className='text-green-500 text-3xl absolute '>Product Created</h1>}
            </div>
            <form
                onSubmit={handleSubmit}
                className="min-h-screen bg-slate-50 p-6 lg:p-10"
            >
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between mb-10">
                        <h1 className="text-2xl font-bold">Create New Product</h1>
                        <button
                            type="submit"
                            className="px-5 cursor-pointer py-2.5 bg-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2"
                        >
                            <Save className="size-4" />
                            Publish Product
                        </button>
                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* General */}
                            <section className="bg-white p-8 rounded-2xl">
                                <h2 className="font-bold mb-4 flex items-center gap-2">
                                    <Package className="size-5 text-indigo-600" />
                                    General Information
                                </h2>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    className="w-full mb-4 px-4 py-3 border rounded-xl"
                                />

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    rows={4}
                                    className="w-full px-4 py-3 border rounded-xl"
                                />
                            </section>

                            {/* Images */}
                            <section className="bg-white p-8 rounded-2xl">
                                <h2 className="font-bold mb-4 flex items-center gap-2">
                                    <Upload className="size-5 text-indigo-600" />
                                    Product Image
                                </h2>

                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </section>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-8">
                            <section className="bg-white p-8 rounded-2xl">
                                <h2 className="font-bold mb-4 flex items-center gap-2">
                                    <DollarSign className="size-5 text-indigo-600" />
                                    Pricing
                                </h2>

                                <input
                                    name="price"
                                    type="number"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="Price"
                                    className="w-full mb-4 px-4 py-3 border rounded-xl"
                                />

                                <input
                                    name="stockCount"
                                    type="number"
                                    value={form.stockCount}
                                    onChange={handleChange}
                                    placeholder="Stock"
                                    className="w-full px-4 py-3 border rounded-xl"
                                />
                            </section>

                            <section className="bg-white p-8 rounded-2xl">
                                <h2 className="font-bold mb-4 flex items-center gap-2">
                                    <Tag className="size-5 text-indigo-600" />
                                    Category
                                </h2>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-xl"
                                >
                                    <option value="">Select category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                </select>
                            </section>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CreateProduct;