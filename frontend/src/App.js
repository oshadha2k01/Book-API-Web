import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);

    const searchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search?q=${query}`);
            setBooks(response.data.items);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Number of full stars
        const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Add a half star if decimal >= 0.5
        const emptyStars = 5 - fullStars - halfStar; // Remaining stars

        return (
            <>
                {Array(fullStars)
                    .fill(0)
                    .map((_, i) => (
                        <span key={`full-${i}`} className="text-yellow-500">&#9733;</span> 
                    ))}
                {halfStar === 1 && <span className="text-yellow-500">&#9734;</span>} 
                {Array(emptyStars)
                    .fill(0)
                    .map((_, i) => (
                        <span key={`empty-${i}`} className="text-gray-400">&#9734;</span> 
                    ))}
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-900 text-white py-4 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Retrieve Book Web</h1>
                    <nav>
                        <ul className="flex space-x-4 text-md font-semibold">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">Browse</a></li>
                            <li><a href="#" className="hover:underline">Login</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                {/* Search Book Bar */}
                <div className="mb-6">
                    <div className="flex">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search books here..."
                            className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={searchBooks}
                            className="p-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Search Book List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192"}
                                alt={book.volumeInfo.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold mb-2">{book.volumeInfo.title}</h2>
                                <p className="text-sm text-gray-700">
                                    {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                </p>
                                {book.volumeInfo.averageRating && (
                                    <div className="flex items-center mt-2">
                                        {renderStars(book.volumeInfo.averageRating)}
                                        <span className="ml-2 text-sm text-gray-700">
                                            {book.volumeInfo.averageRating} / 5
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
