export default function UserSec({handle,rating,max_rating,avatar,rank,problemsolved,last_online}) {
    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3 sm:p-4 lg:p-6 mt-6">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">

                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded w-fit">
                                {rank}
                            </div>
                            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 break-all">{handle}</h1>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Contest Rating</div>
                                <div className="text-lg sm:text-xl font-bold text-blue-600">{rating}</div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Max Rating</div>
                                <div className="text-lg sm:text-xl font-bold text-green-600">{max_rating}</div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Problem Solved</div>
                                <div className="text-lg sm:text-xl font-bold text-green-600">{problemsolved}</div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200 sm:col-span-2 xl:col-span-1">
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Last Online</div>
                                <div className="text-xs sm:text-sm font-medium text-gray-800 break-words">{last_online}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end order-first lg:order-last">
                        <div className="relative">
                            <img
                                src={avatar}
                                alt="User avatar"
                                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-2 border-gray-300 shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

