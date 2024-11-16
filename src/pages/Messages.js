import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import "../styles/Messages.css";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [receivers, setReceivers] = useState([]);
    const [selectedReceiver, setSelectedReceiver] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Fetch messages for the current user
        fetchMessages();

        // Fetch list of possible receivers (doctors/staff for patients or patients for staff)
        fetchReceivers();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axiosInstance.get("/api/messages");
            setMessages(response.data);
        } catch (error) {
            setError("Failed to load messages");
            console.error(error);
        }
    };

    const fetchReceivers = async () => {
        try {
            const response = await axiosInstance.get("/api/practitioners"); // Or /api/patients for doctors/staff
            setReceivers(response.data);
        } catch (error) {
            setError("Failed to load receivers");
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        if (!selectedReceiver || !messageContent) {
            setError("Please select a receiver and enter a message");
            return;
        }

        try {
            await axiosInstance.post("/api/messages/send", {
                content: messageContent,
                receiverId: selectedReceiver,
            });
            setSuccess("Message sent successfully");
            setMessageContent("");
        } catch (error) {
            setError("Failed to send message");
            console.error(error);
        }
    };

    return (
        <div className="message-page">
            <h2>Messages</h2>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {/* Send Message Section */}
            <div className="send-message">
                <h3>Send a Message</h3>
                <select
                    value={selectedReceiver}
                    onChange={(e) => setSelectedReceiver(e.target.value)}
                >
                    <option value="">Select Receiver</option>
                    {receivers.map((receiver) => (
                        <option key={receiver.id} value={receiver.id}>
                            {receiver.name} ({receiver.specialty || "Staff-member"})
                        </option>
                    ))}
                </select>
                <textarea
                    placeholder="Write your message"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                ></textarea>
                <button onClick={handleSendMessage}>Send</button>
            </div>

            {/* Received Messages Section */}
            <div className="received-messages">
                <h3>Received Messages</h3>
                {messages.length > 0 ? (
                    <ul>
                        {messages.map((msg) => (
                            <li key={msg.id}>
                                <p>
                                    <strong>From:</strong> {msg.senderName}
                                </p>
                                <p>{msg.content}</p>
                                <p>
                                    <small>Sent at: {new Date(msg.sentAt).toLocaleString()}</small>
                                </p>
                                <hr />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No messages received</p>
                )}
            </div>
        </div>
    );
}

export default Messages;
