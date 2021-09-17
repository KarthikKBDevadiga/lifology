import ShareButton from "./ShareButton"

const ShareList = ({ url, video }) => {
    return (
        <div className="flex">
            <ShareButton
                href={{
                    pathname: 'mailto:',
                    query: {
                        subject: video.title + ' - Lifology',
                        body: 'Hello, \n\n' + video.title + '\n' + url + '\n\nRegards,'
                    },
                }}
                logo='/img/social/email.svg'
            />
            <ShareButton
                href={{
                    pathname: 'https://api.whatsapp.com/send',
                    query: { text: url },
                }}
                logo='/img/social/whatsapp.svg'
            />
            <ShareButton
                href={{
                    pathname: 'https://www.facebook.com/sharer/sharer.php',
                    query: {
                        u: url,
                        quote: video.title,
                        hashtag: '#lifology'
                    },
                }}
                logo='/img/social/facebook.svg'
            />
            <ShareButton
                href={{
                    pathname: 'https://twitter.com/share',
                    query: {
                        url: url,
                        text: video.title,
                        hashtags: 'lifology,karthik'
                    },
                }}
                logo='/img/social/twitter.svg'
            />
            <ShareButton
                href={{
                    pathname: 'https://linkedin.com/shareArticle',
                    query: {
                        url: url,
                        title: video.title,
                        summary: video.description
                    },
                }}
                logo='/img/social/linkedin.svg'
            />
        </div>
    )
}
export default ShareList