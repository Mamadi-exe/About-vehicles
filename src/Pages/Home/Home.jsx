import Banner from "../../components/Banner/Banner";
import Bio from "../../components/Bio/Bio";
import Facts from "../../components/Facts/Facts";
import Footer from "../../components/Footer/Footer";
import Navigationbar from "../../components/Navbar/Navbar";
import React from "react";

export default function Home(){
    return(
        <div>
            <Navigationbar/>
            <Banner/>
            <Bio/>
            <Facts/>
            <Footer/>
        </div>
        
    )
}