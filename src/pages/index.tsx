import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'

export default function Home() {
    const [position, setPosition] = useState({ x: 50, y: 50 })

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent | TouchEvent) => {
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as PointerEvent).clientX
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as PointerEvent).clientY

            const x = (clientX / window.innerWidth) * 100
            const y = (clientY / window.innerHeight) * 100
            setPosition({ x, y })
        }

        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('touchmove', handlePointerMove)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('touchmove', handlePointerMove)
        }
    }, [])

    useEffect(() => {
        if (window.DeviceOrientationEvent) {
            const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
                if (e.gamma !== null && e.beta !== null) {
                    const x = 50 + (e.gamma / 90) * 30
                    const y = 50 + (e.beta / 180) * 30
                    setPosition({ x, y })
                }
            }

            window.addEventListener('deviceorientation', handleDeviceOrientation)
            return () => window.removeEventListener('deviceorientation', handleDeviceOrientation)
        }
    }, [])

    const backgroundStyle = {
        background: `radial-gradient(
            circle at ${position.x}% ${position.y}%,
            #5ac8fa 0%,
            #0071e3 40%,
            #5856d6 70%,
            #af52de 90%,
            #5ac8fa 100%
        )`,
        transition: 'background-position 0.3s ease-out',
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
                    touchAction: 'none',
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
