import { signIn, signOut, useSession } from "next-auth/client";
export default function Home() {


    const handleSocialLogin = (user) => {
        console.log(user);
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };


    const [session, loading] = useSession();
    return (
        <div>
            {loading && <p>Loading..</p>}
            {!session && (
                <>
                    Not signed in <br />
                    <button
                        onClick={() =>
                            signIn("google", { callbackUrl: "http://localhost:3000/home" })
                        }
                    >
                        Sign in
                    </button>
                </>
            )}
            {session && (
                <>
                    Signed in as {session.user.name} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
        </div>
    );
}