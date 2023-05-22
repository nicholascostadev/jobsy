export function clickOutside(
    element: HTMLElement,
    callbackFunction: (...args: unknown[]) => unknown
) {
    function onClick(event: MouseEvent) {
        if (!element.contains(event.target as Node) && !event.defaultPrevented) {
            callbackFunction();
        }
    }

    document.body.addEventListener('click', onClick, true);

    return {
        update(newCallbackFunction: (...args: unknown[]) => unknown) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick, true);
        }
    };
}
