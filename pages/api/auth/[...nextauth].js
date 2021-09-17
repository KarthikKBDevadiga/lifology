import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: '237059092365-gmtelru636a7o2ksuaadmrqi0n7k76um.apps.googleusercontent.com',
            clientSecret: 'E50tMAbck-SrbHCJEwKkjvLc',
        }), Providers.Facebook({
            clientId: '400637383938316',
            clientSecret: 'de4631f8045588b17cbc9fa993503d71',
        }),
    ],

    callbacks: {
        session: async (session, user) => {
            console.log('nextauth ' + user.id)
            session.id = user.id
            return Promise.resolve(session);
        },
    },
});