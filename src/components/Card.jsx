import leetcode_logo from "../assets/leetcode_logo.001.jpeg";
export default function Card({ title, platform, starttime, Link }) {   
    return (
        <div className="bg-blue-500 rounded-2xl shadow-lg p-5 max-w-sm w-full flex flex-col items-center text-white transition-transform hover:scale-[1.02] min-h-[450px]">
            <h2 className="text-sm font-semibold text-center truncate">{title}</h2>
            <p className="text-gray-1100 mb-4 py-5 text-2xl font-bold">{platform}</p>
            <div className="w-full flex justify-center mb-5 min-h-[100px]">
                <img src={leetcode_logo} alt='' className="h-25 w-auto object-contain" />
            </div>
            <p className="text-sm text-gray-200 mb-6">{starttime}</p>
            <a 
              href={Link}
              target="_blank" rel="noopener noreferrer"
              className="mt-auto hover-blue text-emerald-900 hover:bg-green-700 transition-colors rounded-lg shadow-md inline-block font-medium px-4 py-2 
                        bg-emerald-600 text-white"
            >
                GO TO THE CONTEST
            </a>
        </div>
    );
}