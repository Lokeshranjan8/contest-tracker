import leetcode_logo from "../assets/leetcode_logo.001.jpeg";
export default function Card({title,platform,starttime,Link}){   
    
    return (
        <div className="bg-blue-500 rounded-lg shadow-md p-4 w-[350px] flex flex-col items-center justify-between">
            <div className="item-center w-full mb-2">
                <h2 className="font-semi-bold  text-xl text-white-300 ">{title}</h2>
            </div>
            <p className="text-gray-1100 flex justify-center py-5 text-2xl font-bold">{platform}</p>
            <div className="w-full mb-4">
                <img src={leetcode_logo} alt='' className="h-25 w-auto  object-contain" />
            </div>
            <p className="text-sm text-gray-200 mb-6">{starttime}</p>
            <a 
              href={Link}
              target=""
              className="mt-auto hover-blue text-emerald-900 hover:bg-green-700 transition-colors rounded-lg shadow-md inline-block font-medium px-4 py-2 
                        bg-emerald-600 text-white"
            >
                GO TO THE CONTEST
            </a>
        </div>
    )

}