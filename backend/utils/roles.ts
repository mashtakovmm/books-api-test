export const ROLE_FLAGS = {
    READ: 0 << 1, // 0
    MODIFY: 1 << 0, // 1
    WRITE: 1 << 1, // 2
    DELETE: 1 << 2, // 4
    GRANT_ROLE: 1 << 3 // 8
};  