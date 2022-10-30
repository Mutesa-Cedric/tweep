import React, { useState, useEffect } from 'react';
import PersonToFollow from "./PersonToFollow";
import axios from "../../axios.config"
import useAuth from '../hooks/useAuth';

let WhoToFollow = (props) => {
    const [peopleToFollow, setPeopleToFollow] = useState([]);
    const { user } = useAuth();

    const getPeopleToFollow = async () => {
        await axios.get(`/getMostFollowedUsers/${user.userName}`).then(({ data }) => {
            setPeopleToFollow(data.profiles);
        })
    }

    useEffect(() => {
        getPeopleToFollow();
    }, [])

    const finishedFollowing = () => {
        getPeopleToFollow();
    }

    return (
        <div className="mt-3">
            <div
                className={"bg-white rounded-xl shadow-sm lg:flex lg:flex-col sm:hidden  dark:bg-inherit"}>
                <div
                    className={props.fixSide ? "w-[320px] h-auto top-[64px]  fixed  bg-inherit mt-6 rounded-xl shadow-md  px-6 py-2" : "w-[320px] h-auto  bg-inherit  mt-6 rounded-xl  px-6 py-2"}>
                    <div className="w-full flex">
                        <p className={"mb-2  font-[600] text-[14px] dark:text-white"}>Who
                            to follow</p>
                    </div>
                    {peopleToFollow.length > 0 ?
                        peopleToFollow.map(person => (
                            <PersonToFollow finishedFollowing={finishedFollowing} key={person._id} {...person} />
                        ))
                        :
                        <div>
                            <p className={"text-[#828282] py-24 border-t-2 text-xl dark:text-gray-500"}>No one left to follow</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default WhoToFollow