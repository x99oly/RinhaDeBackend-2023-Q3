// @ts-nocheck

import { stringIsNullOrWhiteSpace } from "../../src/aid/string_aid"

describe("stringIsNullOrWhiteSpace", () => {
    it("should return true for values null, undefined, empty or whitespace-only strings", () => {
        expect(stringIsNullOrWhiteSpace(null)).toBe(true)
        expect(stringIsNullOrWhiteSpace(undefined)).toBe(true)
        expect(stringIsNullOrWhiteSpace("")).toBe(true)
        expect(stringIsNullOrWhiteSpace("   ")).toBe(true)
    })

    it("should return false for non-empty, non-whitespace strings", () => {
        expect(stringIsNullOrWhiteSpace("a")).toBe(false)
        expect(stringIsNullOrWhiteSpace(" test ")).toBe(false)
    })
})
