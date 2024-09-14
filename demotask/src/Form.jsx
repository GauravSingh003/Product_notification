import React, { useState } from "react";
import axios from "axios";

const Form = () => {
    const [extraServices, setExtraServices] = useState([
        "Rafting",
        "Exotic Food",
        "Pick and Drop",
        "BBQ",
        "Breakfast",
    ]);
    const [formData, setFormData] = useState({
        propertyName: "",
        location: "",
        country: "",
        peopleCount: "",
        bedroomCount: "",
        bathroomCount: "",
        price: "",
        view: "",
        type: "",
        description: "",
        extraServices: ["Rafting", "Exotic Food", "Pick and Drop", "BBQ", "Breakfast"]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sending notifications
        try {
            await axios.post("/api/notify-user", {
                to: "endUser@example.com", // user contact info..
                message: `Your order for ${formData.propertyName} has been confirmed.`,
                orderDetails: formData,
            });

            // Notify the delivery boy
            await axios.post("/api/notify-delivery", {
                to: "deliveryBoy@example.com", // Delivery boy contact info..
                message: `You have a new delivery order. Please deliver to ${formData.location}.`,
                deliveryInstructions: formData,
            });

            // Notify the Product supplier
            await axios.post('/api/notify-supplier', {
                to: "supplier@example.com", // Supplier contact info..
                message: `You have an order. please supply ${formData.propertyName} to the user`,
                orderDetails: formData,
            }),

                alert("Notifications sent successfully!");

        } catch (error) {
            console.error("Error sending notifications:", error);
            alert("Failed to send notifications");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Property Details</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-600">Property Name:</label>
                    <input
                        type="text"
                        name="propertyName"
                        value={formData.propertyName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter property name"
                    />
                </div>

                {/* Location */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600">Location (City):</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Country:</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter country code"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Counts */}
                <div className="mb-4 grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-600">People Count:</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            placeholder="2"
                            value={formData.peopleCount}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Bedroom Count:</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            placeholder="2"
                            value={formData.bedroomCount}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Bathroom Count:</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            placeholder="2"
                            value={formData.bathroomCount}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Price Per Night */}
                <div className="mb-4">
                    <label className="block text-gray-600">Price Per Night:</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="222"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                {/* View & Property Type */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600">Select View:</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter view"
                            value={formData.view}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Property Type:</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter type"
                            value={formData.type}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-600">Description:</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        placeholder="Enter description"
                        rows="3"
                        value={formData.propertyName}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Property Images */}
                <div className="mb-4">
                    <label className="block text-gray-600">Property Images (up to 3):</label>
                    <input
                        type="file"
                        className="w-full p-2 border rounded"
                        multiple
                    />
                </div>

                {/* Extra Service */}
                <div className="mb-4">
                    <label className="block text-gray-600">Extra Service:</label>
                    <div className="p-4 border rounded bg-gray-100">
                        {extraServices.map((service, index) => (
                            <div key={index} className="text-gray-700">{service}</div>
                        ))}
                    </div>
                </div>
                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;