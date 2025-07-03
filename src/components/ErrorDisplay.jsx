export default function ErrorDisplay({ 
    title = "Oops! Something went wrong", 
    error, 
    onRetry, 
    retryText = "Try Again" 
}) {
    return (
        <main className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto border border-red-200">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-red-700 mb-2">{title}</h3>
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                )}
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        {retryText}
                    </button>
                )}
            </div>
        </main>
    );
}
