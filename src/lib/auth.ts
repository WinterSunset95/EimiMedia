import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export const checkAuth = async () => {
	const { data: session, status } = useSession();

	console.log("session", session);
	console.log("status", status);
}
