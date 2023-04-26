// clickOutside.ts
interface ClickOutsideAction {
    destroy: () => void;
  }
  
  export const clickOutside = (node: HTMLElement): any => {
    const handleClick = (event: MouseEvent) => {
      if (
        node &&
        !node.contains(event.target as Node) &&
        !event.defaultPrevented
      ) {
        node.dispatchEvent(
          new CustomEvent<MouseEvent>("clickOutside", {
            detail: event,
          })
        );
      }
    };
  
    document.addEventListener("click", handleClick, true);
  
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
  