// @flow

export const getPageFromElement = (target: HTMLElement) => {
    const node = target.closest(".page");

    if (!(node instanceof HTMLElement)) {
        return null;
    }

    const number = Number(node.dataset.pageNumber);

    return { node, number };
};

export const getPageFromRange = (range: Range) => {
    const parentElement = range.startContainer.parentElement;

    if (!(parentElement instanceof HTMLElement)) {
        return;
    }

    return getPageFromElement(parentElement);
};
