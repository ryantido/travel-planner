"use server"

import { signIn, signOut } from "@/auth"

export const login = async () => {
    await signIn("github", { callbackUrl: "/" })
}

export const logout = async () => {
    await signOut({ callbackUrl: "/" })
}