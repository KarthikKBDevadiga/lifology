import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Constants from "../../../helpers/Constants";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: Constants.GOOGLE_CLIENT_ID,
            clientSecret: Constants.GOOGLE_CLIENT_SECRETE,
        }), Providers.Facebook({
            clientId: Constants.FACEBOOK_CLIENT_ID,
            clientSecret: Constants.FACEBOOK_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        session: async (session, user) => {
            session.id = user.sub
            return Promise.resolve(session);
        },
    },
});