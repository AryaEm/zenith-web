interface IPropMenu {
    id: string,
    path: string,
    label: string,
}

const MenuList: IPropMenu[] = [
    {
        id: `dashboard`,
        path: `/`,
        label: `Dashboard`,
    },
    {
        id: `community`,
        path: `/admin/community`,
        label: `Community`,
    },
    {
        id: `about`,
        path: `/admin/about`,
        label: `About`,
    },
    {
        id: `cart`,
        path: `/cart`,
        label: `Cart`,
    },
]

export default MenuList