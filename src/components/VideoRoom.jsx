import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

const APP_ID = "b7f1276a0de84985897e6db52afe99f4";
const TOKEN =
  "007eJxTYDg+7b3miRNfWTd9m+7+YX32I9sdIaVrZA89Yyi5USZbUJahwJBknmZoZG6WaJCSamFiaWFqYWmeapaSZGqUmJZqaZlmsn2zcWpDICPDpP+zGBkZIBDEZ2bISy1nYAAADPsiFA==";
const CHANNEL = "new";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const VideoRoom = ({ setJoined }) => {
  const [users, setUsers] = useState([]);
  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };
  //   const handleUserLeft = () => {};

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    // client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        // setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });
  }, []);
  return (
    <div>
      <h1>Video Room</h1>
      {users.map((user) => (
        <VideoPlayer key={user.uid} user={user} />
      ))}
      <button onClick={() => setJoined(false)}>Leave Room</button>
    </div>
  );
};

export default VideoRoom;
