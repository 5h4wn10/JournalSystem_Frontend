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
    const [conversation, setConversation] = useState([]);
    const [selectedConversationUser, setSelectedConversationUser] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        fetchCurrentUser(); // Hämta inloggat användar-ID vid inladdning
        fetchMessages();
        fetchReceivers();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await axiosInstance.get("/api/users/current");
            setCurrentUserId(response.data.id); // Spara användarens ID i state
        } catch (error) {
            setError("Failed to fetch current user");
            console.error(error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axiosInstance.get("/api/messages");
            setMessages(
                response.data.sort(
                    (a, b) => new Date(b.sentAt) - new Date(a.sentAt)
                )
            );
        } catch (error) {
            setError("Failed to load messages");
            console.error(error);
        }
    };

    const fetchReceivers = async () => {
        try {
            const response = await axiosInstance.get("/api/users/receivers");
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
            fetchMessages();
        } catch (error) {
            setError("Failed to send message");
            console.error(error);
        }
    };

    const fetchConversation = async (userId2) => {
    if (!currentUserId) {
        setError("Current user ID not found");
        return;
    }
    try {
        const response = await axiosInstance.get("/api/messages/conversation", {
            params: {
                userId1: currentUserId, // Använd aktuellt användar-ID
                userId2: userId2,
            },
        });
        setConversation(
            response.data.sort(
                (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
            )
        );
        setSelectedConversationUser(userId2);
    } catch (error) {
        setError("Failed to load conversation");
        console.error(error);
    }
};

    const handleReply = async () => {
        if (!messageContent) {
            setError("Please write a reply");
            return;
        }
        try {
            await axiosInstance.post("/api/messages/send", {
                content: messageContent,
                receiverId: selectedConversationUser,
            });
            setSuccess("Reply sent successfully");
            setMessageContent("");
            fetchConversation(selectedConversationUser);
        } catch (error) {
            setError("Failed to send reply");
            console.error(error);
        }
    };

    return (
        <div className="messages-container">
            {/* Navbar */}
            <div className="navbar">
                <button className="back-button" onClick={() => window.history.back()}>
                    Go Back
                </button>
                <h1>Messages</h1>
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="message-sections">
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
                                {receiver.fullName} ({receiver.roles.join(", ")})
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
                                    <p>Latest message: {msg.content}</p>
                                    <p>
                                        <small>Sent at: {new Date(msg.sentAt).toLocaleString()}</small>
                                    </p>
                                    <button
                                        className="reply-button"
                                        onClick={() => fetchConversation(msg.senderId)}
                                    >
                                        View Conversation
                                    </button>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No messages received</p>
                    )}
                </div>
            </div>

            {/* Conversation Section */}
            {selectedConversationUser && (
                <div className="conversation-section">
                    <h3>Conversation</h3>
                    {conversation.length > 0 ? (
                        <ul>
                            {conversation.map((msg) => (
                                <li key={msg.id}>
                                    <p>
                                        <strong>{msg.senderName}:</strong> {msg.content}
                                    </p>
                                    <p>
                                        <small>Sent at: {new Date(msg.sentAt).toLocaleString()}</small>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No conversation found</p>
                    )}
                    <textarea
                        placeholder="Write your reply"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                    ></textarea>
                    <button onClick={handleReply}>Send Reply</button>
                </div>
            )}
        </div>
    );
}

export default Messages;
