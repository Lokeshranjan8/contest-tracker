import codeforce_logo from "../assets/CodeForces_Cover.jpg";
import leetcode_logo from "../assets/leetcode_logo.001.jpeg";
export default function Card({ title, platform, starttime, Link }) {   
    const logo= platform ==="Codeforces" ? codeforce_logo : leetcode_logo; 
    return (
        <div className="bg-neutral-800 rounded-2xl shadow-lg p-4 sm:p-5 max-w-sm w-full flex flex-col items-center text-white transition-transform hover:scale-[1.02] min-h-[400px] max-h-[400px]">
            <h2 className="text-xs sm:text-sm font-semibold text-center leading-tight mb-2 px-2 break-words hyphens-auto overflow-hidden line-clamp-2" 
                style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    wordBreak: 'break-word'
                }}>
                {title}
            </h2>
            <p className="text-gray-100 mb-3 py-2 sm:py-3 text-lg sm:text-xl lg:text-2xl font-bold">{platform}</p>
            <div className="w-full flex justify-center mb-3 flex-1 min-h-[100px] max-h-[140px]">
                <img src={logo} alt='' className="h-20 sm:h-24 lg:h-28 w-auto object-contain" />
            </div>
            <p className="text-xs sm:text-sm text-gray-200 mb-4 text-center px-2 break-words">{starttime}</p>
            <a 
              href={Link}
              target="_blank" rel="noopener noreferrer"
              className="mt-auto hover:bg-green-700 transition-colors rounded-lg shadow-md inline-block font-medium px-4 py-2 
                        bg-emerald-600 text-white text-xs sm:text-sm"
            >
                <span className="hidden sm:inline">GO TO THE CONTEST</span>
                <span className="sm:hidden">GO TO CONTEST</span>
            </a>
        </div>
    );
}