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

    useEffect(() => {
        fetchMessages();
        fetchReceivers();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axiosInstance.get("/api/messages");
            setMessages(response.data);
        } catch (error) {
            setError("Failed to load messages");
        }
    };

    const fetchReceivers = async () => {
        try {
            const response = await axiosInstance.get("/api/users/receivers");
            setReceivers(response.data);
        } catch (error) {
            setError("Failed to load receivers");
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
        }
    };

    const fetchConversation = async (userId) => {
        try {
            const response = await axiosInstance.get(`/api/messages/conversation/${userId}`);
            setConversation(response.data);
            setSelectedConversationUser(userId);
        } catch (error) {
            setError("Failed to load conversation");
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
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await axiosInstance.delete(`/api/messages/${messageId}`);
            setSuccess("Message deleted successfully");
            fetchMessages();
            if (selectedConversationUser) {
                fetchConversation(selectedConversationUser);
            }
        } catch (error) {
            setError("Failed to delete message");
        }
    };

    const handleLogout = () => {
        axiosInstance.defaults.headers.common["Authorization"] = "";
        window.location.href = "/login";
    };

    return (
        <div className="messages-container">
            {/* Navbar */}
            <div className="navbar">
                <button className="back-button" onClick={() => window.history.back()}>
                    Go Back
                </button>
                <h1>Messages</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
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
                                    <p>{msg.content}</p>
                                    <p>
                                        <small>Sent at: {new Date(msg.sentAt).toLocaleString()}</small>
                                    </p>
                                    <button
                                        className="reply-button"
                                        onClick={() => fetchConversation(msg.senderId)}
                                    >
                                        Reply
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteMessage(msg.id)}
                                    >
                                        Delete
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
