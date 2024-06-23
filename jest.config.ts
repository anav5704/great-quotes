import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './'
})

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    verbose: true,
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        'next-auth/react$': '<rootDir>/__mocks__/auth.ts',
        'next/navigation$': '<rootDir>/__mocks__/router.ts',
        'hooks/use-modal$': '<rootDir>/__mocks__/use-modal.ts',
    },
}

export default createJestConfig(config)
