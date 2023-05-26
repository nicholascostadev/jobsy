type ArgumentProps = [callback: (...args: unknown[]) => unknown, condition?: boolean];

export function clickOutside(element: HTMLElement, [callback, condition]: ArgumentProps) {
    function onClick(event: MouseEvent) {
        if (!element.contains(event.target as Node) && !event.defaultPrevented && condition) {
            callback();
        }
    }

    document.body.addEventListener('click', onClick, true);

    return {
        update([newCallback, newCondition]: ArgumentProps) {
            callback = newCallback;
            condition = newCondition;
        },
        destroy() {
            document.body.removeEventListener('click', onClick, true);
        }
    };
}
