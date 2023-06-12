import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="shortcut icon" href="/images/Netflix-N-Symbol-logo.png"/>
                    <link rel="apple-touch-icon" sizes="57x57" href="/images/Netflix-N-Symbol-logo.png" />
          
                    <meta name="mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="application-name" content="Netflix Clone"/>
                    <meta name="apple-mobile-web-app-title" content="Netflix Clone"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
                    <meta name="description" content="Netflix Clone - Minh Nguyen"/>
                    <meta property="og:title" content="Netflix Clone - Minh Nguyen"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://netflix-clone-minh-nguyen.vercel.app"/>
                    <meta property="og:image" content="/images/Netflix-N-Symbol-logo.png"/>

                </Head>

                <body>
                    <Main/>
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;