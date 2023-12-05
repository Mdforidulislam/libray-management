import Marquee from "react-fast-marquee";

const OutSponsors = () => {
    return (
        <div>
            <div style={{backgroundImage:'url(https://demo.themewinter.com/wp/exhibz/wp-content/uploads/2022/01/sponsor_img.webp)',width:'100%',height:'auto'}}>
                <div>
                    <div className=" p-4 md:p-24 space-y-10 mb-10">
                        <div className=" text-center">
                            <h1 className="text-white "></h1>
                            <h1 className=" text-5xl font-bold text-white">Popular Books</h1>
                        </div>
                        <div className=" gap-7 mt-4">
                            <marquee speed={200}  direction="right">
                                <div className=" flex gap-10">
                                 
                                    <img className="w-[200px] h-[200px]" src="https://c8.alamy.com/comp/EXR4CK/1970s-uk-the-abc-murders-a-hercule-poirot-mystery-by-agatha-christie-EXR4CK.jpg" alt="" />

                                    <img className="w-[200px] h-[200px]" src="https://i.pinimg.com/474x/40/c0/49/40c049bb4d6318e45e9f777ad40e6e32.jpg" alt="" />

                                    <img className="w-[200px] h-[200px]" src="https://www.mlive.com/resizer/CYF8YtCLLISVoDcbqdX0WZSJ55w=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/GRTYC5CKXRECZAGVXB7XRJGECQ.jpg" alt="" />

                                    <img className="w-[200px] h-[200px]" src="https://images-platform.99static.com//ufDCjCcTl-xmsJiFXkRPiEBCsyY=/0x0:1700x1700/fit-in/500x500/99designs-contests-attachments/90/90840/attachment_90840004" alt="" />

                                    <img className="w-[200px] h-[200px]" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/crime-story-book-cover-design-template-e691e074a9197506477c25075f3db8e5_screen.jpg?ts=1698537900" alt="" />

                                    <img className="w-[200px] h-[200px]" src="https://upload.wikimedia.org/wikipedia/en/0/06/Crimeirvinewelsh.jpg" alt="" />

                                    <img className="w-[200px] h-[200px]" src="https://img.buzzfeed.com/buzzfeed-static/static/2022-09/7/19/asset/74625df439e7/sub-buzz-2685-1662577870-2.png?downsize=900:*&output-format=auto&output-quality=auto" alt="" />
                                </div>
                            </marquee>
                            <marquee speed={200}  direction="left">
                                <div className=" flex gap-10 mt-10">
                                <img className="w-[200px] h-[200px]" src="https://c8.alamy.com/comp/EXR4CK/1970s-uk-the-abc-murders-a-hercule-poirot-mystery-by-agatha-christie-EXR4CK.jpg" alt="" />

                                <img className="w-[200px] h-[200px]" src="https://i.pinimg.com/474x/40/c0/49/40c049bb4d6318e45e9f777ad40e6e32.jpg" alt="" />

                                <img className="w-[200px] h-[200px]" src="https://www.mlive.com/resizer/CYF8YtCLLISVoDcbqdX0WZSJ55w=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/GRTYC5CKXRECZAGVXB7XRJGECQ.jpg" alt="" />

                                <img className="w-[200px] h-[200px]" src="https://images-platform.99static.com//ufDCjCcTl-xmsJiFXkRPiEBCsyY=/0x0:1700x1700/fit-in/500x500/99designs-contests-attachments/90/90840/attachment_90840004" alt="" />

                                <img className="w-[200px] h-[200px]" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/crime-story-book-cover-design-template-e691e074a9197506477c25075f3db8e5_screen.jpg?ts=1698537900" alt="" />

                                <img className="w-[200px] h-[200px]" src="https://upload.wikimedia.org/wikipedia/en/0/06/Crimeirvinewelsh.jpg" alt="" />

                                <img className="w-[200px] h-[200px]" src="https://img.buzzfeed.com/buzzfeed-static/static/2022-09/7/19/asset/74625df439e7/sub-buzz-2685-1662577870-2.png?downsize=900:*&output-format=auto&output-quality=auto" alt="" />
                                </div>
                            </marquee>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutSponsors;