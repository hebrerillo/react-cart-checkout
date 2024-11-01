function unfold(collapsableBlock: HTMLElement, enableTransition = true): void {
  if (enableTransition) {
    collapsableBlock.addEventListener("transitionend", transitionEnd);
    collapsableBlock.style.maxHeight = `${collapsableBlock.scrollHeight}px`;
  } else {
    collapsableBlock.style.transition = 'none';
    collapsableBlock.style.maxHeight = `${collapsableBlock.scrollHeight}px`;
    collapsableBlock.offsetHeight;
    collapsableBlock.style.removeProperty("transition");
    unfoldActions(collapsableBlock);
  }
}

function fold(collapsableBlock: HTMLElement, enableTransition = true) {
  if (enableTransition) {
    collapsableBlock.addEventListener("transitionend", transitionEnd);
    collapsableBlock.style.maxHeight = `${collapsableBlock.scrollHeight}px`;
    collapsableBlock.offsetHeight;
    collapsableBlock.style.maxHeight = `0px`;
    collapsableBlock.style.overflow = 'hidden';
  } else {
    collapsableBlock.style.transition = 'none';
    collapsableBlock.style.maxHeight = `0px`;
    collapsableBlock.offsetHeight;
    collapsableBlock.style.removeProperty("transition");
    foldActions(collapsableBlock);
  }
}

function transitionEnd(event: TransitionEvent) {
  if (event.propertyName !== "max-height") {
    return;
  }
  const collapsableBlock = event.target as HTMLElement;
  const maxHeightValueNumber = parseInt(collapsableBlock.style.maxHeight);
  console.log("transitionend", maxHeightValueNumber);
  if (maxHeightValueNumber > 0) {
    unfoldActions(collapsableBlock);
  } else if (maxHeightValueNumber === 0) {
    foldActions(collapsableBlock);
  }
  collapsableBlock.removeEventListener("transitionend", transitionEnd);
}

function foldActions(collapsableBlock: HTMLElement) {
  collapsableBlock.classList.add("folded");
  collapsableBlock.style.removeProperty("max-height");
  collapsableBlock.style.removeProperty("overflow");
}

function unfoldActions(collapsableBlock: HTMLElement) {
  collapsableBlock.style.removeProperty("max-height");
  collapsableBlock.style.removeProperty("overflow");
  collapsableBlock.classList.remove("folded");
}

export {fold, unfold};