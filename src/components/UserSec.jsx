export default function UserSec({handle,rating,max_rating,avatar,rank,last_online}) {
    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="md:col-span-3 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {rank}
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">{handle}</h1>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="text-sm text-gray-600 mb-1">Contest Rating</div>
                                <div className="text-xl font-bold text-blue-600">{rating}</div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="text-sm text-gray-600 mb-1">Max Rating</div>
                                <div className="text-xl font-bold text-green-600">{max_rating}</div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="text-sm text-gray-600 mb-1">Last Online</div>
                                <div className="text-sm font-medium text-gray-800">{last_online}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="relative">
                            <img
                                src={avatar}
                                alt="User avatar"
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-gray-300 shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

