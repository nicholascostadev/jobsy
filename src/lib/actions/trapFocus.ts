// Copied from  https://learn.svelte.dev/tutorial/actions
export function trapFocus(node: HTMLElement) {
    const previous = document.activeElement;

    function focusable() {
        return Array.from(
            node.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        );
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key !== 'Tab') return;

        const current = document.activeElement;

        const elements = focusable();
        const first = elements.at(0);
        const last = elements.at(-1);

        if (event.shiftKey && current === first) {
            (last as any).focus();
            event.preventDefault();
        }

        if (!event.shiftKey && current === last) {
            (first as any).focus();
            event.preventDefault();
        }
    }

    (focusable()[0] as any)?.focus();

    node.addEventListener('keydown', handleKeydown);

    return {
        destroy() {
            node.removeEventListener('keydown', handleKeydown);
            (previous as any)?.focus();
        }
    };
}
