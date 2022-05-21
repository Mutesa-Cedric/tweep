import React, { useState, useEffect } from 'react';
import PersonToFollow from "./PersonToFollow";

let WhoToFollow = (props) => {

    const [hasNoOneToFollow, setHasNoOneToFollow] = useState(false)
    const [peopleToFollow, setPeopleToFollow] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:7070/getMostFollowedUsers/${props.currentUser}`).then(response => response.json()).then(data => {
            if(data.profiles.length===0) return setHasNoOneToFollow(true)
            setPeopleToFollow(data.profiles)
        }).catch(err => {
        })
    }, [])

    const finishedFollowing = () => {
        fetch(`http://localhost:7070/getMostFollowedUsers/${props.currentUser}`).then(response => response.json()).then(data => {
            console.log(data)
            setPeopleToFollow(data.profiles)
        }).catch(err => {
        })
    }

    let profileElements = peopleToFollow.map(person => {
        return <PersonToFollow
            key={person._id}
            name={person.userName}
            darkMode={props.darkMode}
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
                className={props.darkMode ? "bg-inherit shadow-xl lg:flex lg:flex-col sm:hidden " : "bg-white rounded-xl shadow-sm lg:flex lg:flex-col sm:hidden md:hidden"}>
                <div
                    className={props.fixSide ? "w-[320px] h-auto top-[64px]  fixed  bg-inherit mt-6 rounded-xl shadow-md  px-6 py-2" : "w-[320px] h-auto  bg-inherit  mt-6 rounded-xl  px-6 py-2"}>
                    <div className="w-full flex">
                        <p className={props.darkMode ? "mb-1 py-7 font-[600] text-[14px] text-white" : "mb-2  font-[600] text-[14px]"}>Who
                            to follow</p>
                    </div>
                    {hasNoOneToFollow ? 
                    <div>
                        <p className={props.darkMode ? "text-gray-500 py-24 text-xl" : "text-[#828282] py-24 border-t-2 text-xl"}>No one left to follow</p>
                    </div>
                        :profileElements}
                </div>
            </div>
        </div>
    )
}
export default WhoToFollow