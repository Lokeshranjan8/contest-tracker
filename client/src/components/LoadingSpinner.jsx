export default function LoadingSpinner({ title = "Loading", subtitle = "Please wait..." }) {
    return (
        <main className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center max-w-md mx-auto">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 rounded-full"></div>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm sm:text-base text-gray-600 break-words">{subtitle}</p>
            </div>
        </main>
    );
}
