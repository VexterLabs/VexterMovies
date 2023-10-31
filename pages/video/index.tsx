import VideoPlayer from "@/components/pcVideo";
import { NextPage } from "next";
import React from "react";

interface IProps {
    url:string
}

const Video: NextPage<IProps> = () => {
    return <>
        <VideoPlayer></VideoPlayer>
    </>
}

export default Video