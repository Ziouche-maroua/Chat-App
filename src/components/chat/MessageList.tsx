import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";
import { messages, USERS } from "@/db/dummy"; // Import your mock data
import { Message, User } from "@/db/dummy"; // Import types

const MessageList = () => {
  const currentUser: User = USERS[0]; // Current logged-in user (first user in USERS array)
  const selectedUser: User = USERS[1]; // Selected chat user (second user in USERS array)

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      {/* Ensure animation is applied when items are added/removed */}
      <AnimatePresence>
        {messages.map((message: Message, index: number) => (
          <motion.div
            key={message.id} // Use message.id for unique keys
            layout
            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: "spring",
                bounce: 0.3,
                duration: index * 0.05 + 0.2,
              },
            }}
            className={cn(
              "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              message.senderId === currentUser?.id ? "items-end" : "items-start"
            )}
          >
            <div className="flex gap-3 items-center">
              {/* Display selected user's avatar for their messages */}
              {message.senderId === selectedUser?.id && (
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={selectedUser?.image || "/user-placeholder.png"}
                    alt="User Image"
                    className="border-2 border-white rounded-full"
                  />
                </Avatar>
              )}
              {/* Display message content (text or image) */}
              {message.messageType === "text" ? (
               <span
  className={cn(
    "p-3 rounded-md max-w-xs  bg-accent", // Base styles
    " text-black", // Light mode styles
    "dark:text-white" // Dark mode styles
  )}
>
  {message.content}
</span>
              ) : (
                <img
                  src={message.content}
                  alt="Message Image"
                  className="border p-2 rounded h-40 md:h-52 object-cover"
                />
              )}

              {/* Display current user's avatar for their messages */}
              {message.senderId === currentUser?.id && (
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={currentUser?.image || "/user-placeholder.png"}
                    alt="User Image"
                    className="border-2 border-white rounded-full"
                  />
                </Avatar>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
