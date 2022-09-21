declare namespace WinCtl {
  // Helper functions?
  function FindWindows(validateFunc: Function): Promise<Window[]>;
  function FindByTitle(title: string): Promise<Window>;

  // Window functions
  function GetActiveWindow(): Window;
  function GetWindowByClassName(title: string): Window;
  function GetWindowByTitleExact(title: string): Window;
  function EnumerateWindows(win: Function): void;

  interface Dimensions {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }

  interface Monitor {
    name: string;
    primary: boolean;
    dimensions: Dimensions;
  }

  interface Window {
    /**
     * If the window exists
     */
    exists(): boolean;

    /**
     * If the window is visible
     */
    isVisibile(): boolean;

    /**
     * Get the window title
     */
    getTitle(): string;

    /**
     * Get the window handle
     */
    getHwnd(): number;

    /**
     * Get the window class name
     */
    getClassName(): string;

    /**
     * Get the window process id
     */
    getPid(): number;

    /**
     * Get the window's parent window handle
     */
    getParent(): number;

    /**
     * Get the window's ancestor window handle
     *
     * @param flag The ancestor flag - see {@link AncestorFlags}
     */
    getAncestor(flag: AncestorFlags): number;

    /**
     * Get the {@link Monitor} the window is on
     */
    getMonitor(): Monitor;

    /**
     * Set the window position
     *
     * @param x The new position of the left side of the window
     * @param y The new position of the top of the window
     * @param width The new width of the window
     * @param height The new height of the window
     */
    move(x: number, y: number, width: number, height: number): void;

    /**
     * Set the window position relative to it's current position
     *
     * @param x How far to move the window along x in pixels - positive is right, negative is left
     * @param y How far to move the window along y in pixels - positive is down, negative is up
     * @param width How much to resize the window width in pixels - positive is bigger, negative is smaller
     * @param height How much to resize the window height in pixels - positive is bigger, negative is smaller
     */
    moveRelative(x: number, y: number, width: number, height: number): void;

    /**
     * Set the window's state - see: {@link WindowStates}
     *
     * @param windowState The window state to set the window to
     */
    showWindow(windowState: WindowStates): void;

    /**
     * Move the window to the foreground
     */
    setForegroundWindow(): void;

    /**
     * Set the window's position
     *
     * @param hWndInsertAfter A handle to the window to precede the positioned window in the Z order or {@link HWND}
     * @param x The new position of the left side of the window, in client coordinates
     * @param y The new position of the top of the window, in client coordinates
     * @param cx The new width of the window, in pixels
     * @param cy The new height of the window, in pixels
     * @param flags The flags to use - see: {@link SWP}
     */
    setWindowPos(
      hWndInsertAfter: HWND | number,
      x: number,
      y: number,
      cx: number,
      cy: number,
      flags: SWP[]
    ): void;

    /**
     * Get the window's {@link Dimensions}
     */
    dimensions(): Dimensions;
  }

  /**
   * Possible window states
   */
  enum WindowStates {
    HIDE = 0,
    SHOWNORMAL = 1,
    SHOWMINIMIZED = 2,
    MAXIMIZE = 3,
    SHOWMAXIMIZED = 3,
    SHOWNOACTIVATE = 4,
    SHOW = 5,
    MINIMIZE = 6,
    SHOWMINNOACTIVE = 7,
    SHOWNA = 8,
    RESTORE = 9,
    SHOWDEFAULT = 10,
    FORCEMINIMIZE = 11,
  }

  /**
   * Flags for the ancestor window
   *
   * Decides which ancestor to retrieve
   */
  enum AncestorFlags {
    PARENT = 1,
    ROOT = 2,
    ROOTOWNER = 3,
  }

  /**
   * Window handle flags
   */
  enum HWND {
    NOTOPMOST = -2,
    TOPMOST = -1,
    TOP = 0,
    BOTTOM = 1,
  }

  /**
   * Window sizing and positioning flags
   *
   * See: {@link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowpos}
   */
  enum SWP {
    NOSIZE = 0x0001,
    NOMOVE = 0x0002,
    NOZORDER = 0x0004,
    NOREDRAW = 0x0008,
    NOACTIVATE = 0x0010,
    DRAWFRAME = 0x0020,
    FRAMECHANGED = 0x0020,
    SHOWWINDOW = 0x0040,
    HIDEWINDOW = 0x0080,
    NOCOPYBITS = 0x0100,
    NOOWNERZORDER = 0x0200,
    NOREPOSITION = 0x0200,
    NOSENDCHANGING = 0x0400,
    DEFERERASE = 0x2000,
    ASYNCWINDOWPOS = 0x4000,
  }
}

declare module "winctl" {
  export = WinCtl;
}
