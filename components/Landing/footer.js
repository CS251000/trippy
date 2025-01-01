export const FooterPage = () => {
    return (
        <>
            <footer className="bg-black text-white py-6 px-10 font-sans">
                <div className="max-w-screen-3xl mx-auto flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex-1 pr-4 max-w-[850px]">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                            Start Your Real Around The World Journey Today
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your dream place is just a click away. Whether you're looking for a 
                            new place, a historical place, or a chill place, Trippy is here to 
                            assist you every step of the way. Take the first step towards your 
                            real trip planner and explore our available properties or get in 
                            touch with our team for personalized assistance.
                        </p>
                    </div>

                    <div className="mt-4 lg:mt-0">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-semibold text-lg">
                            Explore Places
                        </button>
                    </div>
                </div>

                <div className="max-w-screen-3xl mx-auto mt-6 border-t border-gray-800 pt-2 flex flex-col md:flex-row justify-between items-center text-center lg:text-left">
                    <p className="text-gray-400 text-sm mb-2 md:mb-0">
                        ©2023 Trippy. All Rights Reserved.
                    </p>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                        Terms & Conditions
                    </a>
                </div>
            </footer>
        </>
    );
};
