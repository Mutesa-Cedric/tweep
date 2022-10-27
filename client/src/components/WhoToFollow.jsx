import React, { useState, useEffect } from 'react';
import PersonToFollow from "./PersonToFollow";

let WhoToFollow = (props) => {

    const [hasNoOneToFollow, setHasNoOneToFollow] = useState(false)
    const [peopleToFollow, setPeopleToFollow] = useState([]);
    useEffect(() => {
        fetch(`https://mc-tweep.herokuapp.com/getMostFollowedUsers/${props.currentUser}`).then(response => response.json()).then(data => {
            if (data.profiles.length === 0) return setHasNoOneToFollow(true)
            setPeopleToFollow(data.profiles)
        }).catch(err => {
        })
    }, [])

    const finishedFollowing = () => {
        fetch(`https://mc-tweep.herokuapp.com/getMostFollowedUsers/${props.currentUser}`).then(response => response.json()).then(data => {
            console.log(data)
            setPeopleToFollow(data.profiles)
        }).catch(err => {
        })
    }

    let profileElements = peopleToFollow.map(person => {
        return <PersonToFollow
            key={person._id}
            name={person.userName}
            bio={person.bio}
            finishedFollowing={finishedFollowing}
            currentUser={props.currentUser}
            coverPhoto={person.coverImage}
            profile={person.profileImage}
            followers={person.followers.length}
        />
    })


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
                    {hasNoOneToFollow ?
                        <div>
                            <p className={ "text-[#828282] py-24 border-t-2 text-xl dark:text-gray-500"}>No one left to follow</p>
                        </div>
                        : profileElements}
                </div>
            </div>
        </div>
    )
}
export default WhoToFollow