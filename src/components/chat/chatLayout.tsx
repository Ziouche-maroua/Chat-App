"use client";
import { useEffect, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { cn } from "@/lib/utils";
import Sidebar from "../Sidebar";
import {User} from "@/db/dummy";
import MessageContainer from "./MessageContainer";
import { useSelectedUser } from "@/store/useSelectedUser";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  users: User[];
}

const ChatLayout = ({ defaultLayout = [320, 480],users }: ChatLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const  { selectedUser, setSelectedUser}=useSelectedUser()

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='h-full items-stretch bg-[#004b23] rounded-lg' // Dark green background for the entire group
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}; `;
      }}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={8}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=true;`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=false;`;
        }}
        className={cn(
          "transition-all duration-300 ease-in-out", // Common styles for transition
          isCollapsed ? "bg-[#001400] min-w-[80px]" : "bg-[#001400]" // Dark red for collapsed, dark green for expanded
        )}
      >
        <Sidebar isCollapsed={isCollapsed} users={users} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel
        defaultSize={defaultLayout[1]}
        minSize={30}
        className="bg-[#001400]" // Dark green for the right panel
      >
        {!selectedUser && (
					<div className='flex justify-center items-center h-full w-full px-10'>
						<div className='flex flex-col justify-center items-center gap-4'>
							<img src='/logo.png' alt='Logo' className='w-full md:w-2/3 lg:w-1/2' />
							<p className='text-muted-foreground text-center'>Click on a chat to view the messages</p>
						</div>
					</div>
				)}
				{selectedUser && <MessageContainer />}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChatLayout;
