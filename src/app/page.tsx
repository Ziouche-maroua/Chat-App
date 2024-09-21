import PreferencesTab from "@/components/PreferencesTab";


export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4'>
    <PreferencesTab />

    {/* dotted background */}
    <div
  className='absolute top-0 z-[-2] h-screen w-screen 
    dark:bg-[#4B0000] dark:bg-[radial-gradient(#666666_1px,#4B0000_1px)] 
    dark:bg-[size:20px_20px] bg-[#666666] 
    bg-[radial-gradient(#d93a3a_1px,#cccccc_1px)] bg-[size:20px_20px]'
  aria-hidden='true'
/>




   </main>
  
  );
}
