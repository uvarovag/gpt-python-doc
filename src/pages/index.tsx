import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'

export default function Home() {
    const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })

    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {
            const x = (e.clientX / window.innerWidth) * 100
            const y = (e.clientY / window.innerHeight) * 100
            setCursorPos({ x, y })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const backgroundStyle = {
        background: `radial-gradient(
      circle at ${cursorPos.x}% ${cursorPos.y}%,
      #5ac8fa 0%,     /* ярко-голубой */
      #0071e3 40%,    /* насыщенный синий */
      #5856d6 70%,    /* фиолетово-синий */
      #af52de 90%,    /* светло-фиолетовый */
      #5ac8fa 100%
    )`,
        transition: 'background-position 0.15s ease',
    }

    return (
        <Layout title="Python 3.12">
            <main
                className="full-height-apple-bg"
                style={{
                    ...backgroundStyle,
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '0 20px',
                    height: '100%',
                    minHeight: 'calc(100vh - var(--ifm-navbar-height))',
                }}
            >
                <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 className="hero__title">Python 3.12</h1>
                    <p className="hero__subtitle">
                        GPT-перевод официальной документации Python 3.12 с фокусом на главном. Без воды, только суть и
                        примеры кода.
                    </p>
                    <div className="buttons">
                        <Link className="button button--secondary button--lg" to="/3.12/tutorial/the-python-tutorial">
                            Погнали →
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    )
}
