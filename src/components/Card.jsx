
export default function Card({title,platform,starttime,Link}){    
    
    return (
        <div className="bg-blue-500 rounded-lg shadow-md p-4 w-[350px] h-[400px] ">
            <h2 className="text-lg font-bold flex justify-center mt-5">{title}</h2>
            <p className="text-gray-700 flex justify-center">{platform}</p>
            <p className="text-gray-700 flex justify-center ">{starttime}</p>
            <a 
              href={Link}
              target=""
              className="hover-blue text-black-500 rounded-lg shadow-md inline-block mt-[230px] flex justify-center
                        bg-emerald-600 text-white"
            >
                GO TO THE CONTEST
            </a>
        </div>
    )

}