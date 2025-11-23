import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'

// Глобальный мок для GSAP
jest.mock('gsap', () => {
    const gsapMock = {
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

    return {
        __esModule: true,
        default: gsapMock, // Для default import
        gsap: gsapMock, // Для named import
        Power2: gsapMock.Power2, // Экспортируем Power2 отдельно
    }
})
