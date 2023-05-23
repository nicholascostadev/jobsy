export function escape(element: HTMLElement, callbackFunction: (...args: unknown[]) => unknown) {
    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            callbackFunction();
        }
    }

    element.addEventListener('keydown', onKeydown, true);

    return {
        update(newCallbackFunction: (...args: unknown[]) => unknown) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            element.removeEventListener('keydown', onKeydown, true);
        }
    };
}
