import React from 'react';
import Link from "next/link"

interface MenuItemProps {
    label: string;
    path: string;
    active?: boolean;
}

export default function MenuItem({ label, path }: MenuItemProps) {
    return (
        <Link href={path} className={`flex items-center p-3 px-4 text-white`}>
            <span className="flex-1 font-medium text-lg">{label}</span>
        </Link>
    );
}