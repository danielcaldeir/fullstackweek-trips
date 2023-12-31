"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut , useSession} from 'next-auth/react';
import { AiOutlineMenu } from "react-icons/ai";

export const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleLoginClick = () => signIn('google');

    const { status, data } = useSession();

    const handleLogoutClick = () => {
        setMenuIsOpen(false);
        signOut();
    };

    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

    return (
        <div className="container mx-auto p-5 flex justify-between">
            <Link href="/">
                <div className="relative h-[32px] w-[182px]">
                    <Image src="/logo.png" alt="Full Stack Week" fill />
                </div>
            </Link>
            {/* <Image weight={183} heigth={32} src='/logo.png' alt='Full Stack Week' /> */}
            {status === "unauthenticated" && (
                <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>
                Login
                </button>
            )}
            {/* <button onClick={() => signIn('google')}>Login</button> */}
            {status === "authenticated" && data.user && (
                <div className="flex items-center gap-3 border-grayLighter border border-solid rounded-full p-2 px-3 relative">
                    <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer" />

                    <Image height={35} width={35} src={data.user.image!} alt={data.user.name!} className="rounded-full shadow-md" />

                    {menuIsOpen && (
                        <div className="z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                            <Link href="/my-trips" onClick={() => setMenuIsOpen(false)}>
                                <button className="text-primary pb-2 border-b border-grayLighter border-solid text-sm font-semibold">Minhas Viagens</button>
                            </Link>

                            <button className="text-primary pt-2 text-sm font-semibold" onClick={handleLogoutClick}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

