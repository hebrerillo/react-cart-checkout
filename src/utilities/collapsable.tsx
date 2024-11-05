let boundTransitionEnd: ((this: HTMLElement, ev: TransitionEvent) => any);

function transitionCancel(event: TransitionEvent) {
  const target = event.target as HTMLElement;
  target.removeEventListener("transitioncancel", transitionCancel);
  target.removeEventListener("transitionend", boundTransitionEnd);
}

function unfold(
  collapsableBlock: HTMLElement | null,
  enableTransition = true,
  endCallback: Function | null = null,
): void {
  if (!collapsableBlock) {
    return;
  }

  if (enableTransition && collapsableBlock.classList.contains("folded")) {
    boundTransitionEnd = transitionEnd.bind(
      collapsableBlock,
      endCallback as any,
    ) as any;
    collapsableBlock.addEventListener(
      "transitioncancel",
      transitionCancel as any,
    );
    collapsableBlock.addEventListener("transitionend", boundTransitionEnd);
    collapsableBlock.style.maxHeight = `${collapsableBlock.scrollHeight}px`;
  } else {
    collapsableBlock.style.transition = "none";
    collapsableBlock.style.maxHeight = `${collapsableBlock.scrollHeight}px`;
    collapsableBlock.offsetHeight;
    collapsableBlock.style.removeProperty("transition");
    unfoldActions(collapsableBlock, endCallback);
  }
}

function fold(
  collapsableBlock: HTMLElement | null,
  enableTransition = true,
  endCallback: Function | null = null,
) {
  if (!collapsableBlock) {
    return;
  }
  if (enableTransition && !collapsableBlock.classList.contains("folded")) {
    boundTransitionEnd = transitionEnd.bind(
      collapsableBlock,
      endCallback as any,
    ) as any;
    collapsableBlock.addEventListener(
      "transitioncancel",
      transitionCancel as any,
    );
    collapsableBlock.addEventListener("transitionend", boundTransitionEnd);
    collapsableBlock.style.maxHeight = `${collapsableBlock.scrollHeight}px`;
    collapsableBlock.offsetHeight;
    collapsableBlock.style.maxHeight = `0px`;
    collapsableBlock.style.overflow = "hidden";
  } else {
    collapsableBlock.style.transition = "none";
    collapsableBlock.style.maxHeight = `0px`;
    collapsableBlock.offsetHeight;
    collapsableBlock.style.removeProperty("transition");
    foldActions(collapsableBlock, endCallback);
  }
}

function transitionEnd(endCallback: Function | null, event: TransitionEvent) {
  if (event.propertyName !== "max-height") {
    return;
  }
  const collapsableBlock = event.target as HTMLElement;
  const maxHeightValueNumber = parseInt(collapsableBlock.style.maxHeight);
  if (maxHeightValueNumber > 0) {
    unfoldActions(collapsableBlock, endCallback);
  } else if (maxHeightValueNumber === 0) {
    foldActions(collapsableBlock, endCallback);
  }

  collapsableBlock.removeEventListener("transitionend", boundTransitionEnd);
  collapsableBlock.removeEventListener("transitioncancel", transitionCancel);
}

function foldActions(
  collapsableBlock: HTMLElement,
  endCallback: Function | null = null,
) {
  collapsableBlock.classList.add("folded");
  collapsableBlock.style.removeProperty("max-height");
  collapsableBlock.style.removeProperty("overflow");
  endCallback && endCallback();
}

function unfoldActions(
  collapsableBlock: HTMLElement,
  endCallback: Function | null = null,
) {
  collapsableBlock.style.removeProperty("max-height");
  collapsableBlock.style.removeProperty("overflow");
  collapsableBlock.classList.remove("folded");
  endCallback && endCallback();
}

export { fold, unfold };
