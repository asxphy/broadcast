import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const UserPage = ({ channelId }) => {
    const audioRef = useRef();
    const [peerConnection, setPeerConnection] = useState(null);

    useEffect(() => {
        const startBroadcast = async () => {
            socket.emit("join-channel", channelId);

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            audioRef.current.srcObject = stream;

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            });
            stream.getTracks().forEach((track) => pc.addTrack(track, stream));

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("webrtc-ice-candidate", {
                        channelId,
                        candidate: event.candidate,
                    });
                }
            };

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit("webrtc-offer", { channelId, offer });

            setPeerConnection(pc);
        };

        startBroadcast();
    }, [channelId]);

    useEffect(() => {
        socket.on("receive-answer", async (answer) => {
            if (peerConnection) {
                await peerConnection.setRemoteDescription(
                    new RTCSessionDescription(answer)
                );
            }
        });

        socket.on("receive-ice-candidate", async (candidate) => {
            if (peerConnection) {
                await peerConnection.addIceCandidate(
                    new RTCIceCandidate(candidate)
                );
            }
        });
    }, [peerConnection]);

    return (
        <div>
            <h2>Broadcasting Audio</h2>
            <audio ref={audioRef} autoPlay controls />
        </div>
    );
};

export default UserPage;
