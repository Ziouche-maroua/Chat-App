import PreferencesTab from "@/components/PreferencesTab";
import ChatLayout from "@/components/chat/chatLayout";
import { User , USERS } from "@/db/dummy";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default  async function  Home() {
  const layout = cookies().get("react-resizable-panels:layout");
	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const { isAuthenticated } = getKindeServerSession();
	if (!(await isAuthenticated())) return redirect("/auth");

	


  return (
    <main className='flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4'>
    <PreferencesTab />

    {/* dotted background */}
    <div 
  className='absolute top-0 z-[-2] h-screen w-screen 
    dark:bg-[#000100] dark:bg-[radial-gradient(#4A4A4A_1px,#000100_1px)] 
    dark:bg-[size:20px_20px] bg-[#C0C0C0] 
    bg-[radial-gradient(#001400_1px,#C0C0C0_1px)] bg-[size:20px_20px]'
  aria-hidden='true'
/>







<div className='z-10 border rounded-lg max-w-5xl w-full min-h-[85vh] text-sm lg:flex'>
				<ChatLayout defaultLayout={defaultLayout}  users={USERS}  />
			</div>


   </main>
  
  );
}
