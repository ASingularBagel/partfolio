import React from "react";

const MainFooter = () => {
    return (
        <div className='footer h-12 bg-black bg-opacity-40'>
            <nav>
                <div className="about-list dropdown dropdown-top dropdown-hover">
                    <div tabIndex={0} className="m-1 btn btn-ghost btn-sm rounded-btn">About</div>
                    <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-black text-white">
                        <div className="card-body">
                            <h4 className="card-title">NOT A PIXIV CLONE</h4>
                            <p>This is a project which aims to clone the Pixiv UI 
                                and functions. This is not a commercial project and
                                is only for personal use. This project is not affiliated
                                with Pixiv in any way.
                            </p>
                            <p>
                                That being said, this project is open source and is
                                available on Github. If you want to contribute, please
                                do so.
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
            
        </div>
    )
}

export default MainFooter