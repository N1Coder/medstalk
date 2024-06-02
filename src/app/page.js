"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/*
|++++++++++++++++++++++++++++++++|
|           COMPONENTS           |
|++++++++++++++++++++++++++++++++|
*/

import Navbar from "@/components/Navbar";
import YoutubeResult from "@/components/YoutubeResult";
import TiktokResult from "@/components/TiktokResult";

/*
|++++++++++++++++++++++++++++++++|
|           LIBRARIES            |
|++++++++++++++++++++++++++++++++|
*/

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

/*
|++++++++++++++++++++++++++++++++|
|              APIS              |
|++++++++++++++++++++++++++++++++|
*/

import YoutubeGetId from "@/api/YoutubeGetId";
import YoutubeGetDetails from "@/api/YoutubeGetDetails";

export default function Home() {
    // const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    /*
    |++++++++++++++++++++++++++++++++|
    |          Validator             |
    |++++++++++++++++++++++++++++++++|
    */
    
    const [youtubeInput, setYoutubeInput] = useState(true);
    const [tiktokInput, setTiktokInput] = useState(false);
    const [ytUsername, setYtUsername] = useState("");
    const [ttUsername, setTtUsername] = useState("");

    /*
    |++++++++++++++++++++++++++++++++|
    |       YOUTUBE SECTION          |
    |++++++++++++++++++++++++++++++++|
    */
    
    const [ytId, setYtId] = useState(null);
    const [ytAvatar, setYtAvatar] = useState("");
    const [ytTitle, setYtTitle] = useState("");
    const [ytDesc, setYtDesc] = useState("");
    const [ytSubsCount, setYtSubsCount] = useState("");
    const [ytLinks, setYtLinks] = useState();
    const [ytAvatars, setYtAvatars] = useState();
    const [ytVerified, setYtVerified] = useState();
    const [ytHasBusiness, setYtHasBusiness] = useState();
    const [ytViewCount, setYtViewCount] = useState("");
    const [ytCountry, setYtCountry] = useState("");
    const [ytCreationDate, setYtCreationDate] = useState("");

    const youtubeClick = () => {
        setYoutubeInput(true);
        setTiktokInput(false);
        setTtUsername(""); // Hapus username tiktok jika memilih yt
    };

    /*
    |++++++++++++++++++++++++++++++++|
    |        TIKTOK SECTION          |
    |++++++++++++++++++++++++++++++++|
    */

    const [ttId, setTtId] = useState(null);

    const tiktokClick = () => {
        setTiktokInput(true);
        setYoutubeInput(false);
        setYtUsername(""); // Hapus username yt jika memilih tiktok
    };

    /*
    |++++++++++++++++++++++++++++++++|
    |         HANDLE SUBMIT          |
    |++++++++++++++++++++++++++++++++|
    */

    const handleSubmit = async () => {
        setLoading(true);
        if (ytUsername && youtubeInput) {
            const data = await YoutubeGetId(ytUsername);
            const channelId = data.channel_id;
            
            setTimeout(async () => {
                setLoading(false);
                const detail = await YoutubeGetDetails(channelId);
                setYtId(detail.channel_id);
                setYtAvatar(detail.avatar[2].url);
                setYtTitle(detail.title);
                setYtDesc(detail.description);
                setYtSubsCount(detail.subscriber_count);
                setYtLinks(detail.links);
                setYtAvatars(detail.avatar);
                setYtVerified(detail.verified);
                setYtHasBusiness(detail.has_business_email);
                setYtViewCount(detail.view_count);
                setYtCountry(detail.country);
                setYtCreationDate(detail.creation_date);
            }, 2000);
        } else {
            return null;
        }
    };

    /*
        |++++++++++++++++++++++++++++++++|
        |       Not available modal      |
        |++++++++++++++++++++++++++++++++|
    */

    const notAvailableTool = () => {
        withReactContent(Swal).fire({
            title: "Not available!",
            icon: "error",
            text: "Sorry, this tool is not available right now.",
        });
    };

    return (
        <main className="items-center justify-center min-h-screen">
            <section className="relative w-full flex flex-col bg-black min-h-[70vh] hero-sec overflow-hidden rounded-br-[7rem] rounded-bl-[7rem]">
                <div className="absolute inset-0 ">
                    <Image src="/hero.webp" fill={true} className="object-cover brightness-50 saturate-150" alt="hero"></Image>
                </div>

                <Navbar />

                <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-4">
                    <h1 className="text-[4rem] text-white text-center font-hndExtBold">Welcome, mate!</h1>
                    <p className="text-2xl text-white font-hndReg">Please select the available information gathering tools</p>

                    <div className="flex flex-wrap gap-5">
                        <button onClick={youtubeClick} className="flex flex-col items-center px-10 py-10 transition-all bg-white hover:scale-110 hover:shadow-xl rounded-xl">
                            <Image src="/services/yt.png" width={100} height={100} alt="yt" className="m-auto"></Image>
                            <p className="text-2xl">Youtube</p>
                        </button>
                        <button onClick={tiktokClick} className="flex flex-col items-center px-10 py-10 transition-all bg-white hover:scale-110 hover:shadow-xl rounded-xl">
                            <Image src="/services/tiktok.png" width={100} height={100} alt="yt" className="m-auto"></Image>
                            <p className="text-2xl">Tiktok</p>
                        </button>

                        <Tippy content={<span>Not available</span>}>
                            <button onClick={notAvailableTool} className="flex flex-col items-center px-10 py-10 transition-all bg-white opacity-50 cursor-not-allowed hover:scale-110 hover:shadow-xl rounded-xl">
                                <Image src="/services/ig.png" width={100} height={100} alt="yt" className="m-auto"></Image>
                                <p className="text-2xl">Instagram</p>
                            </button>
                        </Tippy>
                    </div>
                </div>
            </section>

            {/* Input */}

            <section className="flex flex-col items-center w-full gap-4 py-4 pb-12 min-h-10">
                <p className="text-2xl font-hndMedium text-[#0a0a0a]">Enter the username below.</p>

                {youtubeInput && <input onChange={(e) => setYtUsername(e.target.value)} className="py-2 text-2xl text-center border-2 border-red-500 outline-none px-7 rounded-2xl font-hndMedium" type="text" name="username" id="username" placeholder="Username here" />}

                {tiktokInput && <input onChange={(e) => setTtUsername(e.target.value)} className="py-2 text-2xl text-center border-2 border-black outline-none px-7 rounded-2xl font-hndMedium" type="text" name="username" id="username" placeholder="Username here" />}

                <button onClick={handleSubmit} className="px-5 py-2 text-white bg-blue-500 rounded-xl">
                    Submit
                </button>
            </section>

            {/* Hasil pelacakan */}

            <section className="flex flex-col items-center w-full min-h-screen">
                <h1 className="text-[3rem] font-hndMedium">Result</h1>

                {loading ? <div className="w-12 h-12 border-4 border-t-4 rounded-full border-t-blue-400 animate-spin"></div> : null}
                
                {ytId && <YoutubeResult ytId={ytId} ytAvatar={ytAvatar} ytTitle={ytTitle} ytDesc={ytDesc} ytSubsCount={ytSubsCount} ytLinks={ytLinks} ytAvatars={ytAvatars} ytVerified={ytVerified} ytHasBusiness={ytHasBusiness} ytViewCount={ytViewCount} ytCountry={ytCountry} ytCreationDate={ytCreationDate} />}
            </section>
        </main>
    );
}
