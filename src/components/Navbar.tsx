const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      {/* SEARCH BAR */}
    <div className="hidden md:flex">
      <img src="search.svg" alt="" width={14} height={14}/>
      <input type="text" placeholder="Search..."/>
    </div>
    {/* ICONS AND USERS */}
    <div className="flex items-center gap-6">
      <div className="bg-white rounded w-6 h-6 items-center justify-center cursor-pointer">
        <img src="message.svg" alt="" width={20} height={20}/>
       </div>
      <div className="bg-white rounded-full w-6 h-6 items-center justify-center cursor-pointer relative">
        <img src="announcement.svg" alt="" width={20} height={20} />
        <div className="absolute -top-3 -right-3.5 w-3.5 h-3.5 flex items-center justify-center bg-purple-500 text-white rounded-full"></div>
       </div>
       <div className="flex flex-col">
        <span className="text-xs leading-3 font-medium"> Ernest Anane</span>
        <span className="text-[10px] text-gray-500 text-right">Admin</span>
       </div>
       <div className="">
        <img src="profile.svg" alt="" width={36} height={36} className="rounded-full bg-white cursor-pointer" />
       </div>
      </div>
    </div>
  )
}

export default Navbar