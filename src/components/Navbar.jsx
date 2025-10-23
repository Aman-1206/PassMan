import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between p-3 bg-black w-full'>
            <h1 className="text-2xl font-bold text-green-400 font-mono relative">
                &lt;Pass<span className="text-white">MAN/</span>&gt;
                <span className="absolute animate-ping ml-1 text-green-600">|</span>
            </h1>


            <div className="github ">
                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="bg-green-600 hover:bg-green-700 transition rounded-md px-3 py-1 flex justify-center items-center gap-2 cursor-pointer">
                        <lord-icon
                            src="https://cdn.lordicon.com/lllcnxva.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                        <span className="font-bold text-white">Github</span>
                    </button>
                </a>
            </div>

        </nav>
    )
}

export default Navbar