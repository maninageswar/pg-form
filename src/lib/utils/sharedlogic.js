export function preventKeyPress(e, blockedKeys) {
    if (blockedKeys.includes(e.key)) {
        e.preventDefault();
    }
}