import { SendHorizonal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaEye, FaPaperPlane, FaPencilAlt } from "react-icons/fa";
import { HiPaperAirplane } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";

const ComposeWithMarkdown = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.shiftKey) {
          e.preventDefault();
          handleSend(e);
          setMessage("");
        }
      };
    
      useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [message]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <div
            className={`sticky bottom-0 bg-white border-x border-t p-3 shadow-lg transition-all z-10 ${
                isCollapsed ? "h-10" : "h-auto"
            }`}
        >
            <div className="flex justify- items-start center mb-2">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    {isCollapsed ? "Expand" : "Collapse"}
                </button>
            </div>
            {!isCollapsed && (
                <>
                    {preview ? (
                        <div className="preview border p-2 mb-2 rounded-md bg-gray-50">
                            <ReactMarkdown>
                                {message || "Nothing to preview"}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <TextareaAutosize
                            className="textarea border p-2 rounded-md w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type a message (supports Markdown)..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            minRows={3}
                        />
                    )}
                    {!isCollapsed && (
                        <>
                            <button
                                onClick={() => setPreview(!preview)}
                                className="primary-btn bg-gray-500 hover:bg-gray-400"
                            >
                                {preview ? <FaPencilAlt/> : <FaEye/>}
                            </button>
                            <button onClick={handleSend} className="primary-btn mx-2">
                                <FaPaperPlane/>
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ComposeWithMarkdown;
