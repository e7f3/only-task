import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'

// Глобальный мок для GSAP
jest.mock('gsap', () => {
    return {
        to: jest.fn(),
        fromTo: jest.fn(),
        killTweensOf: jest.fn(),
        context: jest.fn(() => ({
            revert: jest.fn(),
        })),
        Power2: {
            easeOut: 'power2.out',
        },
    }
})
