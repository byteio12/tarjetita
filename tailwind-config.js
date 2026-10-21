tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        romantic: {
                            50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af',
                            400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c',
                            800: '#9f1239', 900: '#881337',
                            dark: '#0b0612', panel: '#150d24', glow: '#e879f9'
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                        cursive: ['Dancing Script', 'cursive']
                    },
                    animation: {
                        'spin-slow': 'spin 18s linear infinite',
                        'float': 'float 6s ease-in-out infinite'
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' }
                        }
                    }
                }
            }
        }