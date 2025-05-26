export default function ContestAIHelp() {
    return (
        <main className="flex-1">
            <div className="max-w-7xl mx-auto bg-white rounded-lg p-6 shadow-md mt-6 mb-6">
                <h1 className="text-3xl font-bold mb-4 text-center text-green-700">
                    Contest AI Helper 🤖
                </h1>

                <p className="text-gray-600 text-center mb-6">
                    Paste your contest link below and get insights, difficulty predictions, and recommendations from our AI!
                </p>

                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="text"
                        placeholder="Paste your contest link here..."
                        className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Analyze Contest
                    </button>
                </div>

                <div className="mt-10 p-4 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-2">AI Output:</h2>
                    <p className="text-gray-500 italic">Your results will appear here once you submit a contest link.</p>
                </div>
            </div>
        </main>
    );
}
