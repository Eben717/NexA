const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.svg",
        label: "Home",
        href: "/",
        visible: ["admin", "auditor"],
      },
      {
        icon: "/auditor.svg",
        label: "Auditor",
        href: "/list/auditors",
        visible: ["admin"],
      },
      {
        icon: "/calendar.svg",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "auditor",],
      },
      {
        icon: "/message.svg",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "auditor"],
      },
      {
        icon: "/announcement.svg",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "auditors"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.svg",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "auditors"],
      },
      {
        icon: "/setting.svg",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "auditors"],
      },
      {
        icon: "/logout.svg",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "auditors"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className=''>Menu</div>
  )
}

export default Menu