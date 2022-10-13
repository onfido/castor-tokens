/**
 * Switches a Castor theme.
 *
 * @param themeName Name of a theme, relying on a class name used with a
 * `castor-theme--` prefix.
 * @param selection Selection of an element (can also be HTML collection or a
 * list of elements) where theme should be switched, defaults to the body
 * element.
 *
 * @example
 * import '@onfido/castor-tokens/dist/day-class.css';
 * switchTheme('day');
 *
 * import '@onfido/castor-tokens/dist/night-class.css';
 * switchTheme('night', document.querySelector('.section'));
 */
export function switchTheme(
  themeName: string,
  selection: Element | ArrayLike<Element> | null = document.body
): void {
  if (!selection)
    throw new Error('Unable to switch theme: no selection available');

  if ('length' in selection)
    return Array.from(selection as ArrayLike<Element>).forEach((element) =>
      switchTheme(themeName, element)
    );

  const element: Element = selection;
  element.className = element.className.replace(classNameRegExp, '');
  element.classList.add(prefix + themeName);
}

const prefix = 'castor-theme--';
const classNameRegExp = new RegExp(`${prefix}\\w+[-\\w]*`, 'g');
