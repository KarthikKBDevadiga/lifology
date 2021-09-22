import ShareButton from "./ShareButton"

const ShareList = ({ url, title }) => {
    return (
        <div className="flex">
            <ShareButton
                loading={url === ""}
                href={{
                    pathname: 'mailto:',
                    query: {
                        subject: title + ' - Lifology',
                        body: 'Hello, \n\n' + title + '\n' + url + '\n\nRegards,'
                    },
                }}
                logo='/img/social/email.svg'
            />
            <ShareButton
                loading={url === ""}
                href={{
                    pathname: 'https://api.whatsapp.com/send',
                    query: { text: url },
                }}
                logo='/img/social/whatsapp.svg'
            />
            <ShareButton
                loading={url === ""}
                href={{
                    pathname: 'https://www.facebook.com/sharer/sharer.php',
                    query: {
                        u: url,
                        quote: title,
                        hashtag: '#lifology'
                    },
                }}
                logo='/img/social/facebook.svg'
            />
            <ShareButton
                loading={url === ""}
                href={{
                    pathname: 'https://twitter.com/share',
                    query: {
                        url: url,
                        text: title,
                        hashtags: 'lifology'
                    },
                }}
                logo='/img/social/twitter.svg'
            />
            <ShareButton
                loading={url === ""}
                href={{
                    pathname: 'https://linkedin.com/shareArticle',
                    query: {
                        url: url,
                        title: title,
                        // summary: video.description
                    },
                }}
                logo='/img/social/linkedin.svg'
            />
        </div>
    )
}
export default ShareList