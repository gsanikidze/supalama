type ITheme = 'light' | 'dark';

export default class Theme {
  private USER_SELECTED_THEME_KEY = 'USER_SELECTED_THEME';
  private _current: ITheme = $state<ITheme>('light');

  constructor() {
    const userTheme = localStorage.getItem(this.USER_SELECTED_THEME_KEY) as ITheme | undefined;

    if (userTheme) {
      this.update(userTheme)
    } else {
      const systemTheme: ITheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      this.update(systemTheme)
    }
  }

  update = (newTheme: ITheme) => {
    const root = window.document.documentElement;

    this._current = newTheme;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    localStorage.setItem(this.USER_SELECTED_THEME_KEY, newTheme);
  }

  toggle = () => {
    if (this._current === 'dark') {
      this.update('light')
    } else {
      this.update('dark')
    }
  }

  get current() {
    return this._current
  }
}
