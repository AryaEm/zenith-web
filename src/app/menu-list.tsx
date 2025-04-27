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
        id: `support`,
        path: `/admin/support`,
        label: `Support`,
    },
]

export default MenuList