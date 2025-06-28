export default function UserSec({handle,rating,max_rating,avatar,rank,last_online}) {
    return (
        <div className="bg-emerald-500 text-black font-sans p-4">
            <div className="max-w-5xl mx-auto mt-6 border border-gray-300 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="md:col-span-2 space-y-2">
                    <div className="text-sm font-semibold text-gray-600">{rank}</div>
                    <div className="text-2xl font-extrabold text-gray-700">{handle}</div>


                    <div className="flex items-center space-x-2">
                        <img
                            src="https://storage.googleapis.com/a1aa/image/7795e209-05f7-4277-d415-88c1b3d17267.jpg"
                            alt="Contest rating"
                            className="w-5 h-5"
                        />
                        <div>
                            <span className="font-semibold">Contest rating:</span>{" "}
                            <span className="font-bold">{rating}</span>{" "}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://storage.googleapis.com/a1aa/image/7795e209-05f7-4277-d415-88c1b3d17267.jpg"
                            className="w-5 h-5"
                        />
                        <div>
                            <span className="font-semibold">Max rating:</span>{" "}
                            <span className="font-bold">{max_rating}</span>{" "}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://storage.googleapis.com/a1aa/image/7795e209-05f7-4277-d415-88c1b3d17267.jpg"
                            className="w-5 h-5"
                        />
                        <div>
                            <span className="font-semibold">Last Online:</span>{" "}
                            <span className="font-bold">{last_online}</span>{" "}
                        </div>
                    </div>

                </div>

                <div className="border border-gray-300 flex flex-col items-center justify-center p-4">
                    <img
                        src={avatar}
                        alt="User avatar"
                        className="w-30 h-30"
                    />
                </div>
            </div>
        </div>
    );
};

