import React, { useState, useEffect } from 'react';
import PersonToFollow from "./PersonToFollow";
import axios from "../../axios.config"
import useAuth from '../hooks/useAuth';

const WhoToFollow = (props) => {
    const [peopleToFollow, setPeopleToFollow] = useState(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const getPeopleToFollow = async () => {
        setLoading(true);
        await axios.get(`/getMostFollowedUsers/${user.userName}`).then(({ data }) => {
            setPeopleToFollow(data.profiles);
            setLoading(false);
        })
    }

    useEffect(() => {
        getPeopleToFollow();
    }, [])

    const finishedFollowing = () => {
        getPeopleToFollow();
    }

    return (
        <div className="mt-5">
            <div
                className={"bg-white rounded-xl shadow-sm lg:flex lg:flex-col sm:hidden  dark:bg-inherit"}>
                <div
                    className={props.fixSide ? "w-[320px] h-auto top-[64px]  fixed  bg-inherit mt-6 rounded-xl shadow-md  px-6 py-2  dark:border dark:border-gray-600" : "w-[320px] h-auto  bg-inherit  mt-6 rounded-xl  px-6 py-2  dark:border dark:border-gray-600"}>
                    <div className="w-full flex">
                        <p className={"mb-2  font-[600] text-[14px] dark:text-white"}>Who
                            to follow</p>
                    </div>
                    {peopleToFollow && peopleToFollow.length > 0 ?
                        peopleToFollow.map(person => (
                            <PersonToFollow finishedFollowing={finishedFollowing} key={person._id} {...person} />
                        ))
                        :
                        <>
                            {loading ?
                                <div className="flex border-t-[1.3px] mt-4 justify-center w-full py-12 items-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F80ED]"></div>
                                </div>
                                :
                                <p className={"text-[#828282] py-24 border-t-2 text-xl dark:text-gray-500"}>No one left to follow</p>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default WhoToFollow